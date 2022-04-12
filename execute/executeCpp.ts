import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { kill } from "process";

const outPutPath = path.join(__dirname, "output");

if (!fs.existsSync(outPutPath)) fs.mkdirSync(outPutPath, { recursive: true });

const executeCpp = (filePath: string) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outPutPath, `${jobId}`);
  console.log(outPath);
  console.log(jobId);
  // `g++ ${filePath} -o ${outPath} && cd ${outPutPath} && ./${jobId}.out `,
  return new Promise((resolve, reject) => {
    const s = exec(
      `g++ ${filePath} -o ${outPath} && cd ${outPutPath} && ./${jobId} `,
      (error, stdout, stderr) => {
        if (error) reject({ stderr });
        if (stderr) reject({ stderr });
        resolve(stdout);
      }
    );
    setTimeout(() => {
      try {
        console.log(kill(s.pid as number));
        reject({
          stderr:
            "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 5 SECONDS ",
        });
      } catch (error) {
        reject({
          stderr:
            "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 5 SECONDS ",
        });
      }
    }, 5000);
  });
};

export default executeCpp;
