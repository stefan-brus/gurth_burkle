import { cliExecute, getProperty, haveSkill, hippyStoneBroken, myAdventures, myMaxmp, myMeat, pvpAttacksLeft, Skill, visitUrl } from "kolmafia";
import { Constants } from "../Constants";
import { haveDailyDungeonItems, runDailyDungeon } from "../lib/DailyDungeon";
import { buyClovers, cloversLeft } from "../lib/Hermit";
import { myUseSkill } from "../lib/Skill";
import { Properties } from "../Properties";
import { Oliver } from "../shinies/Oliver";
import { RockGarden } from "../shinies/RockGarden";
import { Task } from "./Task";

export const CloversTask: Task = {
  name: "Buy clovers from hermit",
  subtasks: [
    {
      name: "Buy clovers from hermit",
      available: () => myMeat() > 3000,
      completed: () => cloversLeft() === 0,
      progress: () => buyClovers(),
    },
  ],
};

export const IngredientsTask: Task = {
  name: "Summon daily ingredients",
  subtasks: [
    {
      name: "Summon cocktail ingredients",
      available: () => myMaxmp() > 20 && haveSkill(Skill.get("Advanced Cocktailcrafting")),
      progress: () => myUseSkill(1, Skill.get("Advanced Cocktailcrafting")),
      completed: () => parseInt(getProperty("cocktailSummons")) == 1,
    },
    {
      name: "Summon noodles",
      available: () => myMaxmp() > 20 && haveSkill(Skill.get("Pastamastery")),
      progress: () => myUseSkill(1, Skill.get("Pastamastery")),
      completed: () => parseInt(getProperty("noodleSummons")) == 1,
    },
    {
      name: "Summon reagents",
      available: () => myMaxmp() > 20 && haveSkill(Skill.get("Advanced Saucecrafting")),
      progress: () => myUseSkill(1, Skill.get("Advanced Saucecrafting")),
      completed: () => parseInt(getProperty("reagentSummons")) == 1,
    },
  ],
};

export const PvpFightsTask: Task = {
  name: "Do PVP fights",
  subtasks: [
    {
      name: "Do PVP fights",
      available: () => hippyStoneBroken(),
      progress: () => { cliExecute("swagger"); },
      completed: () => pvpAttacksLeft() == 0,
    },
  ],
};

export const OliverFightsTask: Task = {
  name: "Do Oliver's Place free fights",
  subtasks: [
    {
      name: "Do Oliver's Place free fights",
      available: () => true,
      progress: () => Oliver.freeFight(),
      completed: () => Oliver.fightsDone() == 3,
      mainstat: 50,
    },
  ],
};

export const RockGardenTask: Task = {
  name: "Harvest rock garden",
  subtasks: [
    {
      name: "Harvest rock garden",
      available: () => true,
      progress: () => RockGarden.harvestAll(),
      completed: () => parseInt(getProperty(Properties.Daily.RockGardenHarvested)) >= 7,
    },
  ],
};

const KlawSummonsProperty = "_klawSummons";

export const MrKlawTask: Task = {
  name: "Mr. Klaw pulls",
  subtasks: [
    {
      name: "Mr. Klaw pulls",
      available: () => true,
      progress: () => { visitUrl("clan_rumpus.php?action=click&spot=3&furni=3"); },
      completed: () => parseInt(getProperty(KlawSummonsProperty)) >= 3,
    },
  ],
};

const DailyDungeonDoneProperty = "dailyDungeonDone";

export const DailyDungeonTask: Task = {
  name: "Daily Dungeon",
  subtasks: [
    {
      name: "Daily Dungeon",
      available: () => myAdventures() > (6 - parseInt(getProperty("_lastDailyDungeonRoom"))) + Constants.ReservedAdventures &&
                       haveDailyDungeonItems(),
      progress: () => runDailyDungeon(),
      completed: () => getProperty(DailyDungeonDoneProperty) === "true",
      mainstat: 40,
    }
  ]
}
