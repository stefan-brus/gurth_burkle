import { attack, getProperty, haveSkill, Location, Monster, monsterHp, mpCost, myFury, myLocation, myMp, setProperty, throwItem, toString, useSkill, willUsuallyMiss } from "kolmafia";
import { $item, $location, $skill } from "libram";
import { Properties } from "../Properties";
import { combatLoop, ImportantFoes, shouldThrowFlyers } from "./Utils";

export function consultSealClubber(initRound: number, foe: Monster, page: string) {
  combatLoop(foe, page, doRound, InitState);
}

type CombatState = {
  flyered: boolean,
};

const InitState: CombatState = {
  flyered: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem($item`rock band flyers`);
  }
  else if (shouldBatterUp(foe)) {
    setProperty(Properties.Daily.LastBatterUpLocation, myLocation().toString());
    resultPage = useSkill($skill`Batter Up!`);
  }
  else if (willUsuallyMiss() && myMp() > mpCost($skill`Cannelloni Cannon`)) {
    resultPage = useSkill($skill`Cannelloni Cannon`);
  }
  else if (haveSkill($skill`Lunging Thrust-Smack`) && monsterHp() > 250 && myMp() > mpCost($skill`Lunging Thrust-Smack`)) {
    resultPage = useSkill($skill`Lunging Thrust-Smack`);
  }
  else if (haveSkill($skill`Thrust-Smack`) && monsterHp() > 100 && myMp() > mpCost($skill`Thrust-Smack`)) {
    resultPage = useSkill($skill`Thrust-Smack`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}

const BatterUpLocations: Location[] = [
  $location`The Haunted Library`,
  $location`The Haunted Bedroom`,
  $location`The Defiled Niche`,
  $location`The Defiled Nook`,
  $location`Twin Peak`,
  $location`The Hidden Temple`,
  $location`The Hidden Hospital`,
  $location`The Hidden Bowling Alley`,
  $location`The Haunted Wine Cellar`,
  $location`The Haunted Laundry Room`,
  $location`The Haunted Boiler Room`,
  $location`Inside the Palindome`,
  $location`A Mob of Zeppelin Protesters`,
  $location`The Red Zeppelin`,
  $location`The Middle Chamber`,
];

function shouldBatterUp(foe: Monster): boolean {
  if (!haveSkill($skill`Batter Up!`) || myFury() < 5) {
    return false;
  }

  if (foe.boss) {
    return false;
  }

  if (!BatterUpLocations.includes(myLocation())) {
    return false;
  }

  const lastBatterLocStr = getProperty(Properties.Daily.LastBatterUpLocation);
  if (lastBatterLocStr.length > 0) {
    const lastBatterLoc = $location`${lastBatterLocStr}`;

    if (lastBatterLoc === myLocation()) {
      return false;
    }
  }

  if (ImportantFoes.includes(foe)) {
    return false;
  }

  return true;
}
