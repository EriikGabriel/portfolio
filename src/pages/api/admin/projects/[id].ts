import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase, mongoose } from "@config/database";

import fs from "fs";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      handleDeleteProject(req, res);
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
