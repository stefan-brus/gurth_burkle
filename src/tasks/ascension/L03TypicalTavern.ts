import { getProperty, visitUrl } from "kolmafia";
import { $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Task } from "../Task";

export const L03Task: Task = {
  name: "L03: Typical Tavern",
  subtasks: [
    {
      name: "Talk to Bart Ender",
      available: () => getProperty(questL03Property) === "started",
      progress: () => bartEnder(),
      completed: () => getProperty(questL03Property) !== "started",
    },
    {
      name: "Explore the cellar",
      available: () => getProperty(questL03Property) === "step1",
      progress: () => doL03TypicalTavern(),
      completed: () => getProperty(questL03Property) !== "step1",
    },
    {
      name: "Return to Bart Ender",
      available: () => getProperty(questL03Property) === "step2",
      progress: () => bartEnder(),
      completed: () => getProperty(questL03Property) === "finished",
    },
  ],
};

const questL03Property = "questL03Rat";

function bartEnder() {
  visitUrl("tavern.php?place=barkeep");
}

function doL03TypicalTavern(): AdventureInfo {
  return {
    location: $location`The Typical Tavern Cellar`,
    modifiers: [],
  };
}
