import path from "path";
import os from "os";
import fs from "fs";
import executePy from "../execute/executePy";
import executeCpp from "../execute/executeCpp";
const outPutPath = path.join(os.tmpdir(), "/output");
const dirPath = path.join(os.tmpdir(), "/codes");

// create the file and execute the code
const generateFile = async (job: any) => {
  try {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    if (!fs.existsSync(outPutPath))
      fs.mkdirSync(outPutPath, { recursive: true });

    const format = job.language;

    let fileToBeCreated;
    if (format === "python") {
      fileToBeCreated = `${job.submissionId}.py`;
    } else {
      fileToBeCreated = `${job.submissionId}.cpp`;
    }
    console.log("file to be created ", fileToBeCreated);
    const filePath = path.join(dirPath, fileToBeCreated);
    fs.writeFileSync(filePath, job.code);
    await job.save();
    let response;
    if (format === "python") {
      response = await executePy(filePath);
    } else {
      response = await executeCpp(filePath, outPutPath);
    }
    console.log(`response for job id ${job.submissionId}`, response);
    job.status = "completed";
    job.output = response;
    job.completedAt = new Date();
    await job.save();
    return "done";
  } catch (error: any) {
    console.log("e", error);
    // const position = error.stderr.search(", line");
    job.status = "completed";
    // job.output = JSON.stringify(error.stderr.substring(position));
    job.output = error.stderr;

    job.completedAt = new Date();
    await job.save();
    return "done";
  }
};

export default generateFile;
