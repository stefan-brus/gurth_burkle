import { equippedAmount, Familiar, fullnessLimit, haveFamiliar, itemAmount, myFamiliar, myFullness, print, useFamiliar, userConfirm } from "kolmafia";
import { $familiar, $item, $location, GreyGoose } from "libram";
import { Constants } from "../Constants";
import { availableCbbFoods } from "../shinies/Cookbookbat";
import { GreyGooseLocations } from "../shinies/GreyGoose";
import { AdventureInfo } from "./AdventureInfo";
import { stomachRemaining } from "./Organs";
import { ascensionDaysLeft } from "./Utils";

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
    shouldUse: (info: AdventureInfo) => {
      return info.location === $location`The Black Forest` && itemAmount($item`reassembled blackbird`) < 1;
    }
  },

  // Drop necessary items
  {
    familiar: $familiar`Gelatinous Cubeling`,
    shouldUse: (_: AdventureInfo) => {
      return itemAmount($item`eleven-foot pole`) < 1 ||
             (itemAmount($item`ring of Detect Boring Doors`) < 1 && equippedAmount($item`ring of Detect Boring Doors`) < 1) ||
             itemAmount($item`Pick-O-Matic lockpicks`) < 1;
    },
  },
  {
    familiar: $familiar`Cookbookbat`,
    shouldUse: (_: AdventureInfo) => {
      return availableCbbFoods() < stomachRemaining();
    },
  },

  // Duplicate necessary items
  {
    familiar: $familiar`Grey Goose`,
    shouldUse: (info: AdventureInfo) => GreyGooseLocations.includes(info.location),
  },

  // Default familiars
  // Make sure goose can emit at least one drone
  {
    familiar: $familiar`Grey Goose`,
    shouldUse: (_: AdventureInfo) => GreyGoose.currentWeight() < 5 + Constants.MinGooseDrones,
  },
  {
    familiar: $familiar`Hobo in Sheep's Clothing`,
    shouldUse: (_: AdventureInfo) => true,
  },
];
