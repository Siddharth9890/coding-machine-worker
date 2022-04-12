import path from "path";
import fs from "fs";
import executePy from "../execute/executePy";
import executeCpp from "../execute/executeCpp";
import * as amqp from "amqp-connection-manager";

const dirPath = path.join(__dirname, "codes");

if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

// create the file and execute the code 
const generateFile = async (
  job: any,
  channelWrapper: amqp.ChannelWrapper,
  data: any
) => {
  try {
    const format = job.language;

    let fileToBeCreated;
    if (format === "python") {
      fileToBeCreated = `${job.fileName}.py`;
    } else {
      fileToBeCreated = `${job.fileName}.cpp`;
    }
    const filePath = path.join(dirPath, fileToBeCreated);
    fs.writeFileSync(filePath, job.code);
    await job.save();
    let response;
    if (format === "python") {
      response = await executePy(filePath);
    } else {
      response = await executeCpp(filePath);
    }
    job.status = "completed";
    job.output = response;
    job.completedAt = new Date();
    await job.save();
    channelWrapper.ack(data);
  } catch (error:any) {
    // const position = error.stderr.search(", line");
    job.status = "completed";
    // job.output = JSON.stringify(error.stderr.substring(position));
    job.output = error.stderr;

    job.completedAt = new Date();
    await job.save();
    channelWrapper.ack(data);
  }
};

export default generateFile;
