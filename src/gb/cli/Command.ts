export type Command = {
  name: string,
  description: string,
  run: () => void,
};
