export const encodeToBase64 = (string: string) =>
  Buffer.from(string).toString("base64");
