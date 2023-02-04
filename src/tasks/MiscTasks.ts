import { buy, changeMcd, itemAmount, knollAvailable, myMeat } from "kolmafia";
import { $item } from "libram";
import { Task } from "./Task";

// TODO: Adjust for non-gnoll moonsigns
export const AcquireMcdTask: Task = {
  name: "Acquire Mind Control Device",
  subtasks: [
    {
      name: "Acquire Mind Control Device",
      available: () => knollAvailable() && itemAmount($item`detuned radio`) < 1 && myMeat() > 1000,
      progress: () => { buy(1, $item`detuned radio`); changeMcd(10); },
      completed: () => itemAmount($item`detuned radio`) > 0,
      mainstat: 50,
    },
  ],
};
