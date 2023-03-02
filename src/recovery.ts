import { buy, dispensaryAvailable, guildStoreAvailable, haveSkill, Item, itemAmount, myHp, myMaxhp, myMaxmp, myMp, myPrimestat, print, use, useSkill } from "kolmafia";
import { $item, $skill, $stat } from "libram";

function getAndUse(item: Item): boolean {
  if (itemAmount(item) < 1 && !buy(1, item)) {
    return false;
  }

  if (!use(1, item)) {
    return false;
  }

  return true;
}

function recoverHP(amount: number) {
  let restored = 0;
  let prevHP = myHp();
  let cocoonFailed = false;
  let tongueFailed = false;

  while (myHp() < myMaxhp() && restored < amount) {
    const toRestore = amount - restored;

    if (toRestore > 35 && haveSkill($skill`Cannelloni Cocoon`) && myMaxmp() > 20 && !cocoonFailed) {
      if (!useSkill(1, $skill`Cannelloni Cocoon`)) {
        print("Error using Cannelloni Cocoon");
        cocoonFailed = true;
      }
    }
    else if (haveSkill($skill`Tongue of the Walrus`) && !tongueFailed) {
      if (!useSkill(1, $skill`Tongue of the Walrus`)) {
        print("Error using Tongue of the Walrus");
        tongueFailed = true;
      }
    }
    else {
      const elixir = $item`Doc Galaktik's Homeopathic Elixir`;
      if (!getAndUse(elixir)) {
        print("Error using elixir");
        break;
      }
    }

    restored += myHp() - prevHP;
    prevHP = myHp();
  }
}

function recoverMP(amount: number) {
  let restored = 0;
  let prevMP = myMp();

  while (myMp() < myMaxmp() && restored < amount) {
    if (myPrimestat() === $stat`Mysticality` && guildStoreAvailable()) {
      const mmj = $item`magical mystery juice`;
      if (!getAndUse(mmj)) {
        print("Error using magical mystery juice");
        break;
      }
    }
    else if (dispensaryAvailable()) {
      const kgs = $item`Knob Goblin seltzer`;
      if (!getAndUse(kgs)) {
        print("Error using Knob Goblin seltzer");
        break;
      }
    }
    else {
      const tonic = $item`Doc Galaktik's Invigorating Tonic`;
      if (!getAndUse(tonic)) {
        print("Error using tonic");
        break;
      }
    }

    restored += myMp() - prevMP;
    prevMP = myMp();
  }
}

export function main(type: string, amount: number): boolean {
  if (type === "HP")
    recoverHP(amount);
  else if (type === "MP")
    recoverMP(amount);

  return true;
}
