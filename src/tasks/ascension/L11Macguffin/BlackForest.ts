import { buy, equippedAmount, getProperty, itemAmount, myAdventures, myMeat, setProperty, use } from "kolmafia";
import { $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { gnasirWants } from "../../../lib/Gnasir";
import { Modifier } from "../../../lib/Modifier";
import { shoreAdventure } from "../../../lib/ShoreInc";
import { Properties } from "../../../Properties";
import { Task } from "../../Task";

export const L11BlackForestTask: Task = {
  name: "L11: Black Forest",
  subtasks: [
    {
      name: "Unlock Black Market",
      available: () => !blackMarketFound(),
      progress: () => doBlackForest(),
      completed: () => blackMarketFound(),
      mainstat: $location`The Black Forest`.recommendedStat,
    },
    {
      name: "Get beehive",
      available: () => itemAmount($item`beehive`) < 1,
      progress: () => doBlackForest(),
      completed: () => itemAmount($item`beehive`) > 0 || getProperty(L11BlackForestProperty) === "finished",
    },
    {
      name: "Get forged identification documents",
      available: () => blackMarketFound() && myMeat() >= 1000,
      progress: () => { buy(1, $item`forged identification documents`); },
      completed: () => getProperty(L11BlackForestProperty) !== "step2" || itemAmount($item`forged identification documents`) > 0,
    },
    {
      name: "Get can of black paint",
      available: () => blackMarketFound() && myMeat() >= 1000,
      progress: () => { buy(1, $item`can of black paint`); },
      completed: () => itemAmount($item`can of black paint`) > 0 || !gnasirWants($item`can of black paint`) || getProperty("questL11Desert") === "finished",
    },
    {
      name: "Get MacGuffin diary",
      available: () => itemAmount($item`forged identification documents`) > 0  && itemAmount($item`your father's MacGuffin diary`) < 1 && myAdventures() > Constants.ReservedAdventures + 3,
      progress: () => shoreAdventure(),
      completed: () => itemAmount($item`your father's MacGuffin diary`) > 0,
    },
    {
      name: "Read MacGuffin diary",
      available: () => itemAmount($item`your father's MacGuffin diary`) > 0,
      progress: () => readDiary(),
      completed: () => getProperty(Properties.Ascension.MacGuffinDiaryRead) === "true",
    },
  ],
};

const L11BlackForestProperty = "questL11Black";
const BlackForestProgressProperty = "blackForestProgress";

function blackMarketFound() {
  return parseInt(getProperty(BlackForestProgressProperty)) === 5;
}

function doBlackForest(): AdventureInfo {
  const MapChoice = "choiceAdventure923";
  const ThrillChoice = "choiceAdventure924";
  const CobblerChoice = "choiceAdventure928";
  const CobblerChoiceAlt = "choiceAdventure177"; // Not sure why there are two of these
  const BeeChoice1 = "choiceAdventure1018";
  const BeeChoice2 = "choiceAdventure1019";

  if (itemAmount($item`beehive`) < 1) { // Get beehive
    setProperty(MapChoice, "1");
    setProperty(ThrillChoice, "3");
    setProperty(BeeChoice1, "1");
    setProperty(BeeChoice2, "1");
  }
  else if (itemAmount($item`blackberry galoshes`) < 1 && equippedAmount($item`blackberry galoshes`) < 1 && itemAmount($item`blackberry`) >= 3) { // Get galoshes
    setProperty(MapChoice, "1");
    setProperty(ThrillChoice, "2");
    setProperty(CobblerChoice, "4");
    setProperty(CobblerChoiceAlt, "4");
  }
  else if (getProperty("lastEncounter") === "The Blackberry Cobbler") { // Escape from cobbler choice
    setProperty(MapChoice, "1");
    setProperty(ThrillChoice, "2");
    setProperty(CobblerChoice, "6");
    setProperty(CobblerChoiceAlt, "6");
  }
  else { // Get blackberries
    setProperty(MapChoice, "1");
    setProperty(ThrillChoice, "1");
  }

  return {
    location: $location`The Black Forest`,
    modifiers: [Modifier.NonCombat, Modifier.ItemDrop],
  };
}

function readDiary() {
  use(1, $item`your father's MacGuffin diary`);
  setProperty(Properties.Ascension.MacGuffinDiaryRead, "true");
}
