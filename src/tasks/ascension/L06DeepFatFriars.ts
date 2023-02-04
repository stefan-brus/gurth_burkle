import { getProperty, itemAmount, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const L06Task: Task = {
  name: "L06: Deep Fat Friars",
  subtasks: [
    {
      name: "Talk to friars",
      available: () => getProperty(L06QuestProperty) === "started",
      progress: () => { visitUrl("friars.php?action=friars&pwd"); },
      completed: () => getProperty(L06QuestProperty) !== "started",
    },
    {
      name: "Get dodecagram",
      available: () => getProperty(L06QuestProperty) === "step1" && itemAmount($item`dodecagram`) < 1,
      progress: () => { return { location: $location`The Dark Neck of the Woods`, modifiers: [Modifier.NonCombat] }; },
      completed: () => itemAmount($item`dodecagram`) > 0,
    },
    {
      name: "Get box of birthday candles",
      available: () => getProperty(L06QuestProperty) === "step1" && itemAmount($item`box of birthday candles`) < 1,
      progress: () => { return { location: $location`The Dark Heart of the Woods`, modifiers: [Modifier.NonCombat] }; },
      completed: () => itemAmount($item`box of birthday candles`) > 0,
    },
    {
      name: "Get eldritch butterknife",
      available: () => getProperty(L06QuestProperty) === "step1" && itemAmount($item`eldritch butterknife`) < 1,
      progress: () => { return { location: $location`The Dark Elbow of the Woods`, modifiers: [Modifier.NonCombat] }; },
      completed: () => itemAmount($item`eldritch butterknife`) > 0,
    },
    {
      name: "Cleanse the taint",
      available: () => getProperty(L06QuestProperty) === "step2",
      progress: () => { visitUrl("friars.php?action=ritual&pwd"); },
      completed: () => getProperty(L06QuestProperty) === "finished",
    },
  ],
};

const L06QuestProperty = "questL06Friar";
