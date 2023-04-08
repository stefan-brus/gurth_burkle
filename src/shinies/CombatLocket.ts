import { Monster, availableAmount, equip, getProperty, haveEffect, haveOutfit, itemAmount } from "kolmafia";
import { $effect, $item, $monster, $slot, CombatLoversLocket } from "libram";
import { Task } from "../tasks/Task";
import { adjustParka, ParkaMode } from "./Parka";

export const LocketTasks: Task = {
  name: "Locket Tasks",
  subtasks: [
    {
      name: "Locket + Yellow Ray Infantryman",
      available: () => CombatLoversLocket.reminiscesLeft() > 0 && haveEffect($effect`Everything Looks Yellow`) < 1 && availableAmount($item`Jurassic Parka`) > 0,
      progress: () => locketRay($monster`War Frat 151st Infantryman`),
      completed: () => haveOutfit("Frat Warrior Fatigues"),
      mainstat: 100,
    },
    {
      name: "Locket + Yellow Ray Baa'baa'bu'ran",
      available: () => CombatLoversLocket.reminiscesLeft() > 0 && 
                       haveEffect($effect`Everything Looks Yellow`) < 1 && 
                       availableAmount($item`Jurassic Parka`) > 0 &&
                       (
                        getProperty("questL11Worship") === "unstarted" ||
                        getProperty("questL11Worship") === "started" ||
                        getProperty("questL11Worship") === "step1"
                      ) &&
                      itemAmount($item`stone wool`) < 1,
      progress: () => locketRay($monster`Baa'baa'bu'ran`),
      completed: () => itemAmount($item`stone wool`) > 0,
      mainstat: 50,
    },
  ],
};

function locketRay(foe: Monster) {
  equip($slot`shirt`, $item`Jurassic Parka`);
  adjustParka(ParkaMode.Dilophosaur);
  if (!CombatLoversLocket.reminisce(foe)) {
    throw new Error("Something went wrong reminiscing about " + foe.name);
  }
}
