import { equippedAmount, Familiar, fullnessLimit, haveFamiliar, itemAmount, myFamiliar, myFullness, print, useFamiliar, userConfirm } from "kolmafia";
import { $familiar, $item, $location, GreyGoose } from "libram";
import { Constants } from "../Constants";
import { availableCbbFoods } from "../shinies/Cookbookbat";
import { gooseWeight, GreyGooseLocations } from "../shinies/GreyGoose";
import { AdventureInfo } from "./AdventureInfo";
import { stomachRemaining } from "./Organs";
import { ascensionDaysLeft } from "./Utils";
import { Modifier } from "./Modifier";
import { haveWantedGrubbyItems } from "../shinies/HoboSheep";

export function selectFamiliar(info: AdventureInfo) {
  const chosenFamiliar = chooseFamiliar(info);

  if (chosenFamiliar !== myFamiliar()) {
    if (!userConfirm(`Switch to familiar: ${chosenFamiliar.name}?`)) {
      throw new Error("User aborted on familiar " + chosenFamiliar.name);
    }

    if (!useFamiliar(chosenFamiliar)) {
      throw new Error("Unable to use familiar: " + chooseFamiliar.name);
    }
  }
}

function chooseFamiliar(info: AdventureInfo): Familiar {
  for (const priorityInfo of FamiliarPriority) {
    if (priorityInfo.shouldUse(info) && haveFamiliar(priorityInfo.familiar)) {
      return priorityInfo.familiar;
    }
  }

  throw new Error("No viable familiar found");
}

type PriorityInfo = {
  familiar: Familiar,
  shouldUse: (info: AdventureInfo) => boolean,
};

const FamiliarPriority: PriorityInfo[] = [
  // Zone-specific
  {
    familiar: $familiar`Reassembled Blackbird`,
    shouldUse: (info: AdventureInfo) => info.location === $location`The Black Forest` && itemAmount($item`reassembled blackbird`) < 1,
  },

  // Modifier
  {
    familiar: $familiar`Leprechaun`,
    shouldUse: (info: AdventureInfo) => info.modifiers.includes(Modifier.MeatDrop),
  },

  // Drop necessary items
  {
    familiar: $familiar`Gelatinous Cubeling`,
    shouldUse: (_: AdventureInfo) => itemAmount($item`eleven-foot pole`) < 1 ||
             (itemAmount($item`ring of Detect Boring Doors`) < 1 && equippedAmount($item`ring of Detect Boring Doors`) < 1) ||
             itemAmount($item`Pick-O-Matic lockpicks`) < 1,
  },
  {
    familiar: $familiar`Cookbookbat`,
    shouldUse: (_: AdventureInfo) => availableCbbFoods() < stomachRemaining(),
  },

  // Duplicate necessary items
  {
    familiar: $familiar`Grey Goose`,
    shouldUse: (info: AdventureInfo) => GreyGooseLocations.includes(info.location),
  },

  // Default familiars
  // Make sure goose can emit at least a few drones
  {
    familiar: $familiar`Grey Goose`,
    shouldUse: (_: AdventureInfo) => gooseWeight() < 5 + Constants.MinGooseDrones,
  },
  // Use hobo sheep until all grubby stuff has been crafted
  {
    familiar: $familiar`Hobo in Sheep's Clothing`,
    shouldUse: (_: AdventureInfo) => haveWantedGrubbyItems(),
  },
  // Level up goose
  {
    familiar: $familiar`Grey Goose`,
    shouldUse: (_: AdventureInfo) => true,
  },
];
