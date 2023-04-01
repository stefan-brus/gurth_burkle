import { equip, equippedAmount, haveEffect, haveSkill, itemAmount, myLevel, myMaxhp, print, Slot, toEffect, toSlot, use, useSkill } from "kolmafia";
import { $item, $skill, $slot } from "libram";
import { ModifierGear } from "../gear/Equipment";
import { adjustParka, ParkaMode, ParkaModeModifiers } from "../shinies/Parka";
import { NoAdventure } from "./AdventureInfo";
import { ModifierSkills } from "./Buffs";
import { Modifier, myNumericModifier, myNumericModifierBuff, myNumericModifierEffect, myNumericModifierItem, toMafiaModifier } from "./Modifier";
import { ModifierPotions, PotionEffects } from "./Potion";
import { ModifierSpecial, tryGetEffects } from "./SpecialEffects";
import { ModifierSpleen, SpleenEffects } from "./Spleen";
import { adjustUmbrella, UmbrellaModeModifiers } from "../shinies/Umbrella";

export function myMaximize(mod: Modifier, simulate: boolean = false, verbose: boolean = false): number {
  let result = myNumericModifier(mod);

  const gearResult = maximizeEquipment(mod, simulate, verbose);
  if (verbose) {
    print(`Gear would add ${gearResult} ${toMafiaModifier(mod)}`);
  }
  result += gearResult;

  const buffsResult = maximizeBuffs(mod, simulate, verbose);
  if (verbose) {
    print(`Buffs would add ${buffsResult} ${toMafiaModifier(mod)}`);
  }
  result += buffsResult;

  const potionsResult = maximizePotions(mod, simulate, verbose);
  if (verbose) {
    print(`Potions would add ${potionsResult} ${toMafiaModifier(mod)}`);
  }
  result += potionsResult;

  const spleenResult = maximizeSpleen(mod, simulate, verbose);
  if (verbose) {
    print(`Spleen would add ${spleenResult} ${toMafiaModifier(mod)}`);
  }
  result += spleenResult;

  const specialResult = simulate ? maximizeSpecialSimulate(mod, verbose) : maximizeSpecial(mod, verbose);
  if (verbose) {
    print(`Special effects would add ${specialResult} ${toMafiaModifier(mod)}`);
  }
  result += specialResult;

  const parkaResult = maximizeParka(mod, simulate, verbose);
  if (verbose) {
    print(`Parka would add ${parkaResult} ${toMafiaModifier(mod)}`);
  }
  result += parkaResult;

  const umbrellaResult = maximizeUmbrella(mod, simulate, verbose);
  if (verbose) {
    print(`Umbrella would add ${umbrellaResult} ${toMafiaModifier(mod)}`);
  }
  result += umbrellaResult;

  return result;
}

function maximizeEquipment(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (ModifierGear.has(mod)) {
    const gear = ModifierGear.get(mod)!;
    let equippedSlots: Slot[] = [];

    for (const item of gear) {
      if (equippedAmount(item) > 0) {
        const modAdded = myNumericModifierItem(item, mod);

        if (verbose) {
          print(`${item.name} already equipped, giving ${modAdded} ${toMafiaModifier(mod)}`);
        }

        continue;
      }

      if (itemAmount(item) > 0) {
        let slot = $slot`none`;

        if (toSlot(item) === $slot`acc1`) {
          if (equippedSlots.includes($slot`acc1`)) {
            if (equippedSlots.includes($slot`acc2`) && !equippedSlots.includes($slot`acc3`)) {
              slot = $slot`acc3`;
            }
            else {
              slot = $slot`acc2`;
            }
          }
          else {
            slot = $slot`acc1`;
          }
        }
        else {
          slot = toSlot(item);
        }

        if (slot !== $slot`none`) {
          equippedSlots.push(slot);
          const modAdded = myNumericModifierItem(item, mod);
          result += modAdded;

          if (verbose) {
            print(`Equipping ${item.name} would add ${modAdded} ${toMafiaModifier(mod)}`);
          }

          if (!simulate) {
            equip(slot, item);
          }
        }
      }
    }
  }

  return result;
}

function maximizeBuffs(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (ModifierSkills.has(mod)) {
    const skills = ModifierSkills.get(mod)!;

    for (const buff of skills) {
      if (haveSkill(buff)) {
        const modAdded = myNumericModifierBuff(buff, mod);

        if (verbose) {
          print(`Buff ${buff.name} gives ${modAdded} ${toMafiaModifier(mod)}`);
        }

        if (haveEffect(toEffect(buff)) < 1) {
          result += modAdded;
          if (!simulate) {
            useSkill(1, buff);
          }
        }
      }
    }
  }

  return result;
}

function maximizePotions(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (ModifierPotions.has(mod)) {
    const pots = ModifierPotions.get(mod)!;

    for (const pot of pots) {
      const effect = PotionEffects.get(pot)!;
      const modAdded = myNumericModifierEffect(effect, mod);

      if (haveEffect(effect) > 0) {
        if (verbose) {
          print(`Potion ${pot.name} already applied, giving ${modAdded} ${toMafiaModifier(mod)}`);
        }

        continue;
      }

      if (itemAmount(pot) > 0) {
        result += modAdded;

        if (verbose) {
          print(`Potion ${pot.name} would give ${modAdded} ${toMafiaModifier(mod)}`);
        }

        if (!simulate) {
          use(1, pot);
        }
      }
    }
  }

  return result;
}

function maximizeSpleen(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (ModifierSpleen.has(mod)) {
    const spleens = ModifierSpleen.get(mod)!;

    for (const spleen of spleens) {
      const effect = SpleenEffects.get(spleen)!;
      const modAdded = myNumericModifierEffect(effect, mod);

      if (haveEffect(effect) > 0) {
        if (verbose) {
          print(`Spleen ${spleen.name} already applied, giving ${modAdded} ${toMafiaModifier(mod)}`);
        }

        continue;
      }

      if (itemAmount(spleen) > 0) {
        result += modAdded;

        if (verbose) {
          print(`Spleen ${spleen.name} would give ${modAdded} ${toMafiaModifier(mod)}`);
        }

        if (!simulate) {
          use(1, spleen);
        }
      }
    }
  }

  return result;
}

function maximizeSpecial(mod: Modifier, verbose: boolean): number {
  let result = 0;

  if (ModifierSpecial.has(mod)) {
    const effects = tryGetEffects(NoAdventure, mod);

    for (const effect of effects) {
      const modAdded = myNumericModifierEffect(effect, mod);
      result += modAdded;

      if (verbose) {
        print(`${effect.name} gives ${modAdded} ${toMafiaModifier(mod)}`);
      }
    }
  }

  return result;
}

function maximizeSpecialSimulate(mod: Modifier, verbose: boolean): number {
  let result = 0;

  const ConcertMods = [Modifier.MeatDrop, Modifier.Initiative];
  const ShadowMods = [Modifier.NonCombat, Modifier.ItemDrop, Modifier.MeatDrop, Modifier.Initiative];

  if (ConcertMods.includes(mod)) {
    const modAdded = simulateConcert(mod);
    result += modAdded;

    if (verbose) {
      print(`Concert would give ${modAdded} ${toMafiaModifier(mod)}`);
    }
  }

  if (ShadowMods.includes(mod)) {
    const modAdded = simulateShadow(mod);
    result += modAdded;

    if (verbose) {
      print(`Shadow rift would give ${modAdded} ${toMafiaModifier(mod)}`);
    }
  }

  return result;
}

function simulateConcert(mod: Modifier): number {
  switch (mod) {
    case Modifier.MeatDrop:
      return 40;
    case Modifier.Initiative:
      return 50;
    default:
      return 0;
  }
}

function simulateShadow(mod: Modifier): number {
  switch (mod) {
    case Modifier.NonCombat:
      return 10;
    case Modifier.ItemDrop:
      return 100;
    case Modifier.MeatDrop:
      return 200;
    case Modifier.Initiative:
      return 100;
    default:
      return 0;
  }
}

function maximizeParka(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (equippedAmount($item`Jurassic Parka`) < 1) {
    return result;
  }

  const ParkaModifierAmounts: Map<Modifier, number> = new Map([
    [Modifier.HP, myMaxhp()],
    [Modifier.MeatDrop, 50],
    [Modifier.ColdRes, 2],
    [Modifier.SleazeDmg, 20],
    [Modifier.SleazeSpellDmg, 20],
    [Modifier.StenchRes, 2],
    [Modifier.MonsterLevel, Math.min(33, myLevel() * 33)],
    [Modifier.SleazeRes, 2],
    [Modifier.DamageReduction, 10],
    [Modifier.MP, 50],
    [Modifier.SpookyRes, 2],
    [Modifier.NonCombat, 5],
    [Modifier.Initiative, 50],
    [Modifier.HotRes, 2],
  ]);

  for (const [parkaMods, mode] of ParkaModeModifiers.entries()) {
    if (parkaMods.includes(mod)) {
      result = ParkaModifierAmounts.get(mod)!;

      if (verbose) {
        print(`${mode.toString()} Parka Mode would give ${result} ${toMafiaModifier(mod)}`);
      }

      if (!simulate) {
        adjustParka(mode);
      }

      break;
    }
  }

  return result;
}

function maximizeUmbrella(mod: Modifier, simulate: boolean, verbose: boolean): number {
  let result = 0;

  if (equippedAmount($item`unbreakable umbrella`) < 1) {
    return result;
  }

  const UmbrellaModifierAmounts: Map<Modifier, number> = new Map([
    [Modifier.MonsterLevel, myNumericModifier(Modifier.MonsterLevel) * 1.25],
    [Modifier.DamageReduction, 25],
    [Modifier.ItemDrop, 25],
    [Modifier.WeaponDamage, 25],
    [Modifier.SpellDamage, 25],
    [Modifier.NonCombat, 10],
  ]);

  if (UmbrellaModeModifiers.has(mod)) {
    const mode = UmbrellaModeModifiers.get(mod)!;
    result = UmbrellaModifierAmounts.get(mod)!;

    if (verbose) {
      print(`${mode.toString()} Umbrella Mode would give ${result} ${toMafiaModifier(mod)}`);
    }

    if (!simulate) {
      adjustUmbrella(mode);
    }
  }

  return result;
}
