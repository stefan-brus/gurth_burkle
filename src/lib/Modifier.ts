export enum Modifier {
  Combat,
  NonCombat,
  MonsterLevel,
  ItemDrop,
  FoodDrop,
  BoozeDrop,
  Initiative,
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
    case Modifier.Combat:
      return "combat";
    case Modifier.NonCombat:
      return "non-combat";
    case Modifier.MonsterLevel:
      return "monster level";
    case Modifier.ItemDrop:
      return "item drop";
    case Modifier.FoodDrop:
      return "food drop";
    case Modifier.BoozeDrop:
      return "booze drop";
    case Modifier.Initiative:
      return "initiative";
    case Modifier.DamageAbsorption:
      return "damage absorption";
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
