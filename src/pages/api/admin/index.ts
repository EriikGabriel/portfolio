import { NextApiRequest, NextApiResponse } from "next";

import { mongoose, connectToDatabase } from "@config/database";

import bcrypt from "bcryptjs";

interface IAdmins {
  username: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const AdminsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  const adminModel =
    mongoose.models.admin || mongoose.model("admin", AdminsSchema, "admins");

  const data: IAdmins = req.body;

  const admin: IAdmins = await adminModel
    .findOne({ username: data.username })
    .exec()
    .catch(err => {
      throw new Error(`Erro: ${err}`);
    });

  if (admin && (await bcrypt.compare(data.password, admin.password))) {
    res.send(admin);
  } else res.send(null);
};
