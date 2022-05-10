import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  const projectsCount = await projectsModel.collection
    .countDocuments()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.send({ projects: projectsCount });
};
