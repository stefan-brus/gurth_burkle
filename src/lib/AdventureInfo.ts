import { Location } from "kolmafia";
import { Modifier } from "./Modifier";

export type AdventureInfo = {
  location: Location,
  modifiers: Modifier[],
};
