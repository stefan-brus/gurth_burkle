import { cliExecute, getProperty, itemAmount, myAdventures, myHash, setProperty, use, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { Task } from "../../Task";

export const L11HiddenTempleTask: Task = {
  name: "L11: Hidden Temple",
  subtasks: [
    {
      name: "Get the Nostril of the Serpent",
      available: () => (getProperty(L11HiddenCityProperty) === "step1" || getProperty(L11HiddenCityProperty) === "step2") && 
                       itemAmount($item`stone wool`) > 0 &&
                       itemAmount($item`the Nostril of the Serpent`) < 1,
      progress: () => getNostril(),
      completed: () => (getProperty(L11HiddenCityProperty) !== "step1" && getProperty(L11HiddenCityProperty) !== "step2") || itemAmount($item`the Nostril of the Serpent`) > 0,
    },
    {
      name: "Unlock The Hidden City",
      available: () => (getProperty(L11HiddenCityProperty) === "step1" || getProperty(L11HiddenCityProperty) === "step2") && 
                       itemAmount($item`stone wool`) > 0 &&
                       itemAmount($item`the Nostril of the Serpent`) > 0 &&
                       myAdventures() >= 4 + Constants.ReservedAdventures,
      progress: () => unlockHiddenCity(),
      completed: () => getProperty(L11HiddenCityProperty) !== "step1" && getProperty(L11HiddenCityProperty) !== "step2",
    },
  ],
};

export const L11HiddenCityTask: Task = {
  name: "L11: Hidden City",
  subtasks: [

  ],
};

const L11HiddenCityProperty = "questL11Worship";

function getNostril(): AdventureInfo {
  const StoneWoolChoice = "choiceAdventure582";
  const HeightsChoice = "choiceAdventure579";
  
  setProperty(StoneWoolChoice, "1");
  setProperty(HeightsChoice, "2");

  if (itemAmount($item`stone wool`) > 0) {
    use(1, $item`stone wool`);
  }

  return {
    location: $location`The Hidden Temple`,
    modifiers: [Modifier.NonCombat],
  };
}

function unlockHiddenCity() {
  // Mafia has some trouble with the choice adventures here, so we do the whole sequence manually
  // 1 stone wool is assumed
  /**
   *       visitUrl("adventure.php?snarfblat=280");
      manualChoice(582, 2);
      manualChoice(580, 2);
      manualChoice(584, 4);
      manualChoice(580, 1);
      manualChoice(123, 2);
      visitUrl("choice.php");
      cliExecute("dvorak");
      manualChoice(125, 3);
   */

  if (itemAmount($item`stone wool`) < 1 || !use(1, $item`stone wool`)) {
    throw new Error("Unable to use stone wool for hidden city unlock");
  }

  visitUrl("adventure.php?snarfblat=280");
  visitUrl("choice.php?whichchoice=582&option=2&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=580&option=2&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=584&option=4&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=580&option=1&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=123&option=2&pwd=" + myHash());
  visitUrl("choice.php?");
  cliExecute("dvorak");
  visitUrl("choice.php?whichchoice=125&option=3&pwd=" + myHash());
}
