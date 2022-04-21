import mongoose from "mongoose";

async function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI ?? "")
    .then(() => console.log("✅ Database successfully connected!"))
    .catch(error => {
      throw new Error(`❌ Error connecting to database: ${error}.`);
    });
}

export { mongoose, connectToDatabase };
