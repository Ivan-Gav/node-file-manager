import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";

import { getUserName, logCurrentDir, setStartDir } from "#utils";
import { handleCommand } from "#commands";

let username;
try {
  username = getUserName();
  console.log(`Welcome to the File Manager, ${username}!`);
  setStartDir();
  logCurrentDir();
} catch (err) {
  console.error("Invalid input");
  process.exit(1);
}

const rl = readline.createInterface({ input: stdin, output: stdout });

const onExit = () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

process.on("SIGINT", onExit);

//--------------------------------------------------------------------------

try {
  while (true) {
    const line = await rl.question("> ");
    const input = line.trim();

    if (input === ".exit") {
      onExit(username);
    }

    try {
      await handleCommand(input);
      logCurrentDir();
    } catch (err) {
      const message = "message" in err ? err.message : String(err);
      if (message === "Invalid input" || message === "Operation failed") {
        console.error(message);
      } else {
        throw err;
      }
    }
  }
} catch (err) {
  if (err?.code === "ABORT_ERR") {
    onExit(); // Ctrl+C
  } else {
    console.error(err);
    process.exit(1);
  }
}
