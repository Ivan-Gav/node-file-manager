// src/commands/compress.js

import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import process from "node:process";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { throwAppError } from "#utils";

export const compress = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error("Invalid input", { cause: "2 arguments expected" });
    }

    const sourceFile = path.resolve(process.cwd(), args[0]);
    const targetFile = path.resolve(process.cwd(), args[1]);

    await pipeline(
      createReadStream(sourceFile),
      createBrotliCompress(),
      createWriteStream(targetFile)
    );

    console.log(
      `File ${path.basename(sourceFile)} compressed into ${path.basename(
        targetFile
      )}`
    );
  } catch (err) {
    throwAppError(err);
  }
};

export const decompress = async (args) => {
  try {
    if (!args || args.length < 2) {
      throw new Error("Invalid input", { cause: "2 arguments expected" });
    }

    const sourceFile = path.resolve(process.cwd(), args[0]);
    const targetFile = path.resolve(process.cwd(), args[1]);

    await pipeline(
      createReadStream(sourceFile),
      createBrotliDecompress(),
      createWriteStream(targetFile)
    );

    console.log(
      `File ${path.basename(sourceFile)} decompressed into ${path.basename(
        targetFile
      )}`
    );
  } catch (err) {
    throwAppError(err);
  }
};
