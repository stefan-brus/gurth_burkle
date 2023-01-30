import { getProperty, Location } from "kolmafia";
import { Properties } from "../../Properties";
import { Task } from "../Task";

const L02QuestProperty = "questL02Larva";

export const L02Task: Task = {
  name: "L02: Spooky Forest",
  subtasks: [
    {
      name: "Get mosquito larva",
      available: () => getProperty(L02QuestProperty) !== "unstarted",
      completed: () => getProperty(L02QuestProperty) === "finished",
      progress: () => {return},
      delay: {
        location: Location.get("The Spooky Forest"),
        turns: 5,
        property: Properties.Ascension.Delay.SpookyForest,
      },
    },
  ],
};
