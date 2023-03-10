import { buy, Effect, haveEffect, haveSkill, itemAmount, myMaxhp, myMaxmp, restoreHp, restoreMp, use, useSkill } from "kolmafia";
import { $effect, $item, $skill } from "libram";

export function main() {
  if (haveEffect($effect`Beaten Up`) > 0 && haveSkill($skill`Tongue of the Walrus`)) {
    useSkill(1, $skill`Tongue of the Walrus`);
  }

  if (poisoned()) {
    if (itemAmount($item`anti-anti-antidote`) < 1) {
      buy(1, $item`anti-anti-antidote`);
    }

    use(1, $item`anti-anti-antidote`);
  }

  const HpRestoreTarget = 0.9;
  const MpRestoreTarget = 0.6;

  restoreHp(myMaxhp() * HpRestoreTarget);
  restoreMp(myMaxmp() * MpRestoreTarget);
}

function poisoned(): boolean {
  const PoisonEffects: Effect[] = [
    $effect`Hardly Poisoned at All`,
    $effect`Somewhat Poisoned`,
    $effect`Really Quite Poisoned`,
    $effect`Majorly Poisoned`,
    $effect`Toad In The Hole`,
  ];

  return PoisonEffects.some(effect => haveEffect(effect) > 0);
}
