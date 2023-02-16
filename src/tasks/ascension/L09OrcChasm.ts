import { getProperty, itemAmount, setProperty, use, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export function buildOrcChasmBridge(): number {
  use(itemAmount($item`smut orc keepsake box`), $item`smut orc keepsake box`);

  const curProgress = parseInt(getProperty(BridgeProgressProperty));
  visitUrl("place.php?whichplace=orc_chasm&action=bridge" + curProgress);
  return parseInt(getProperty(BridgeProgressProperty));
}

export const L09Task: Task = {
  name: "L09: Orc Chasm",
  subtasks: [
    {
      name: "Build the bridge",
      available: () => getProperty(L09QuestProperty) === "started" && parseInt(getProperty(BridgeProgressProperty)) < 30 &&
                       parseInt(getProperty(BridgeProgressProperty)) >= 28, // Try not to do this manually, let trainset and fallbot gather most materials
      progress: () => buildTheBridge(),
      completed: () => getProperty(L09QuestProperty) !== "started",
    },
    {
      name: "Talk to Highland Lord",
      available: () => getProperty(L09QuestProperty) === "step1",
      progress: () => { visitUrl("place.php?whichplace=highlands&action=highlands_dude"); },
      completed: () => getProperty(L09QuestProperty) !== "step1",
    },
    {
      name: "De-pressurize Oil Peak",
      available: () => getProperty(L09QuestProperty) === "step2" && (getProperty(OilPeakProperty) === "false" || itemAmount($item`bubblin' crude`) < 12),
      progress: () => doOilPeak(),
      completed: () => getProperty(OilPeakProperty) === "true" && itemAmount($item`bubblin' crude`) >= 12,
    },
    {
      name: "De-haunt A-Boo Peak",
      available: () => getProperty(L09QuestProperty) === "step2" && getProperty(BooPeakProperty) === "false",
      progress: () => doBooPeak(),
      completed: () => getProperty(BooPeakProperty) === "true",
    },
    {
      name: "Solve Twin Peak",
      available: () => getProperty(L09QuestProperty) === "step2" && parseInt(getProperty(TwinPeakProperty)) < 15,
      progress: () => doTwinPeak(),
      completed: () => parseInt(getProperty(TwinPeakProperty)) === 15,
    },
    {
      name: "Return to Highland Lord",
      available: () => getProperty(L09QuestProperty) === "step3" || // Seems like this gets stuck on step2 sometimes?
                       (getProperty(OilPeakProperty) === "true" && getProperty(BooPeakProperty) === "true" && parseInt(getProperty(TwinPeakProperty)) === 15),
      progress: () => { visitUrl("place.php?whichplace=highlands&action=highlands_dude"); },
      completed: () => getProperty(L09QuestProperty) === "finished",
    },
  ],
};

const BridgeProgressProperty = "chasmBridgeProgress";
const L09QuestProperty = "questL09Topping";
const OilPeakProperty = "oilPeakLit";
const BooPeakProperty = "booPeakLit";
const BooProgressProperty = "booPeakProgress";
const TwinPeakProperty = "twinPeakProgress";

function buildTheBridge(): AdventureInfo | void {
  buildOrcChasmBridge();

  if (parseInt(getProperty(BridgeProgressProperty)) < 30) {
    return {
      location: $location`The Smut Orc Logging Camp`,
      modifiers: [],
    };
  }
}

function doOilPeak(): AdventureInfo {
  return {
    location: $location`Oil Peak`,
    modifiers: [Modifier.MonsterLevel],
    expectedNoncombat: "Unimpressed with Pressure",
  };
}

const BooChoice = "choiceAdventure611";

function doBooPeak(): AdventureInfo {
  setProperty(BooChoice, "1");

  if (parseInt(getProperty(BooProgressProperty)) > 0 && itemAmount($item`A-Boo clue`) > 0) {
    use(1, $item`A-Boo clue`);
    return {
      location: $location`A-Boo Peak`,
      modifiers: [Modifier.ColdRes, Modifier.SpookyRes],
      expectedNoncombat: "Come On Ghosty, Light My Pyre",
    };
  } 
  else {
    return {
      location: $location`A-Boo Peak`,
      modifiers: [],
      expectedNoncombat: "Come On Ghosty, Light My Pyre",
    };
  }
}

const OverlookChoice = "choiceAdventure606";
const Room237Choice = "choiceAdventure607";
const PantryChoice = "choiceAdventure608";
const PaintingChoice = "choiceAdventure609";
const DoubleChoice = "choiceAdventure610";

function doTwinPeak(): AdventureInfo {
  const Room237Required = (parseInt(getProperty(TwinPeakProperty)) & 1) === 0;
  const PantryRequired = (parseInt(getProperty(TwinPeakProperty)) & 2) === 0;
  const PaintingRequired = (parseInt(getProperty(TwinPeakProperty)) & 4) === 0;
  const DoubleRequired = (parseInt(getProperty(TwinPeakProperty)) & 8) === 0;

  let result: AdventureInfo = { location: $location`Twin Peak`, modifiers: [] };

  if (Room237Required) {
    setProperty(OverlookChoice, "1");
    setProperty(Room237Choice, "1");

    result = {
      location: $location`Twin Peak`,
      modifiers: [Modifier.NonCombat, Modifier.StenchRes],
      minModifier: [Modifier.StenchRes, 4],
    };
  }
  else if (PantryRequired) {
    setProperty(OverlookChoice, "2");
    setProperty(PantryChoice, "1");

    result = {
      location: $location`Twin Peak`,
      modifiers: [Modifier.NonCombat, Modifier.FoodDrop],
      minModifier: [Modifier.FoodDrop, 50],
    };
  }
  else if (PaintingRequired) {
    if (itemAmount($item`jar of oil`) < 1) {
      if (itemAmount($item`bubblin' crude`) < 12) {
        throw new Error("Need 12 bubblin' crude to create jar of oil");
      }

      use(12, $item`bubblin' crude`);
    }

    setProperty(OverlookChoice, "3");
    setProperty(PaintingChoice, "1");

    result = {
      location: $location`Twin Peak`,
      modifiers: [Modifier.NonCombat],
    };
  }
  else if (DoubleRequired) {
    setProperty(OverlookChoice, "4");
    setProperty(DoubleChoice, "1");

    result = {
      location: $location`Twin Peak`,
      modifiers: [Modifier.NonCombat, Modifier.Initiative],
      minModifier: [Modifier.Initiative, 40],
    };
  }

  if (itemAmount($item`rusty hedge trimmers`) > 0) {
    use(1, $item`rusty hedge trimmers`);
  }

  return result;
}
