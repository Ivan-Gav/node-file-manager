import { parseArgs } from "node:util";

export const getUserName = () => {
  const args = process.argv.slice(2);

  const { values } = parseArgs({
    args,
    strict: true,
    options: {
      username: {
        type: "string",
        multiple: true,
      },
    },
  });

  if (values.username.length > 1) {
    throw new Error("multiple user names are not allowed");
  }

  if (!values.username[0]) {
    throw new Error("user name should be specified");
  }

  return values.username[0];
};
