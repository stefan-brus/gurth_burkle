import { create, getProperty, itemAmount, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { checkUseClover, haveOrEquipped } from "../../lib/Utils";
import { Task } from "../Task";

export const L05Task: Task = {
  name: "L05: Goblin King",
  subtasks: [
    {
      name: "Decrypt Cobb's Knob map",
      available: () => getProperty(L05QuestProperty) === "started",
      progress: () => doDecryptMap(),
      completed: () => getProperty(L05QuestProperty) === "step1",
    },
    {
      name: "Get guard outfit",
      available: () => getProperty(L05QuestProperty) === "step1",
      progress: () => doGetGuardOutfit(),
      completed: () => haveGuardOutfit(),
    },
    {
      name: "Get cake ingredients",
      available: () => haveGuardOutfit() && itemAmount($item`Knob cake`) < 1,
      progress: () => doGetCakeIngredients(),
      completed: () => haveCakeIngredients(),
    },
    {
      name: "Bake Knob cake",
      available: () => haveCakeIngredients(),
      progress: () => { create(1, $item`Knob cake`); },
      completed: () => itemAmount($item`Knob cake`) > 0,
    },
    {
      name: "Kill Goblin King",
      available: () => itemAmount($item`Knob cake`) > 0,
      progress: () => doKillGoblinKing(),
      completed: () => getProperty(L05QuestProperty) === "finished",
    },
  ],
};

const L05QuestProperty = "questL05Goblin";

function doDecryptMap(): AdventureInfo | void {
  if (itemAmount($item`Knob Goblin encryption key`) > 0) {
    use(1, $item`Cobb's Knob map`);
  }
  else {
    return {
      location: $location`The Outskirts of Cobb's Knob`,
      modifiers: [Modifier.NonCombat],
    };
  }
}

function doGetGuardOutfit(): AdventureInfo {
  checkUseClover("Get Knob Goblin guard outfit");

  return {
    location: $location`Cobb's Knob Barracks`,
    modifiers: [],
  };
}

function haveGuardOutfit(): boolean {
  return haveOrEquipped($item`Knob Goblin elite polearm`) &&
         haveOrEquipped($item`Knob Goblin elite pants`) &&
         haveOrEquipped($item`Knob Goblin elite helm`);
}

function doGetCakeIngredients(): AdventureInfo {
  return {
    location: $location`Cobb's Knob Kitchens`,
    modifiers: [],
  };
}

function haveCakeIngredients(): boolean {
  return itemAmount($item`Knob cake pan`) > 0 &&
         itemAmount($item`Knob batter`) > 0 &&
         itemAmount($item`Knob frosting`) > 0;
}

function doKillGoblinKing(): AdventureInfo {
  return {
    location: $location`Throne Room`,
    modifiers: [],
  };
}
