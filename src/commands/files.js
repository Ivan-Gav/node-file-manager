// src/commands/file.js

import { createReadStream, createWriteStream } from "node:fs";
import { mkdir as mkdirFs, rename, unlink } from "node:fs/promises";
import { open } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import process from "node:process";
import { throwAppError } from "#utils";

export const cat = async (args) => {
  try {
    if (!args || args.length === 0) {
      throw new Error("Invalid input", { cause: "arguments expected" });
    }

    const filePath = path.resolve(process.cwd(), args.join(" "));
    const stream = createReadStream(filePath, "utf-8");
    await pipeline(stream, process.stdout, {
      end: false,
    });
  } catch (err) {
    throwAppError(err);
  }
};

export const add = async (args) => {
  try {
    if (!args || args.length === 0) {
      throw new Error("Invalid input", { cause: "arguments expected" });
    }

    const fileName = args.join(" ");

    const filePath = path.resolve(process.cwd(), fileName);
    const file = await open(filePath, "wx");
    file.close();
    console.log(`File "${fileName}" has been created`);
  } catch (err) {
    throwAppError(err);
  }
};

export const mkdir = async (args) => {
  try {
    if (!args || args.length === 0) {
      throw new Error("Invalid input", { cause: "arguments expected" });
    }

    const dirName = args.join(" ");

    const dirPath = path.resolve(process.cwd(), dirName);
    await mkdirFs(dirPath);
    console.log(`Directory "${dirName}" has been created`);
  } catch (err) {
    throwAppError(err);
  }
};

export const rn = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error("Invalid input", { cause: "2 arguments expected" });
    }

    const oldPath = path.resolve(process.cwd(), args[0]);
    const newPath = path.resolve(path.dirname(oldPath), args[1]);

    await rename(oldPath, newPath);
    console.log(
      `File "${path.basename(oldPath)}" has been renamed to "${args[1]}"`
    );
  } catch (err) {
    throwAppError(err);
  }
};

export const cp = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error("Invalid input", { cause: "2 arguments expected" });
    }

    const src = path.resolve(process.cwd(), args[0]);
    const dest = path.resolve(process.cwd(), args[1], path.basename(src));

    await pipeline(createReadStream(src), createWriteStream(dest));
    console.log(
      `File "${path.basename(src)}" has been copied to specified directory`
    );
  } catch (err) {
    throwAppError(err);
  }
};

export const mv = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error("Invalid input", { cause: "2 arguments expected" });
    }

    const src = path.resolve(process.cwd(), args[0]);
    const dest = path.resolve(process.cwd(), args[1], path.basename(src));

    await pipeline(createReadStream(src), createWriteStream(dest));
    await unlink(src);
    console.log(
      `File "${path.basename(src)}" has been moved to specified directory`
    );
  } catch (err) {
    throwAppError(err);
  }
};

export const rm = async (args) => {
  try {
    if (!args || args.length === 0) {
      throw new Error("Invalid input", { cause: "arguments expected" });
    }

    const filePath = path.resolve(process.cwd(), args[0]);
    await unlink(filePath);
    console.log(`File "${path.basename(filePath)}" has been deleted`);
  } catch (err) {
    throwAppError(err);
  }
};
