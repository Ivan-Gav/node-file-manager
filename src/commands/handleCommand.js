import { ls, cd, up } from "./navigation.js";
import { cat, add, mkdir, rn, cp, mv, rm } from "./files.js";
import { os } from "./os.js";
import { hash } from "./hash.js";

export const handleCommand = async (input) => {
  const [commandName, ...args] = input.split(/\s+/);

  const commands = {
    ls,
    up,
    cd,
    cat,
    add,
    mkdir,
    rn,
    cp,
    mv,
    rm,
    os,
    hash,
  };

  const command = commands[commandName];
  if (command) {
    await command(args);
  } else {
    throw new Error("Invalid input", {
      cause: `wrong command: ${input}`,
    });
  }
};
