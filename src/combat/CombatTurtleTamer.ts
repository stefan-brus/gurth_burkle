import { attack, Monster, throwItem } from "kolmafia";
import { $item } from "libram";
import { combatOver, shouldThrowFlyers } from "./Utils";

export function consultTurtleTamer(initRound: number, foe: Monster, page: string) {
  let lastResult = page;
  let state = InitState;

  while (!combatOver(lastResult)) {
    [lastResult, state] = doRound(foe, state);
  }
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
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}