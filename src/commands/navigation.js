import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { throwAppError } from "#utils";

export const up = () => {
  const parentDir = path.dirname(process.cwd());
  if (parentDir !== process.cwd()) {
    process.chdir(parentDir);
  }
};

export const cd = (args) => {
  if (!args || args.length === 0) {
    throw new Error("Invalid input", { cause: "arguments expected" });
  }

  const targetPath = path.resolve(process.cwd(), args.join(" "));

  try {
    process.chdir(targetPath);
  } catch (err) {
    throwAppError(err);
  }
};

export const ls = async () => {
  try {
    const files = await readdir(process.cwd());

    const detailed = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(process.cwd(), file);
        const stats = await stat(fullPath);
        return {
          Name: file,
          Type: stats.isDirectory() ? "directory" : "file",
        };
      })
    );

    const sorted = [
      ...detailed
        .filter((f) => f.Type === "directory")
        .sort((a, b) => a.Name.localeCompare(b.Name)),
      ...detailed
        .filter((f) => f.Type === "file")
        .sort((a, b) => a.Name.localeCompare(b.Name)),
    ];

    console.table(sorted);
  } catch (err) {
    throwAppError(err);
  }
};
