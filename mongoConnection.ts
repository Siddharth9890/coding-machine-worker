import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE!;

export const mongoConnection = async () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("DB CONNECTION FAILED");
    });
};
