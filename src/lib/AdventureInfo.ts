import { Location } from "kolmafia";
import { $location } from "libram";
import { Modifier } from "./Modifier";

export type AdventureInfo = {
  location: Location,
  modifiers: Modifier[],
  expectedNoncombat?: string, // Sometimes adv1 will return false even if it is successful, check if this adventure was encountered in that case
  minModifier?: [Modifier, number],
  maxModifier?: [Modifier, number],
  getSpecialEffects?: boolean,
};

export const NoAdventure: AdventureInfo = {
  location: $location`none`,
  modifiers: [],
};
