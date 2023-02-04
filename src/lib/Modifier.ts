export enum Modifier {
  Combat,
  NonCombat,
  StenchRes,
};

export function toMafiaModifier(modifier: Modifier): string {
  switch (modifier)
  {
    case Modifier.Combat:
      return "combat";
    case Modifier.NonCombat:
      return "non-combat";
    case Modifier.StenchRes:
      return "stench resistance";
    default:
      throw new Error("Unhandled modifier: " + modifier);
  }
}
