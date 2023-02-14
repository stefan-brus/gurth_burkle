import { attack, Monster, steal, throwItem } from "kolmafia";
import { $item } from "libram";
import { combatOver, shouldThrowFlyers } from "./Utils";

export function consultDiscoBandit(initRound: number, foe: Monster, page: string) {
  let lastResult = page;
  let state = InitState;

  while (!combatOver(lastResult)) {
    [lastResult, state] = doRound(foe, state);
  }
}

type CombatState = {
  pickpocketed: boolean,
  flyered: boolean,
};

const InitState: CombatState = {
  pickpocketed: false,
  flyered: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (!state.pickpocketed) {
    newState.pickpocketed = true;
    resultPage = steal();
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem($item`rock band flyers`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
