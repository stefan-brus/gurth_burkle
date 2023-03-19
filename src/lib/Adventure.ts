import { adv1, getProperty, numericModifier } from "kolmafia";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier, myNumericModifier, toMafiaModifier } from "./Modifier";

export function mainAdventure(info: AdventureInfo) {
  if (info.minModifier !== undefined) {
    checkModifier(info.minModifier);
  }

  if (!adv1(info.location) && getProperty("lastEncounter") !== info.expectedNoncombat) {
    throw new Error("Error adventuring in " + info.location.toString());
  }
}

export function maxModifierReached(info: AdventureInfo, mod: Modifier): boolean {
  if (info.maxModifier === undefined) {
    return false;
  }

  const [maxMod, val] = info.maxModifier;

  if (maxMod !== mod) {
    return false;
  }

  const current = myNumericModifier(mod, true);

  return current >= val;
}

function checkModifier([mod, val]: [Modifier, number]) {
  const mafiaMod = toMafiaModifier(mod);
  let myVal = numericModifier(mafiaMod);

  if (mod === Modifier.FoodDrop || mod === Modifier.BoozeDrop) { // For adventuring requirements, these factor in item drop
    myVal += numericModifier(toMafiaModifier(Modifier.ItemDrop));
  } 

  if (myVal < val) {
    throw new Error(`Modifier ${mafiaMod} too low (${myVal}, expected: ${val})`);
  }
}
