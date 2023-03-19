import { getProperty, haveSkill, myInebriety, useSkill } from "kolmafia";
import { $skill } from "libram";
import { Task } from "../tasks/Task";

export const SweatBoozeTask: Task = {
  name: "Designer Sweatpants (sweat out booze)",
  subtasks: [
    {
      name: "Sweat out some booze",
      available: () => sweatBoozeAvailable(),
      progress: () => { useSkill(1, $skill`Sweat Out Some Booze`) },
      completed: () => parseInt(getProperty(SweatBoozeUsedProperty)) === 3,
    },
  ],
};

const SweatProperty = "sweat";
const SweatBoozeUsedProperty = "_sweatOutSomeBoozeUsed";

function sweatBoozeAvailable(): boolean {
  const sweat = parseInt(getProperty(SweatProperty));
  const sweatBoozeUsed = parseInt(getProperty(SweatBoozeUsedProperty));

  return haveSkill($skill`Sweat Out Some Booze`) && sweat >= 25 && sweatBoozeUsed < 3 && myInebriety() > 0;
}
