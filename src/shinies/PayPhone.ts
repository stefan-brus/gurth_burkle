import { adv1, availableChoiceOptions, canAdventure, getProperty, handlingChoice, haveEffect, itemAmount, lastChoice, runChoice, setProperty, use, userConfirm } from "kolmafia";
import { $effect, $item, $location } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Properties } from "../Properties";
import { Task } from "../tasks/Task";

export const RufusQuestTask: Task = {
  name: "Rufus' Quest",
  subtasks: [
    {
      name: "Loot forest",
      available: () => getProperty(RufusQuestProperty) === "unstarted" &&
                       getProperty(ShadowAffinityProperty) !== "true" &&
                       getProperty(ForestLootedProperty) !== "true" &&
                       itemAmount($item`Rufus's shadow lodestone`) > 0,
      progress: () => lootForest(),
      completed: () => getProperty(ForestLootedProperty) === "true",
    },
    {
      name: "Call Rufus",
      available: () => getProperty(RufusQuestProperty) === "unstarted" && 
                       canAdventure($location`Shadow Rift (The Misspelled Cemetary)`) && 
                       getProperty(ShadowAffinityProperty) !== "true" &&
                       itemAmount($item`Rufus's shadow lodestone `) < 1,
      progress: () => callRufus(),
      completed: () => getProperty(RufusQuestProperty) !== "unstarted",
      mainstat: 100,
    },
    {
      name: "Get Rufus' artifact",
      available: () => getProperty(RufusQuestProperty) === "started",
      progress: () => getRufusArtifact(),
      completed: () => getProperty(RufusQuestProperty) !== "started",
    },
    {
      name: "Call Rufus back",
      available: () => getProperty(RufusQuestProperty) === "step1",
      progress: () => callRufusBack(),
      completed: () =>getProperty(RufusQuestProperty) !== "step1",
    },
  ],
};

const RufusQuestProperty = "questRufus";
const ShadowAffinityProperty = "_shadowAffinityToday";
const ForestLootedProperty = "_shadowForestLooted";

function callRufus() {
  const CallingRufusChoice = "choiceAdventure1497";
  setProperty(CallingRufusChoice, "2");
  use($item`closed-circuit pay phone`);
}

function getRufusArtifact(): AdventureInfo | void {
  const ShadowLabyrinthChoice = "choiceAdventure1499";
  setProperty(ShadowLabyrinthChoice, "0");

  return {
    location: $location`Shadow Rift (The Misspelled Cemetary)`,
    modifiers: [],
  };
}

function callRufusBack() {
  const CallingBackChoice = "choiceAdventure1498";
  setProperty(CallingBackChoice, "1");
  use($item`closed-circuit pay phone`);
}

function lootForest() {
  const LodedStoneChoice = "choiceAdventure1500";
  setProperty(LodedStoneChoice, "3");
  adv1($location`Shadow Rift(The Misspelled Cemetary)`);
}
