import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";
import { FormDataFields, ProjectResponse } from "@utils/types/projects";
import formidable, { File } from "formidable";

import crypto from "crypto";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

async function handleGetProjectById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  await projectsModel.collection
    .findOne({ _id: new mongoose.Types.ObjectId(`${id}`) })
    .then(project => res.send(project))
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });
}

async function handleDeleteProject(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  await projectsModel.collection
    .findOneAndDelete({ _id: new mongoose.Types.ObjectId(`${id}`) })
    .then(deleteRes => {
      const deletedCoverPath: string = deleteRes.value?.cover.path;

      fs.unlink(deletedCoverPath, err => {
        if (err) res.status(500).send(`Ocorreu um erro: ${err}`);
      });
    })
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.status(200).json({ message: `Projeto (${id}) deletado com sucesso!` });
}

async function handleEditProject(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  await projectsModel.collection
    .findOne({ _id: new mongoose.Types.ObjectId(`${id}`) })
    .then(resultFound => {
      const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: "./public/tmp/uploads",
        filename: (name, ext, part) => {
          const hash = crypto.randomBytes(16).toString("hex");

          return `${hash}-${name}${ext}`;
        },
      });

      form.parse(req, async (err, fields, files) => {
        if (err) res.status(500).end();

        const uploadedFile = files.cover as File;
        const uploadedFields = fields as FormDataFields;

        const isUpdatedCover = Object.keys(files).length !== 0;

        if (isUpdatedCover) {
          const removedCoverPath: string = resultFound?.cover.path;

          fs.unlink(removedCoverPath, err => {
            if (err) res.status(500).send(`Ocorreu um erro: ${err}`);
          });
        }

        const response: ProjectResponse = {
          cover: isUpdatedCover
            ? {
                file: uploadedFile,
                path: uploadedFile.filepath,
                fileName: uploadedFile.newFilename,
              }
            : undefined,
          name: uploadedFields.name,
          tags: JSON.parse(uploadedFields.tags),
          githubUrl: uploadedFields.githubUrl,
          deployUrl: uploadedFields.deployUrl,
        };

        if (response.cover === undefined) delete response.cover;

        await projectsModel.collection
          .updateOne(
            { _id: new mongoose.Types.ObjectId(`${id}`) },
            { $set: response }
          )
          .catch(err => {
            throw new Error(`Erro: ${err}`);
          });

        res.status(200).json({
          message: `Projeto "${response.name}" atualizado com sucesso!`,
        });
      });
    })
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGetProjectById(req, res);
      break;
    case "DELETE":
      handleDeleteProject(req, res);
      break;
    case "PATCH":
      handleEditProject(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
