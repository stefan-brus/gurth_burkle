import { council, getProperty, itemAmount, setProperty, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const L10Task: Task = {
  name: "L10: Giant Trash",
  subtasks: [
    {
      name: "Acquire enchanted bean",
      available: () => getProperty(L10QuestProperty) === "started",
      progress: () => { return { location: $location`The Beanbat Chamber`, modifiers: [] }; },
      completed: () => itemAmount($item`enchanted bean`) > 0,
    },
    {
      name: "Grow beanstalk",
      available: () => getProperty(L10QuestProperty) === "started" && itemAmount($item`enchanted bean`) > 0,
      progress: () => { use(1, $item`enchanted bean`); },
      completed: () => getProperty(L10QuestProperty) !== "started",
    },
    {
      name: "Complete airship",
      available: () => shouldCompleteAirship(),
      progress: () => completeAirship(),
      completed: () => !shouldCompleteAirship(),
      spikesTask: true,
    },
    {
      name: "Unlock castle ground floor",
      available: () => getProperty(L10QuestProperty) === "step7",
      progress: () => unlockGroundFloor(),
      completed: () => getProperty(L10QuestProperty) !== "step7",
      spikesTask: true,
    },
    {
      name: "Unlock castle top floor",
      available: () => getProperty(L10QuestProperty) === "step8",
      progress: () => unlockTopFloor(),
      completed: () => getProperty(L10QuestProperty) !== "step8",
      spikesTask: true,
    },
    {
      name: "Turn the wheel",
      available: () => getProperty(L10QuestProperty) === "step9",
      progress: () => turnWheel(),
      completed: () => getProperty(L10QuestProperty) !== "step9",
      spikesTask: true,
    },
    {
      name: "Return to council",
      available: () => getProperty(L10QuestProperty) === "step10",
      progress: () => { council(); },
      completed: () => getProperty(L10QuestProperty) !== "step10",
    },
  ],
};

const L10QuestProperty = "questL10Garbage";

export function shouldCompleteAirship(): boolean {
  // False until we have all immateria, S.O.C.K, and model airship
  return (itemAmount($item`model airship`) < 1 && getProperty(L10QuestProperty) !== "step10" && getProperty(L10QuestProperty) !== "finished") ||
         ["step1", "step2", "step3", "step4", "step5", "step6"].some(val => getProperty(L10QuestProperty) === val);
}

function completeAirship(): AdventureInfo {
  const AirshipChoice = "choiceAdventure182";

  if (itemAmount($item`model airship`) < 1) {
    setProperty(AirshipChoice, "4");
  }
  else {
    setProperty(AirshipChoice, "1");
  }

  return {
    location: $location`The Penultimate Fantasy Airship`,
    modifiers: [Modifier.NonCombat],
  };
}

function unlockGroundFloor(): AdventureInfo {
  const FastChoice = "choiceAdventure669";
  const GymChoice = "choiceAdventure670";
  const OpenChoice = "choiceAdventure671";

  setProperty(FastChoice, "1");

  if (itemAmount($item`amulet of extreme plot significance`) > 0) {
    setProperty(GymChoice, "4");
    setProperty(OpenChoice, "4");
  }
  else {
    setProperty(GymChoice, "1");
    setProperty(OpenChoice, "1");
  }

  return {
    location: $location`The Castle in the Clouds in the Sky (Basement)`,
    modifiers: [Modifier.NonCombat],
  };
}

function unlockTopFloor(): AdventureInfo {
  const PossibilityChoice = "choiceAdventure672";
  const PuttingChoice = "choiceAdventure673";
  const HuzzahChoice = "choiceAdventure674";
  const FreeRangeChoice = "choiceAdventure1026";

  setProperty(PossibilityChoice, "3");
  setProperty(PuttingChoice, "3");
  setProperty(HuzzahChoice, "3");
  setProperty(FreeRangeChoice, "2");

  return {
    location: $location`The Castle in the Clouds in the Sky (Ground Floor)`,
    modifiers: [Modifier.NonCombat],
    expectedNoncombat: "Top of the Castle, Ma",
  };
}

function turnWheel(): AdventureInfo {
  const MelonChoice = "choiceAdventure675";
  const RaverChoice = "choiceAdventure676";
  const CopperChoice = "choiceAdventure677";
  const PunkChoice = "choiceAdventure678";

  setProperty(MelonChoice, "4");
  setProperty(CopperChoice, "1");

  if (itemAmount($item`mohawk wig`) > 0) {
    setProperty(RaverChoice, "4");
    setProperty(PunkChoice, "1");
  }
  else {
    setProperty(RaverChoice, "2");
    setProperty(PunkChoice, "2");
  }

  return {
    location: $location`The Castle in the Clouds in the Sky (Top Floor)`,
    modifiers: [Modifier.NonCombat],
    expectedNoncombat: "Keep On Turnin' the Wheel in the Sky",
  };
}
