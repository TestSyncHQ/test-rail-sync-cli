import readline from "readline";

export const RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export enum ANSIColor {
  Blue = "\x1b[34m%s\x1b[0m",
  Green = "\x1b[32m%s\x1b[0m",
  Orange = "\x1b[38;5;214m%s\x1b[0m",
  Red = "\x1b[31m%s\x1b[0m",
  Yellow = "\x1b[33m%s\x1b[0m",
}
