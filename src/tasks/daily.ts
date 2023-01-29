import { cliExecute, getProperty, haveSkill, hippyStoneBroken, pvpAttacksLeft, Skill } from "kolmafia";
import { buyClovers, cloversLeft } from "../lib/hermit";
import { myUseSkill } from "../lib/skills";
import { Task } from "./task";

export const CloversTask: Task = {
  name: "Buy clovers from hermit",
  subtasks: [
    {
      name: "Buy clovers from hermit",
      available: () => true,
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
      available: () => haveSkill(Skill.get("Advanced Cocktailcrafting")),
      progress: () => myUseSkill(1, Skill.get("Advanced Cocktailcrafting")),
      completed: () => parseInt(getProperty("cocktailSummons")) == 1,
    },
    {
      name: "Summon noodles",
      available: () => haveSkill(Skill.get("Pastamastery")),
      progress: () => myUseSkill(1, Skill.get("Pastamastery")),
      completed: () => parseInt(getProperty("noodleSummons")) == 1,
    },
    {
      name: "Summon reagents",
      available: () => haveSkill(Skill.get("Advanced Saucecrafting")),
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
}
