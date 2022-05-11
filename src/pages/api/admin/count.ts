import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const ProjectsSchema = new mongoose.Schema({
    projects: { type: Array, required: true },
  });
  const SocialsSchema = new mongoose.Schema();

  const projectsModel =
    mongoose.models.projects || mongoose.model("projects", ProjectsSchema);

  const socialsModel =
    mongoose.models.socials || mongoose.model("socials", SocialsSchema);

  const projectsCount = await projectsModel.collection
    .countDocuments()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  const socialsCount = await socialsModel.collection
    .countDocuments()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.send({ projects: projectsCount, socials: socialsCount });
};
