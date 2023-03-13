import { getProperty, haveOutfit, itemAmount, setProperty, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const L08Task: Task = {
  name: "L08: Trapper",
  subtasks: [
    {
      name: "Talk to trapper",
      available: () => getProperty(L08QuestProperty) === "started",
      progress: () => { visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"); },
      completed: () => getProperty(L08QuestProperty) !== "started",
    },
    // Assume ore is collected by trainset
    {
      name: "Acquire goat cheese",
      available: () => getProperty(L08QuestProperty) === "step1" && itemAmount($item`goat cheese`) < 3,
      progress: () => { return { location: $location`The Goatlet`, modifiers: [Modifier.ItemDrop] }; },
      completed: () => getProperty(L08QuestProperty) !== "step1" || itemAmount($item`goat cheese`) >= 3,
    },
    {
      name: "Give items to trapper",
      available: () => getProperty(L08QuestProperty) === "step1" && itemAmount($item`goat cheese`) >= 3 && itemAmount($item`${getProperty(TrapperOreProperty)}`) >= 3,
      progress: () => { visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"); },
      completed: () => getProperty(L08QuestProperty) !== "step1",
    },
    {
      name: "Acquire eXtreme Cold-Weather Gear",
      available: () => getProperty(L08QuestProperty) === "step2",
      progress: () => acquireColdWeatherGear(),
      completed: () => haveOutfit("eXtreme Cold-Weather Gear"),
      spikesTask: true,
    },
    {
      name: "Unlock Mist-Shrouded Peak",
      available: () => getProperty(L08QuestProperty) === "step2" && haveOutfit("eXtreme Cold-Weather Gear"),
      progress: () => unlockPeak(),
      completed: () => getProperty(L08QuestProperty) !== "step2",
      spikesTask: true,
    },
    {
      name: "Kill Groar",
      available: () => getProperty(L08QuestProperty) === "step3" || getProperty(L08QuestProperty) === "step4",
      progress: () => { return { location: $location`Mist-Shrouded Peak`, modifiers: [] }; },
      completed: () => getProperty(L08QuestProperty) !== "step3" && getProperty(L08QuestProperty) !== "step4",
    },
    {
      name: "Return to trapper",
      available: () => getProperty(L08QuestProperty) === "step5",
      progress: () => { visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"); },
      completed: () => getProperty(L08QuestProperty) === "finished",
    },
  ],
};

const L08QuestProperty = "questL08Trapper";
const TrapperOreProperty = "trapperOre";

function acquireColdWeatherGear(): AdventureInfo {
  setExtremeSlopeNoncombats();

  return {
    location: $location`The eXtreme Slope`,
    modifiers: [Modifier.NonCombat],
  };
}

function setExtremeSlopeNoncombats() {
  const DuffelChoice = "choiceAdventure575";
  const TeenComedyChoice = "choiceAdventure17";
  const SaintBeernardChoice = "choiceAdventure16";
  const YetiHippyChoice = "choiceAdventure15";

  setProperty(DuffelChoice, "1");

  if (itemAmount($item`eXtreme mittens`) < 1)
    setProperty(TeenComedyChoice, "1");
  else if (itemAmount($item`snowboarder pants`) < 1)
    setProperty(TeenComedyChoice, "2");
  else
    setProperty(TeenComedyChoice, "3");

  if (itemAmount($item`snowboarder pants`) < 1)
    setProperty(SaintBeernardChoice, "1");
  else if (itemAmount($item`eXtreme scarf`) < 1)
    setProperty(SaintBeernardChoice, "2");
  else
    setProperty(SaintBeernardChoice, "3");

  if (itemAmount($item`eXtreme mittens`) < 1)
    setProperty(YetiHippyChoice, "1");
  else if (itemAmount($item`eXtreme scarf`) < 1)
    setProperty(YetiHippyChoice, "2");
  else
    setProperty(YetiHippyChoice, "3");
}

function unlockPeak(): AdventureInfo | void {
  if (getProperty("lastEncounter") === "3 eXXXtreme 4ever 6pack") {
    visitUrl("place.php?whichplace=mclargehuge&action=cloudypeak");
    return;
  }

  return {
    location: $location`The eXtreme Slope`,
    modifiers: [Modifier.NonCombat],
    expectedNoncombat: "3 eXXXtreme 4ever 6pack",
  };
}
