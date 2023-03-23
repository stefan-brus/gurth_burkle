import { getProperty, round, runChoice, visitUrl } from "kolmafia";
import { liverRemaining } from "../lib/Organs";
import { Task } from "../tasks/Task";

export const DistillSweatTask: Task = {
  name: "Drink familiar sweat",
  subtasks: [
    {
      name: "Distill sweat",
      available: () => stillsuitAdventures() > 6 && liverRemaining() > 0,
      progress: () => { distillSweat(); },
      completed: () => liverRemaining() < 1,
    },
  ],
};

export function stillsuitAdventures(): number {
  const familiarSweat = parseInt(getProperty(FamiliarSweatProperty));

  if (familiarSweat < 10) {
    return 0;
  }

  return round(Math.pow(familiarSweat, 0.4));
}

export function distillSweat() {
  visitUrl("inventory.php?action=distill&pwd");
  runChoice(1);
}

const FamiliarSweatProperty = "familiarSweat";
