import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

export type SocialResponse = {
  social: string;
  profileImage: string;
  name: string;
  username: string;
  description: string;
  following: number;
  followers: number;
  url: string;
};

async function handleGetSocials(req: NextApiRequest, res: NextApiResponse) {
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

  res.status(200).json(socials);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGetSocials(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
