import { Arguments } from "./Arguments";

export type Command = {
  name: string,
  description: string,
  run: (args: Arguments) => void,
};
