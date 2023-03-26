import { availableAmount, create, itemAmount, setProperty, use } from "kolmafia";
import { $item } from "libram";
import { Task } from "../tasks/Task";

export const CraftGrubbyWoolTask: Task = {
  name: "Craft grubby wool stuff",
  subtasks: [
    {
      name: "Create grubby wool hat",
      available: () => itemAmount($item`grubby wool`) > 0 && availableAmount($item`grubby wool hat`) < 1,
      progress: () => craftGrubbyItem(1),
      completed: () => availableAmount($item`grubby wool hat`) > 0,
    },
    {
      name: "Create grubby wool scarf",
      available: () => itemAmount($item`grubby wool`) > 0 && availableAmount($item`grubby wool scarf`) < 1,
      progress: () => craftGrubbyItem(2),
      completed: () => availableAmount($item`grubby wool scarf`) > 0,
    },
    {
      name: "Create grubby wool trousers",
      available: () => itemAmount($item`grubby wool`) > 0 && availableAmount($item`grubby wool trousers`) < 1,
      progress: () => craftGrubbyItem(3),
      completed: () => availableAmount($item`grubby wool trousers`) > 0,
    },
    {
      name: "Create nice warm beer",
      available: () => itemAmount($item`grubby wool`) > 0 && itemAmount($item`ice-cold Sir Schlitz`) > 0,
      progress: () => craftGrubbyBeer(),
      completed: () => false,
    }
  ],
};

const WoolinChoice = "choiceAdventure1490";

function craftGrubbyItem(choice: number) {
  setProperty(WoolinChoice, choice.toString());
  use(1, $item`grubby wool`);
}

function craftGrubbyBeer() {
  setProperty(WoolinChoice, "5");
  use(1, $item`grubby wool`);
  create(1, $item`nice warm beer`);
}
