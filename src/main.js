import { getUserName } from "#utils";

let username;
try {
  username = getUserName();
  console.log(`Welcome to the File Manager, ${username}!`);
} catch (error) {
  console.error("Invalid input");
}
