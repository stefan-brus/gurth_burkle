import { council, getProperty, itemAmount, Location, setProperty } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Properties } from "../../Properties";
import { Task } from "../Task";

export const L02Task: Task = {
  name: "L02: Spooky Forest",
  subtasks: [
    {
      name: "Get mosquito larva",
      available: () => getProperty(L02QuestProperty) !== "unstarted",
      progress: () => doL02SpookyForest(),
      completed: () => getProperty(L02QuestProperty) === "finished",
      spikesTask: true,
    },
  ],
};

const L02QuestProperty = "questL02Larva";

const ArborealRespiteChoice = "choiceAdventure502";
const StreamChoice = "choiceAdventure505";

function doL02SpookyForest(): AdventureInfo | void {
  if (getProperty(L02QuestProperty) === "started") {
    setProperty(ArborealRespiteChoice, "2");
    setProperty(StreamChoice, "1");

    if (itemAmount($item`mosquito larva`) < 1) {
      return {
        location: $location`The Spooky Forest`,
        modifiers: [Modifier.NonCombat],
      };
    }
  }

  if (getProperty(L02QuestProperty) === "step1") {
    council();
  }
}
