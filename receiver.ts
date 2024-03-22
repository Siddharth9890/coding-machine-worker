import { SQSHandler } from "aws-lambda";
import { mongoConnection } from "./mongoConnection";
import checkLanguage from "./checkLanguage";
import os from "os";


const receiver: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      await mongoConnection();
      console.log("Starting following job id -->  ", record.body);
      console.log("temp dire", os.tmpdir());
      await checkLanguage(record.body);
    }
  } catch (error) {
    console.log(error);
  }
};

export default receiver;
