import path from "path";
import fs from "fs";
import executeJava from "../execute/executeJava";

const dirPath = path.join(__dirname, "../../tmp/codes");

const generateJavaFile = async (job: any) => {
  try {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    const fileToBeCreated = `Main.java`;
    const filePath = path.join(dirPath, fileToBeCreated);
    fs.writeFileSync(filePath, job.code);
    await job.save();
    const response = await executeJava(filePath);
    job.status = "completed";
    job.output = response;
    job.completedAt = new Date();
    await job.save();

    return "done";
  } catch (error: any) {
    job.status = "completed";
    // const position = error.stderr.search("error");
    // job.output = JSON.stringify(error.stderr.substring(position));
    job.output = error.stderr;

    job.completedAt = new Date();
    await job.save();

    return "done";
  }
};

export default generateJavaFile;
