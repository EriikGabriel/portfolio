import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

async function handleGetSocialById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDatabase();

  const SocialsSchema = new mongoose.Schema();

  const socialsModel =
    mongoose.models.socials || mongoose.model("socials", SocialsSchema);

  await socialsModel.collection
    .findOne({ _id: new mongoose.Types.ObjectId(`${id}`) })
    .then(social => res.send(social))
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });
}

async function handleEditSocial(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectToDatabase();

  const SocialsSchema = new mongoose.Schema();

  const socialsModel =
    mongoose.models.socials || mongoose.model("socials", SocialsSchema);

  await socialsModel.collection
    .findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(`${id}`) },
      { $set: req.body }
    )
    .then(social => res.send(social.value))
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGetSocialById(req, res);
      break;
    case "PATCH":
      handleEditSocial(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
