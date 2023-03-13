import { getProperty, itemAmount, setProperty, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const L07Task: Task = {
  name: "L07: The Cyrpt",
  subtasks: [
    {
      name: "Undefile the Niche",
      available: () => getProperty(L07QuestProperty) === "started",
      progress: () => undefileNiche(),
      completed: () => parseInt(getProperty("cyrptNicheEvilness")) === 0,
    },
    {
      name: "Undefile the Nook",
      available: () => getProperty(L07QuestProperty) === "started",
      progress: () => undefileNook(),
      completed: () => parseInt(getProperty("cyrptNookEvilness")) === 0,
      focusTask: true,
    },
    {
      name: "Undefile the Alcove",
      available: () => getProperty(L07QuestProperty) === "started",
      progress: () => undefileAlcove(),
      completed: () => parseInt(getProperty("cyrptAlcoveEvilness")) === 0,
      focusTask: true,
    },
    {
      name: "Undefile the Cranny",
      available: () => getProperty(L07QuestProperty) === "started",
      progress: () => undefileCranny(),
      completed: () => parseInt(getProperty("cyrptCrannyEvilness")) === 0,
      focusTask: true,
    },
    {
      name: "Kill the bonerdagon",
      available: () => parseInt(getProperty("cyrptNicheEvilness")) === 0 &&
                       parseInt(getProperty("cyrptNookEvilness")) === 0 &&
                       parseInt(getProperty("cyrptAlcoveEvilness")) === 0 &&
                       parseInt(getProperty("cyrptCrannyEvilness")) === 0,
      progress: () => killBonerdagon(),
      completed: () => getProperty(L07QuestProperty) === "step1" || getProperty(L07QuestProperty) === "finished",
    },
    {
      name: "Use chest of the bonerdagon",
      available: () => itemAmount($item`chest of the bonerdagon`) > 0,
      progress: () => { use(1, $item`chest of the bonerdagon`); },
      completed: () => itemAmount($item`chest of the bonerdagon`) === 0,
    },
  ],
};

const L07QuestProperty = "questL07Cyrptic";

const NicheChoice = "choiceAdventure157";

function undefileNiche(): AdventureInfo {
  setProperty(NicheChoice, "4");

  return {
    location: $location`The Defiled Niche`,
    modifiers: [],
  };
}

const NookChoice = "choiceAdventure155";

function undefileNook(): AdventureInfo {
  setProperty(NookChoice, "5");
  
  use(itemAmount($item`evil eye`), $item`evil eye`);

  return {
    location: $location`The Defiled Nook`,
    modifiers: [Modifier.ItemDrop],
    getSpecialEffects: true,
  };
}

const AlcoveChoice = "choiceAdventure153";

function undefileAlcove(): AdventureInfo {
  setProperty(AlcoveChoice, "4");

  return {
    location: $location`The Defiled Alcove`,
    modifiers: [Modifier.Initiative],
    getSpecialEffects: true,
  };
}

const CrannyChoice = "choiceAdventuer523";

function undefileCranny(): AdventureInfo {
  setProperty(CrannyChoice, "4");

  return {
    location: $location`The Defiled Cranny`,
    modifiers: [Modifier.NonCombat, Modifier.MonsterLevel],
    getSpecialEffects: true,
  }
}

const HaertChoice = "choiceAdventure527";

function killBonerdagon(): AdventureInfo {
  setProperty(HaertChoice, "1");

  return {
    location: $location`Haert of the Cyrpt`,
    modifiers: [],
  };
}
