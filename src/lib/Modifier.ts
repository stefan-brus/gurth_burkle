export enum Modifier {
  Combat,
  NonCombat,
  MonsterLevel,
  ItemDrop,
  Initiative,
  HotRes,
  ColdRes,
  StenchRes,
  SpookyRes,
  SleazeRes,
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
    default:
      throw new Error("Unhandled modifier: " + modifier);
  }
}
