import { getProperty } from "kolmafia";
import { Task } from "../task";

const L02_QUEST_PROPERTY = "questL02Larva";

export const L02Task: Task = {
  name: "L02: Spooky Forest",
  subtasks: [
    {
      name: "Get mosquito larva",
      completed: () => getProperty(L02_QUEST_PROPERTY) == "finished",
    },
  ],
};
