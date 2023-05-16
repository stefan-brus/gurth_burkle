import { Action } from "../action/Action";

export type Task = {
  name: string,
  actions: () => Action[],
  completed: () => boolean,
  requires?: Task[],
  council?: boolean,
};
