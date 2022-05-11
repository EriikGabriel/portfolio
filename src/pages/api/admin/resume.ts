import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

import formidable, { File } from "formidable";

export const config = {
  api: { bodyParser: false },
};

async function handleGetResume(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const resumeSchema = new mongoose.Schema();

  const resumeModel =
    mongoose.models.resume || mongoose.model("resume", resumeSchema, "resume");

  const resume = await resumeModel
    .findOne()
    .exec()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.status(200).json(resume);
}

async function handleEditResume(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadDir: "./public/tmp/uploads",
    filename: (name, ext, part) => `currículo${ext}`,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500).end();

    const uploadedFile = files.file as File;

    const response = {
      file: uploadedFile,
    };

    await connectToDatabase();

    const resumeSchema = new mongoose.Schema();

    const resumeModel =
      mongoose.models.resume ||
      mongoose.model("resume", resumeSchema, "resume");

    await resumeModel.collection
      .updateOne({}, { $set: response })
      .catch(err => {
        throw new Error(`Erro: ${err}`);
      });

    res.status(200).json({
      message: `Currículo atualizado com sucesso!`,
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGetResume(req, res);
      break;
    case "PATCH":
      handleEditResume(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
