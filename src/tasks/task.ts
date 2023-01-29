import { Location } from "kolmafia";

export type Task = {
  name: string,
  subtasks: Subtask[],
};

type Subtask = {
  name: string,
  completed: () => boolean,
  mainstat?: number,
  delay?: DelayInfo,
};

type DelayInfo = {
  location: Location,
  turns: number,
}
