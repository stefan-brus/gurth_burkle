import { canAdventure, equippedAmount, getProperty, itemAmount, Location, setProperty } from "kolmafia";
import { $item, $location } from "libram";
import { Properties } from "../Properties";
import { templeUnlocked } from "../tasks/ascension/HiddenTemple";
import { shouldCompleteAirship } from "../tasks/ascension/L10GiantTrash";
import { AdventureInfo } from "./AdventureInfo";
import { gnasirWants } from "./Gnasir";

export function resetDelayProperties() {
  const DelayInitVals: Map<string, number> = new Map([
    // Delayed adventures
    [Properties.Ascension.Delay.SpookyForest, 5],
    [Properties.Ascension.Delay.HauntedGallery, 5],
    [Properties.Ascension.Delay.HauntedBathroom, 5],
    [Properties.Ascension.Delay.HauntedBallroom, 5],
    [Properties.Ascension.Delay.HauntedBedroom, 6],
    [Properties.Ascension.Delay.Oasis, 6],
    [Properties.Ascension.Delay.Airship, 25],

    // Forced adventures
    [Properties.Ascension.Delay.HiddenOffice, 5],
    [Properties.Ascension.Delay.DarkNeck, 15],
    [Properties.Ascension.Delay.DarkHeart, 15],
    [Properties.Ascension.Delay.DarkElbow, 15],
    [Properties.Ascension.Delay.HiddenPark, 7],
    [Properties.Ascension.Delay.HiddenApartment, 9],
    [Properties.Ascension.Delay.CobbsKnob, 10],
    [Properties.Ascension.Delay.CastleGround, 10],
  ]);

  for (const [prop, val] of DelayInitVals) {
    setProperty(prop, val.toString());
  }
}

export function checkBurnDelay(info: AdventureInfo) {
  if (DelayLocationProps.has(info.location)) {
    const prop = DelayLocationProps.get(info.location)!;
    const current = parseInt(getProperty(prop));
    if (current > 0) {
      setProperty(prop, (current - 1).toString());
    }
  }
}

export function nextDelayLocation(): Location {
  const DelayPriority: Location[] = [
    $location`The Dark Neck of the Woods`,
    $location`The Dark Heart of the Woods`,
    $location`The Dark Elbow of the Woods`,
    $location`The Spooky Forest`,
    $location`The Outskirts of Cobb's Knob`,
    $location`The Haunted Gallery`,
    $location`The Haunted Bathroom`,
    $location`The Haunted Bedroom`,
    $location`The Haunted Ballroom`,
    $location`The Penultimate Fantasy Airship`,
    $location`The Castle in the Clouds in the Sky (Ground Floor)`,
    $location`The Hidden Park`,
    $location`The Hidden Apartment Building`,
    $location`The Hidden Office Building`,
    $location`The Oasis`,
  ];

  for (const loc of DelayPriority) {
    if (canAdventure(loc) && BurnAvailable.get(loc)!()) {
      const remaining = parseInt(getProperty(DelayLocationProps.get(loc)!));
      if (remaining > 0) {
        return loc;
      }
    }
  }

  return $location`none`;
}

const DelayLocationProps: Map<Location, string> = new Map([
  // Delayed adventures
  [$location`The Spooky Forest`, Properties.Ascension.Delay.SpookyForest],
  [$location`The Haunted Gallery`, Properties.Ascension.Delay.HauntedGallery],
  [$location`The Haunted Bathroom`, Properties.Ascension.Delay.HauntedBathroom],
  [$location`The Haunted Ballroom`, Properties.Ascension.Delay.HauntedBallroom],
  [$location`The Haunted Bedroom`, Properties.Ascension.Delay.HauntedBedroom],
  [$location`The Oasis`, Properties.Ascension.Delay.Oasis],
  [$location`The Penultimate Fantasy Airship`, Properties.Ascension.Delay.Airship],

  // Forced adventures
  [$location`The Hidden Office Building`, Properties.Ascension.Delay.HiddenOffice],
  [$location`The Dark Neck of the Woods`, Properties.Ascension.Delay.DarkNeck],
  [$location`The Dark Heart of the Woods`, Properties.Ascension.Delay.DarkHeart],
  [$location`The Dark Elbow of the Woods`, Properties.Ascension.Delay.DarkElbow],
  [$location`The Hidden Park`, Properties.Ascension.Delay.HiddenPark],
  [$location`The Hidden Apartment Building`, Properties.Ascension.Delay.HiddenApartment],
  [$location`The Outskirts of Cobb's Knob`, Properties.Ascension.Delay.CobbsKnob],
  [$location`The Castle in the Clouds in the Sky (Ground Floor)`, Properties.Ascension.Delay.CastleGround],
]);

type ShouldBurnDelay = () => boolean;

const BurnAvailable: Map<Location, ShouldBurnDelay> = new Map([
  [$location`The Spooky Forest`, () => {
    return !templeUnlocked() && getProperty("questL02Larva") !== "finished";
  }],
  [$location`The Haunted Gallery`, () => {
    return getProperty("questM20Necklace") !== "finished";
  }],
  [$location`The Haunted Bathroom`, () => {
    return getProperty("questM20Necklace") !== "finished";
  }],
  [$location`The Haunted Ballroom`, () => {
    return getProperty("questL11Manor") === "unstarted" || getProperty("questL11Manor") === "started";
  }],
  [$location`The Haunted Bedroom`, () => {
    return getProperty("questM20Necklace") !== "finished";
  }],
  [$location`The Oasis`, () => {
    return gnasirWants($item`stone rose`);
  }],
  [$location`The Penultimate Fantasy Airship`, () => {
    return shouldCompleteAirship();
  }],
  [$location`The Hidden Office Building`, () => {
    return getProperty("hiddenOfficeProgress") !== "8";
  }],
  [$location`The Dark Neck of the Woods`, () => {
    return getProperty("questL06Friar") === "started" || getProperty("questL06Friar") === "step1";
  }],
  [$location`The Dark Heart of the Woods`, () => {
    return getProperty("questL06Friar") === "started" || getProperty("questL06Friar") === "step1";
  }],
  [$location`The Dark Elbow of the Woods`, () => {
    return getProperty("questL06Friar") === "started" || getProperty("questL06Friar") === "step1";
  }],
  [$location`The Hidden Park`, () => {
    return itemAmount($item`antique machete`) < 1 && equippedAmount($item`antique machete`) < 1;
  }],
  [$location`The Hidden Apartment Building`, () => {
    return getProperty("hiddenApartmentProgress") !== "8";
  }],
  [$location`The Outskirts of Cobb's Knob`, () => {
    return getProperty("questL05Goblin") === "unstarted" || getProperty("questL05Goblin") === "started";
  }],
  [$location`The Castle in the Clouds in the Sky (Ground Floor)`, () => {
    return getProperty("questL10Garbage") === "step8";
  }],
]);
