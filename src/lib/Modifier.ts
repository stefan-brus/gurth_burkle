export enum Modifier {
  Combat,
  NonCombat,
};

export function toMafiaModifier(modifier: Modifier): string {
  switch (modifier)
  {
    case Modifier.Combat:
      return "combat";
    case Modifier.NonCombat:
      return "non-combat";
    default:
      throw new Error("Unhandled modifier: " + modifier);
  }
}
