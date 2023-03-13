import { Location } from "kolmafia";
import { AdventureInfo } from "../lib/AdventureInfo";

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
  focusTask?: boolean,
  spikesTask?: boolean,
};
