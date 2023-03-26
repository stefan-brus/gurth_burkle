import { attack, Monster, mpCost, myMp, throwItem, useSkill, willUsuallyMiss } from "kolmafia";
import { $item, $skill } from "libram";
import { combatLoop, shouldThrowFlyers } from "./Utils";

export function consultTurtleTamer(initRound: number, foe: Monster, page: string) {
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
  else if (willUsuallyMiss() && myMp() > mpCost($skill`Cannelloni Cannon`)) {
    resultPage = useSkill($skill`Cannelloni Cannon`);
  }
  else if (willUsuallyMiss()) {
    resultPage = useSkill($skill`Toss`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
