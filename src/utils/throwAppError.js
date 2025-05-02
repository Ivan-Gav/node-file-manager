export const throwAppError = (err) => {
  const cause = "message" in err ? err.message : String(err);
  if (cause === "Invalid input") {
    throw err;
  }
  throw new Error("Operation failed", { cause });
};
