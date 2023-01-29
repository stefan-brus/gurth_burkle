import { Location } from "kolmafia";
import { AdventureInfo } from "../lib/adventure_info";

export type Task = {
  name: string,
  subtasks: Subtask[],
};

export type Subtask = {
  name: string,
  available: () => boolean,
  completed: () => boolean,
  progress: () => AdventureInfo | void,
  mainstat?: number,
  delay?: DelayInfo,
};

type DelayInfo = {
  location: Location,
  turns: number,
  property: string,
}
