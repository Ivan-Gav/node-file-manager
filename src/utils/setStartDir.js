import os from "node:os";
import process from "node:process";

export const setStartDir = () => {
  process.chdir(os.homedir());
};
