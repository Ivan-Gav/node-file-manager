export const logError = (err) => {
  console.error(`Error: ${err.message}`);
  if (err.cause) console.error(`[cause]: ${err.cause}`);
};
