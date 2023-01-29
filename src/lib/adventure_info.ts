import { Location } from "kolmafia";
import { Modifier } from "./modifiers";

export type AdventureInfo = {
  location: Location,
  modifiers: Modifier[],
};
