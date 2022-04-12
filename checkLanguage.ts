import * as amqp from "amqp-connection-manager";
import generateFile from "./generateFiles/generateFile";
import generateJavaFile from "./generateFiles/generateFileJava";
import JobModel from "./models/JobModel";

// check if the language is java else create a normal file
// and also assign the start time as well and change the status to processing
export default async function checkLanguage(
  fileName: string,
  channelWrapper: amqp.ChannelWrapper,
  data: any
) {
  const job = await JobModel.findOne({ fileName });
  if (job === null) {
    channelWrapper.ack(data);
  } else {
    const currentDate = new Date().getTime();
    job.startedAt = currentDate;
    job.status = "processing";
    if (job.language === "java") {
      generateJavaFile(job, channelWrapper, data);
    } else {
      generateFile(job, channelWrapper, data);
    }
  }
}
