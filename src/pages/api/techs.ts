import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

interface ITechs {
  techs: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const TechsSchema = new mongoose.Schema({
    techs: { type: Array, required: true },
  });

  const techsModel =
    mongoose.models.techs || mongoose.model("techs", TechsSchema);

  const techs: ITechs = await techsModel
    .findOne({})
    .exec()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  res.send(techs);
};
