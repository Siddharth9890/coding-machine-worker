import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { kill } from "process";

const outPutPath = path.join(__dirname, "output");

if (!fs.existsSync(outPutPath)) fs.mkdirSync(outPutPath, { recursive: true });

const executeJava = (filePath: string) => {
  const File = filePath.split("Main.java")[0];
  return new Promise((resolve, reject) => {
    const s = exec(
      `javac ${filePath} && cd ${File} && java Main  `,
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

export default executeJava;
