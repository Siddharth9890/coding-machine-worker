import { exec } from "child_process";
import { kill } from "process";

const executeJava = (filePath: string): Promise<string> => {
  const File = filePath.split("Main.java")[0];
  return new Promise((resolve, reject) => {
    const s = exec(
      `cd ${File} && javac Main.java && java Main`,
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
            "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 15 SECONDS ",
        });
      } catch (error) {
        reject({
          stderr:
            "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 15 SECONDS ",
        });
      }
    }, 5000);
  });
};

export default executeJava;
