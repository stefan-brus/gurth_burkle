import { buy, equippedAmount, getProperty, haveEffect, itemAmount, myAdventures, setProperty, use } from "kolmafia";
import { $coinmaster, $effect, $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { doGnasir, gnasirSatisfied, gnasirWants } from "../../../lib/Gnasir";
import { Modifier } from "../../../lib/Modifier";
import { shoreAdventure } from "../../../lib/ShoreInc";
import { Properties } from "../../../Properties";
import { Task } from "../../Task";

export const L11DesertTask: Task = {
  name: "L11: Desert",
  subtasks: [
    {
      name: "Get UV-resistant compass",
      available: () => getProperty(L11DesertProperty) === "started" && myAdventures() > (3 + Constants.ReservedAdventures),
      progress: () => getCompass(),
      completed: () => itemAmount($item`UV-resistant compass`) > 0 || equippedAmount($item`UV-resistant compass`) > 0,
    },
    {
      name: "Do initial 10 desert adventures",
      available: () => itemAmount($item`UV-resistant compass`) > 0 || equippedAmount($item`UV-resistant compass`) > 0,
      progress: () => exploreDesert(),
      completed: () => parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10,
    },
    {
      name: "Use milestone",
      available: () => parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10 && itemAmount($item`milestone`) > 0,
      progress: () => { use(1, $item`milestone`); },
      completed: () => itemAmount($item`milestone`) < 1 || getProperty(L11DesertProperty) === "finished",
    },
    {
      name: "Give item to Gnasir",
      available: () => parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10 &&
                       ((itemAmount($item`killing jar`) > 0 && gnasirWants($item`killing jar`)) ||
                       itemAmount($item`can of black paint`) > 0 ||
                       itemAmount($item`stone rose`) > 0 ||
                       itemAmount($item`worm-riding manual page`) >= 15),
      progress: () => doGnasir(),
      completed: () => gnasirSatisfied() || getProperty(L11DesertProperty) === "finished",
    },
    {
      name: "Get stone rose",
      available: () => parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10 && gnasirWants($item`stone rose`),
      progress: () => getStoneRose(),
      completed: () => itemAmount($item`stone rose`) > 0 || getProperty(L11DesertProperty) === "finished",
    },
    {
      name: "Explore desert",
      available: () => parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10,
      progress: () => exploreDesert(),
      completed: () => getProperty(L11DesertProperty) === "finished",
    },
  ],
};

const L11DesertProperty = "questL11Desert";

function getCompass() : AdventureInfo | void {
  if (itemAmount($item`Shore Inc. Ship Trip Scrip`) < 1) {
    return shoreAdventure();
  }
  else {
    buy($coinmaster`The Shore, Inc. Gift Shop`, 1, $item`UV-resistant compass`);
  }
}

function exploreDesert(): AdventureInfo {
  if (getProperty(Properties.Ascension.DesertAdventuresDone) === "") {
    setProperty(Properties.Ascension.DesertAdventuresDone, "1");
  }
  else {
    const numDone = parseInt(getProperty(Properties.Ascension.DesertAdventuresDone));
    setProperty(Properties.Ascension.DesertAdventuresDone, (numDone + 1).toString());
  }

  if (parseInt(getProperty(Properties.Ascension.DesertAdventuresDone)) >= 10 && haveEffect($effect`Ultrahydrated`) < 1) {
    return {
      location: $location`The Oasis`,
      modifiers: [],
    };
  }

  return {
    location: $location`The Arid, Extra-Dry Desert`,
    modifiers: [],
    expectedNoncombat: "A Sietch in Time",
  };
}

function getStoneRose(): AdventureInfo {
  return {
    location: $location`The Oasis`,
    modifiers: [Modifier.NonCombat],
  };
}
