import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

interface ITechs {
  _doc: {
    techs: string[];
  };
}

async function connectToDatabase(uri: string) {
  mongoose
    .connect(uri)
    .then(() => console.log("✅ Database successfully connected!"))
    .catch(error => {
      throw new Error(`❌ Error connecting to database: ${error}.`);
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase(process.env.MONGODB_URI ?? "");

  const techsSchema = new mongoose.Schema({}, { collection: "techs" });

  const techs = mongoose.models.techs || mongoose.model("techs", techsSchema);

  techs.findOne({}, (error: string, techs: ITechs) => {
    if (error) throw error;

    return res.json(techs["_doc"].techs);
  });
};
