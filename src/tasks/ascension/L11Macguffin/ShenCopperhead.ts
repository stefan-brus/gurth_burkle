import { getProperty, Item, itemAmount, Location, setProperty, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { Task } from "../../Task";

export const L11ShenCopperheadTask: Task = {
  name: "L11: Shen Copperhead",
  subtasks: [
    {
      name: "Meet Shen Copperhead",
      available: () => getProperty(L11ShenProperty) === "started",
      progress: () => visitCopperheadClub(),
      completed: () => getProperty(L11ShenProperty) !== "started",
    },
    {
      name: "Get Shen's Item",
      available: () => ["step1", "step3", "step5"].includes(getProperty(L11ShenProperty)),
      progress: () => getShenItem(),
      completed: () => getProperty(L11ShenProperty) === "finished",
    },
    {
      name: "Return to Shen",
      available: () => ["step2", "step4", "step6"].includes(getProperty(L11ShenProperty)),
      progress: () => visitCopperheadClub(),
      completed: () => getProperty(L11ShenProperty) === "finished",
    },
  ],
};

const L11ShenProperty = "questL11Shen";
const ShenItemProperty = "shenQuestItem";
const CopperheadHazardProperty = "copperheadClubHazard";

const ShenLocations = new Map<Item, Location>([
  [$item`The Stankara Stone`, $location`The Batrat and Ratbat Burrow`],
  [$item`The First Pizza`, $location`Lair of the Ninja Snowmen`],
  [$item`Murphy's Rancid Black Flag`, $location`The Castle in the Clouds in the Sky (Top Floor)`],
  [$item`The Eye of the Stars`, $location`The Hole in the Sky`],
  [$item`The Lacrosse Stick of Lacoronado`, $location`The Smut Orc Logging Camp`],
  [$item`The Shield of Brook`, $location`The VERY Unquiet Garves`],
]);

function visitCopperheadClub(): AdventureInfo {
  const CopperheadChoice = "choiceAdventure1074";
  const CopperheadHazardChoice = "choiceAdventure855";
  setProperty(CopperheadChoice, "1");

  if (getProperty(CopperheadHazardProperty) !== "gong") {
    setProperty(CopperheadHazardChoice, "1");

    if (itemAmount($item`crappy waiter disguise`) > 0) {
      use(1, $item`crappy waiter disguise`);
    }
  }

  return {
    location: $location`The Copperhead Club`,
    modifiers: getProperty(L11ShenProperty) !== "started" ? [Modifier.NonCombat] : [],
  };
}

function getShenItem(): AdventureInfo {
  const shenItem = $item`${getProperty(ShenItemProperty)}`;
  const shenLoc = ShenLocations.get(shenItem);

  if (shenLoc !== undefined) {
    return {
      location: shenLoc,
      modifiers: [],
    };
  }
  else {
    throw new Error("Unknow shen item: " + shenItem.name);
  }
}
