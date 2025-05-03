import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { pipeline } from "node:stream/promises";
import { throwAppError } from "#utils";

export const hash = async (args) => {
  try {
    if (!args || args.length === 0) {
      throw new Error("Invalid input", { cause: "arguments expected" });
    }

    const filePath = path.resolve(process.cwd(), args[0]);
    const hashStream = createHash("sha256").setEncoding("hex");

    await pipeline(createReadStream(filePath), hashStream);

    hashStream.end();
    console.log(`hash for ${path.basename(filePath)}: ${hashStream.read()}`);
  } catch (err) {
    throwAppError(err);
  }
};
