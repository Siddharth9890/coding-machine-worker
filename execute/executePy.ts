import { exec } from "child_process";
import { kill } from "process";

const executePy = (filePath: string) => {
  return new Promise((resolve, reject) => {
    const s = exec(`python ${filePath} `, (error, stdout, stderr) => {
      if (error) reject({ stderr });
      if (stderr) reject({ stderr });
      resolve(stdout);
    });
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

export default executePy;
