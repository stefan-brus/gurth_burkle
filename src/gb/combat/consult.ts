import { Monster, getProperty, myLocation, setProperty } from "kolmafia";
import { genCcsMacro } from "./Macro";
import { CMGMonsters } from "../../shinies/CMG";
import { Properties } from "../../Properties";

function updateCMGState(foe: Monster) {
  if (CMGMonsters.includes(foe)) {
    const fightsDoneStr = getProperty(Properties.Daily.CMGFightsDone);
    if (fightsDoneStr === "") {
      setProperty(Properties.Daily.CMGFightsDone, "1");
    }
    else {
      setProperty(Properties.Daily.CMGFightsDone, (parseInt(fightsDoneStr) + 1).toString());
    }
  }
}

export function main(_initRound: number, foe: Monster, _page: string) {
  updateCMGState(foe);
  
  const macro = genCcsMacro(foe, myLocation());
  macro.submit();
}
