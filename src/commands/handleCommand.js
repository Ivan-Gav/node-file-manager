import { ls, cd, up } from "./navigation.js";

export const handleCommand = async (input) => {
  const [commandName, ...args] = input.split(/\s+/);

  const commands = {
    ls,
    up,
    cd,
  };

  const command = commands[commandName];
  if (command) {
    await command(args);
  } else {
    throw new Error("Invalid input", {
      cause: `something is wrong with this command: ${input}`,
    });
  }
};
