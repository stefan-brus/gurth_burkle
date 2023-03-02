import { attack, haveSkill, Monster, monsterHp, throwItem, useSkill } from "kolmafia";
import { $item, $skill } from "libram";
import { combatLoop, shouldThrowFlyers } from "./Utils";

export function consultPastamancer(initRound: number, foe: Monster, page: string) {
  combatLoop(foe, page, doRound, InitState);
}

type CombatState = {
  entangled: boolean,
  flyered: boolean,
};

const InitState: CombatState = {
  entangled: false,
  flyered: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (haveSkill($skill`Entangling Noodles`) && !state.entangled) {
    newState.entangled = true;
    resultPage = useSkill($skill`Entangling Noodles`);
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem($item`rock band flyers`);
  }
  else if (haveSkill($skill`Weapon of the Pastalord`) && monsterHp() > 150) {
    resultPage = useSkill($skill`Weapon of the Pastalord`);
  }
  else if (haveSkill($skill`Cannelloni Cannon`)) {
    resultPage = useSkill($skill`Cannelloni Cannon`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
