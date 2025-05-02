import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";

import { getUserName, logCurrentDir, setStartDir } from "#utils";

let username;
try {
  username = getUserName();
  console.log(`Welcome to the File Manager, ${username}!`);
  setStartDir();
  logCurrentDir();
} catch (error) {
  console.error("Invalid input");
  // throw new Error("Invalid input")
}

const rl = readline.createInterface({ input: stdin, output: stdout });

const onExit = () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

process.on("SIGINT", onExit);

//--------------------------------------------------------------------------

const commands = {
  ".exit": onExit,
  // Список доступных команд
};

try {
  while (true) {
    const line = await rl.question("> ");
    const input = line.trim();

    const command = commands[input];

    if (command) {
      command();
    } else {
      console.error(`Invalid input: "${input}"`);
    }
  }
} catch (err) {
  if (err?.code === "ABORT_ERR") {
    onExit(); // Ctrl+C
  } else {
    console.error("Invalid input:", err);
    process.exit(1);
  }
}
