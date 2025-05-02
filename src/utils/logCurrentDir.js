import { resolve } from "node:path";
import process from "node:process";

export const logCurrentDir = () => {
  const currentPath = resolve(process.cwd());
  console.log(`You are currently in ${currentPath}`);
};
