import { getProperty, itemAmount, numericModifier, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier, toMafiaModifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const L04Task: Task = {
  name: "L04: Boss Bat",
  subtasks: [
    {
      name: "Demolish walls",
      available: () => ["started", "step1", "step2"].some(val => val === getProperty(L04QuestProperty)) && numericModifier(toMafiaModifier(Modifier.StenchRes)) > 1,
      progress: () => doDemolishWalls(),
      completed: () => ["step3", "step4", "finished"].some(val => val === getProperty(L04QuestProperty)),
    },
    {
      name: "Kill boss bat",
      available: () => getProperty(L04QuestProperty) === "step3",
      progress: () => doKillBossBat(),
      completed: () => ["step4", "finished"].some(val => val === getProperty(L04QuestProperty)),
    },
  ],
};

const L04QuestProperty = "questL04Bat";

function doDemolishWalls(): AdventureInfo {
  use(itemAmount($item`sonar-in-a-biscuit`), $item`sonar-in-a-biscuit`);
  
  return {
    location: $location`Guano Junction`,
    modifiers: [Modifier.StenchRes],
    minModifier: [Modifier.StenchRes, 1],
  };
}

function doKillBossBat(): AdventureInfo {
  return {
    location: $location`The Boss Bat's Lair`,
    modifiers: [],
  };
}
