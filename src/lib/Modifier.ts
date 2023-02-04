export enum Modifier {
  Combat,
  NonCombat,
  MonsterLevel,
  ItemDrop,
  Initiative,
  StenchRes,
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
    case Modifier.Initiative:
      return "initiative";
    case Modifier.StenchRes:
      return "stench resistance";
    default:
      throw new Error("Unhandled modifier: " + modifier);
  }
}
