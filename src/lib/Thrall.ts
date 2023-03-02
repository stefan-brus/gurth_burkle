import { haveSkill, myThrall, useSkill } from "kolmafia";
import { $location, $skill, $thrall } from "libram";
import { AdventureInfo } from "./AdventureInfo";

export function selectThrall(info: AdventureInfo) {
  if (info.location === $location`The Hidden Apartment Building`) {
    if (myThrall() === $thrall`Vampieroghi`) {
      useSkill($skill`Dismiss Pasta Thrall`);
    }
  }
  else {
    if (myThrall() === $thrall`none` && haveSkill($skill`Bind Vampieroghi`)) {
      useSkill($skill`Bind Vampieroghi`);
    }
  }
}
