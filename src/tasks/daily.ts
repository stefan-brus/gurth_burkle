import { buyClovers, cloversLeft } from "../lib/hermit";
import { Task } from "./task";

export const CloversTask: Task = {
  name: "Buy clovers from hermit",
  subtasks: [
    {
      name: "Buy clovers from hermit",
      available: () => true,
      completed: () => cloversLeft() === 0,
      progress: () => buyClovers(),
    },
  ],
};
