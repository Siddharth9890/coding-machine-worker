import generateFile from "./generateFiles/generateFile";
import generateJavaFile from "./generateFiles/generateFileJava";
import JobModel from "./models/JobModel";

export default async function checkLanguage(submissionId: string) {
  const job = await JobModel.findOne({ submissionId });
  if (job === null) {
    return "done";
  } else {
    job.startedAt = new Date();
    job.status = "processing";
    if (job.language === "java") {
      await generateJavaFile(job);
    } else {
      await generateFile(job);
    }
  }
}
