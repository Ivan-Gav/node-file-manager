import os from "node:os";
import { throwAppError } from "#utils";

const osCommand = (args) => {
  const arg = args?.[0];

  try {
    switch (arg) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "--cpus": {
        const cpus = os.cpus();
        console.log(`Total CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
          console.log(
            `CPU ${index + 1}: ${cpu.model}, ${
              Math.round(cpu.speed / 100) / 10
            } GHz`
          );
        });
        break;
      }
      case "--homedir":
        console.log(os.homedir());
        break;
      case "--username":
        console.log(os.userInfo().username);
        break;
      case "--architecture":
        console.log(process.arch);
        break;
      default:
        throw new Error("Invalid input", {
          cause: `incorrect os arg: ${arg}`,
        });
    }
  } catch (err) {
    throwAppError(err);
  }
};

export { osCommand as os };
