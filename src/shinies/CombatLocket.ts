import { availableAmount, equip, haveEffect, haveOutfit } from "kolmafia";
import { $effect, $item, $monster, $slot, CombatLoversLocket } from "libram";
import { Task } from "../tasks/Task";
import { adjustParka, ParkaMode } from "./Parka";

export const LocketFratGearTask: Task = {
  name: "Locket: Get Frat Warrior Fatigues",
  subtasks: [
    {
      name: "Locket + Yellow Ray Infantryman",
      available: () => CombatLoversLocket.reminiscesLeft() > 0 && haveEffect($effect`Everything Looks Yellow`) < 1 && availableAmount($item`Jurassic Parka`) > 0,
      progress: () => locketInfantryman(),
      completed: () => haveOutfit("Frat Warrior Fatigues"),
      mainstat: 100,
    },
  ],
};

function locketInfantryman() {
  equip($slot`shirt`, $item`Jurassic Parka`);
  adjustParka(ParkaMode.Dilophosaur);
  if (!CombatLoversLocket.reminisce($monster`War Frat 151st Infantryman`)) {
    throw new Error("Something went wrong reminiscing about Infantryman");
  }
}
