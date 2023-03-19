import { getProperty, round, runChoice, visitUrl } from "kolmafia";

export function stillsuitAdventures(): number {
  const familiarSweat = parseInt(getProperty(FamiliarSweatProperty));

  if (familiarSweat < 10) {
    return 0;
  }

  return round(Math.pow(familiarSweat, 0.4));
}

export function distillSweat() {
  visitUrl("inventory.php?action=distill&pwd");
  runChoice(1);
}

const FamiliarSweatProperty = "familiarSweat";
