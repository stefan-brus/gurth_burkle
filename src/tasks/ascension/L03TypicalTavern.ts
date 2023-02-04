import { getProperty, visitUrl } from "kolmafia";
import { $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Task } from "../Task";

export const L03Task: Task = {
  name: "L03: Typical Tavern",
  subtasks: [
    {
      name: "Talk to Bart Ender",
      available: () => getProperty(L03QuestProperty) === "started",
      progress: () => bartEnder(),
      completed: () => getProperty(L03QuestProperty) !== "started",
    },
    {
      name: "Explore the cellar",
      available: () => getProperty(L03QuestProperty) === "step1",
      progress: () => doL03TypicalTavern(),
      completed: () => getProperty(L03QuestProperty) !== "step1",
    },
    {
      name: "Return to Bart Ender",
      available: () => getProperty(L03QuestProperty) === "step2",
      progress: () => bartEnder(),
      completed: () => getProperty(L03QuestProperty) === "finished",
    },
  ],
};

const L03QuestProperty = "questL03Rat";

function bartEnder() {
  visitUrl("tavern.php?place=barkeep");
}

function doL03TypicalTavern(): AdventureInfo {
  return {
    location: $location`The Typical Tavern Cellar`,
    modifiers: [],
  };
}
