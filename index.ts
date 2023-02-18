import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connection from "./config/rabbitmq";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

const PORT = process.env.PORT || 8000;
mongoose
  .connect(DB)
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));
const app = express();
connection.on("connect", function () {
  console.log("Connected to rabbit mq");
});

connection.on("disconnect", function (err) {
  console.log("Disconnected.", err);
});

app.use(
  cors({
    origin: [
      "https://coding-machine.pages.dev",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started  on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE ADMIN UNHANDLED REJECTION");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error);
  console.log("SERVER CLOSING 😱 CALL THE ADMIN UNCAUGHT EXCEPTION");
  process.exit(1);
});
