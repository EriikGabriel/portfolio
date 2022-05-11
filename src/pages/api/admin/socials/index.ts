import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

export async function handleGetSocials() {
  await connectToDatabase();

  const SocialsSchema = new mongoose.Schema();

  const socialsModel =
    mongoose.models.socials || mongoose.model("socials", SocialsSchema);

  const socials = await socialsModel
    .find()
    .exec()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  return socials;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await handleGetSocials());
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
