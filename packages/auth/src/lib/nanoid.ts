import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
  "1234567890ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  32,
);
