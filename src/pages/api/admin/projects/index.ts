import { NextApiRequest, NextApiResponse } from "next";

import formidable, { File } from "formidable";
import { mongoose, connectToDatabase } from "@config/database";

import crypto from "crypto";

export const config = {
  api: { bodyParser: false },
};

type FormDataFields = {
  name: string;
  tags: string;
  githubUrl: string;
  deployUrl: string;
};

export type ProjectResponse = {
  cover: {
    path: string;
    fileName: string;
  };
  name: string;
  tags: string[];
  githubUrl: string;
  deployUrl: string;
};

function handleCreateProject(req: NextApiRequest, res: NextApiResponse) {
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

    const response: ProjectResponse = {
      cover: {
        path: uploadedFile.filepath,
        fileName: uploadedFile.newFilename,
      },
      name: uploadedFields.name,
      tags: JSON.parse(uploadedFields.tags),
      githubUrl: uploadedFields.githubUrl,
      deployUrl: uploadedFields.deployUrl,
    };

    await connectToDatabase();

    const ProjectsSchema = new mongoose.Schema({
      projects: { type: Array, required: true },
    });

    const projectsModel =
      mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

    await projectsModel.collection.insertOne(response).catch(err => {
      throw new Error(`Erro: ${err}`);
    });

    res
      .status(200)
      .json({ message: `Projeto "${response.name}" cadastrado com sucesso!` });
  });
}

async function handleGetProjects(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  const projects = await projectsModel
    .find()
    .exec()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.status(200).json(projects);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      handleCreateProject(req, res);
      break;
    case "GET":
      handleGetProjects(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
