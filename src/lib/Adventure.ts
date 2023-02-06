import { adv1, getProperty, numericModifier } from "kolmafia";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier, toMafiaModifier } from "./Modifier";

export function mainAdventure(info: AdventureInfo) {
  if (info.minModifier !== undefined) {
    checkModifier(info.minModifier);
  }

  if (!adv1(info.location) && getProperty("lastEncounter") != info.expectedNoncombat) {
    throw new Error("Error adventuring in " + info.location.toString());
  }
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
