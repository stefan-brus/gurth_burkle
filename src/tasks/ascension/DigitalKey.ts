import { equip, equippedAmount, getProperty, itemAmount, runChoice, visitUrl } from "kolmafia";
import { $item, $location, $slot } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const DigitalKeyTask: Task = {
  name: "Acquire digital key",
  subtasks: [
    {
      name: "Get continuum transfunctioner",
      available: () => itemAmount($item`continuum transfunctioner`) < 1 && equippedAmount($item`continuum transfunctioner`) < 1,
      progress: () => getTransfunctioner(),
      completed: () => itemAmount($item`continuum transfunctioner`) > 0 || equippedAmount($item`continuum transfunctioner`) > 0,
    },
    {
      name: "Build score",
      available: () => (itemAmount($item`continuum transfunctioner`) > 0 || equippedAmount($item`continuum transfunctioner`) > 0) && parseInt(getProperty(RealmScoreProperty)) < 10000,
      progress: () => buildScore(),
      completed: () => parseInt(getProperty(RealmScoreProperty)) >= 10000,
    },
    {
      name: "Get digital key",
      available: () => parseInt(getProperty(RealmScoreProperty)) >= 10000,
      progress: () => getDigitalKey(),
      completed: () => itemAmount($item`digital key`) > 0 || getProperty("nsTowerDoorKeysUsed").includes("digital key"),
    },
  ],
};

const RealmColorProperty = "8BitColor";
const RealmScoreProperty = "8BitScore";

function getTransfunctioner() {
  visitUrl("place.php?whichplace=forestvillage&action=fv_mystic");
  runChoice(1);
  runChoice(1);
  runChoice(1);
}

function getDigitalKey() {
  if (equippedAmount($item`continuum transfunctioner`) < 1)
    equip($slot`acc3`, $item`continuum transfunctioner`);
    
  visitUrl("place.php?whichplace=8bit&action=8treasure");
  runChoice(1);
}

function buildScore(): AdventureInfo {
  return {
    location: $location`Megalo-City`,
    modifiers: [Modifier.DamageAbsorption],
  };
}
