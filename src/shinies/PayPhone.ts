import { canAdventure, getProperty, haveEffect, runChoice, use } from "kolmafia";
import { $effect, $item, $location } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Properties } from "../Properties";
import { Task } from "../tasks/Task";

export const RufusQuestTask: Task = {
  name: "Rufus' Quest",
  subtasks: [
    {
      name: "Call Rufus",
      available: () => getProperty(RufusQuestProperty) === "unstarted" && 
                       canAdventure($location`Shadow Rift (The Misspelled Cemetary)`) && 
                       getProperty(Properties.Daily.RufusQuestDone) !== "true",
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

function callRufus() {
  use($item`closed-circuit pay phone`);
  runChoice(2);
}

function getRufusArtifact(): AdventureInfo {
  return {
    location: $location`Shadow Rift (The Misspelled Cemetary)`,
    modifiers: [],
  };
}

function callRufusBack() {
  use($item`closed-circuit pay phone`);
  runChoice(1);
}
