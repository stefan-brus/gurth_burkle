import { Effect, getPower, haveSkill, Item, numericModifier, Skill, toEffect, toSlot } from "kolmafia";
import { $skill, $slot } from "libram";

export enum Modifier {
  HP,
  MP,
  Muscle,
  Mysticality,
  Moxie,
  WeaponDamage,
  SpellDamage,
  Combat,
  NonCombat,
  MonsterLevel,
  ItemDrop,
  FoodDrop,
  BoozeDrop,
  MeatDrop,
  Initiative,
  DamageReduction,
  DamageAbsorption,
  HotRes,
  ColdRes,
  StenchRes,
  SpookyRes,
  SleazeRes,
  HotDmg,
  ColdDmg,
  StenchDmg,
  SpookyDmg,
  SleazeDmg,
  HotSpellDmg,
  ColdSpellDmg,
  StenchSpellDmg,
  SpookySpellDmg,
  SleazeSpellDmg,
};

export function toMafiaModifier(modifier: Modifier): string {
  switch (modifier)
  {
    case Modifier.HP:
      return "maximum hp";
    case Modifier.MP:
      return "maximum mp";
    case Modifier.Muscle:
      return "muscle";
    case Modifier.Mysticality:
      return "mysticality";
    case Modifier.Moxie:
      return "moxie";
    case Modifier.WeaponDamage:
      return "weapon damage";
    case Modifier.SpellDamage:
      return "spell damage";
    case Modifier.Combat:
      return "combat rate";
    case Modifier.NonCombat:
      return "combat rate";
    case Modifier.MonsterLevel:
      return "monster level";
    case Modifier.ItemDrop:
      return "item drop";
    case Modifier.FoodDrop:
      return "food drop";
    case Modifier.BoozeDrop:
      return "booze drop";
    case Modifier.MeatDrop:
      return "meat drop";
    case Modifier.Initiative:
      return "initiative";
    case Modifier.DamageAbsorption:
      return "damage absorption";
    case Modifier.DamageReduction:
      return "damage reduction";
    case Modifier.HotRes:
      return "hot resistance";
    case Modifier.ColdRes:
      return "cold resistance";
    case Modifier.StenchRes:
      return "stench resistance";
    case Modifier.SpookyRes:
      return "spooky resistance";
    case Modifier.SleazeRes:
      return "sleaze resistance";
    case Modifier.HotDmg:
      return "hot damage";
    case Modifier.ColdDmg:
      return "cold damage";
    case Modifier.StenchDmg:
      return "stench damage";
    case Modifier.SpookyDmg:
      return "spooky damage";
    case Modifier.SleazeDmg:
      return "sleaze damage";
    case Modifier.HotSpellDmg:
      return "hot spell damage";
    case Modifier.ColdSpellDmg:
      return "cold spell damage";
    case Modifier.StenchSpellDmg:
      return "stench spell damage";
    case Modifier.SpookySpellDmg:
      return "spooky spell damage";
    case Modifier.SleazeSpellDmg:
      return "sleaze spell damage";
    default:
      throw new Error("Unhandled modifier: " + modifier);
  }
}

// Totals: If true, return the sum of the given modifier + other modifiers that affect it
// E.G. myNumericModifier(Modifier.FoodDrop, true) will return ItemDrop + FoodDrop
export function myNumericModifier(mod: Modifier, totals: boolean = false): number {
  let myModifier = numericModifier(toMafiaModifier(mod));

  if (totals && (mod === Modifier.FoodDrop || mod === Modifier.BoozeDrop)) {
    myModifier += numericModifier(toMafiaModifier(Modifier.ItemDrop));
  }

  return myModifier
}

export function myNumericModifierItem(item: Item, mod: Modifier): number {
  let modifier = numericModifier(item, toMafiaModifier(mod));

  if ([$slot`hat`, $slot`shirt`, $slot`pants`].includes(toSlot(item))) {
    let power = getPower(item);

    if (haveSkill($skill`Tao of the Terrapin`) && [$slot`hat`, $slot`pants`].includes(toSlot(item))) {
      power *= 2;
    }

    modifier += power;
  }

  return modifier;
}

export function myNumericModifierBuff(buff: Skill, mod: Modifier): number {
  return numericModifier(toEffect(buff), toMafiaModifier(mod));
}

export function myNumericModifierEffect(effect: Effect, mod: Modifier): number {
  return numericModifier(effect, toMafiaModifier(mod));
}
