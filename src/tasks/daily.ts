import { cloversLeft } from "../lib/hermit";
import { Task } from "./task";

export const CloversTask: Task = {
  name: "Buy clovers from hermit",
  subtasks: [
    {
      name: "Buy clovers from hermit",
      completed: () => cloversLeft() == 0,
    },
  ],
};
