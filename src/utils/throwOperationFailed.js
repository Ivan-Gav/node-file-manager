export const throwOperatiionFailed = (err) => {
  const cause = "message" in err ? err.message : String(err);
  throw new Error("Operation failed", { cause });
};
