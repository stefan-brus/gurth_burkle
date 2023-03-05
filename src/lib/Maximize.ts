import { equip, equippedAmount, haveEffect, haveSkill, itemAmount, print, Slot, toEffect, toSlot, use, useSkill } from "kolmafia";
import { $slot } from "libram";
import { ModifierGear } from "../gear/Equipment";
import { ModifierSkills } from "./Buffs";
import { Modifier, myNumericModifierBuff, myNumericModifierEffect, myNumericModifierItem, toMafiaModifier } from "./Modifier";
import { ModifierPotions, PotionEffects } from "./Potion";

export function myMaximize(mod: Modifier, simulate: boolean = false, verbose: boolean = false): number {
  let result = 0;

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
        result += modAdded;

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
        result += modAdded;

        if (verbose) {
          print(`Buff ${buff.name} gives ${modAdded} ${toMafiaModifier(mod)}`);
        }

        if (!simulate && haveEffect(toEffect(buff)) < 1) {
          useSkill(1, buff);
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
        result += modAdded;

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
