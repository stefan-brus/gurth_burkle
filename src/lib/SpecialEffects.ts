import { adv1, Effect, getProperty, haveEffect, itemAmount, runChoice } from "kolmafia";
import { $effect, $item, $location, ensureEffect } from "libram";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectSpecialEffects(info: AdventureInfo) {
  if (info.getSpecialEffects) {
    info.modifiers.forEach(mod => {
      tryGetEffects(mod);
    });
  }
}

type GetSpecialEffect = (mod: Modifier) => Effect;

export const ModifierSpecial: Map<Modifier, GetSpecialEffect[]> = new Map([
  [Modifier.NonCombat, [
    getShadowWaters,
  ]],
  [Modifier.ItemDrop, [
    getShadowWaters,
  ]],
  [Modifier.MeatDrop, [
    getConcertEffect,
    getShadowWaters,
  ]],
  [Modifier.Initiative, [
    getConcertEffect,
    getShadowWaters,
  ]],
]);

export function tryGetEffects(mod: Modifier): Effect[] {
  if (ModifierSpecial.has(mod)) {
    const getEffects = ModifierSpecial.get(mod)!;
    return getEffects.map(getEffect => getEffect(mod));
  }

  return [];
}

function getConcertEffect(mod: Modifier): Effect {
  const ArenaCompletedProperty = "sidequestArenaCompleted";
  const ConcertVisitedProperty = "concertVisited";
  if (getProperty(ArenaCompletedProperty) !== "fratboy" || getProperty(ConcertVisitedProperty) === "true") {
    return $effect`none`;
  }

  if (mod === Modifier.Initiative) {
    ensureEffect($effect`White-boy Angst`);
    return $effect`White-boy Angst`;
  }
  else if (mod === Modifier.MeatDrop) {
    ensureEffect($effect`Winklered`);
    return $effect`Winklered`;
  }

  return $effect`none`;
}

function getShadowWaters(mod: Modifier): Effect {
  if (haveEffect($effect`Shadow Waters`) > 0) {
    return $effect`Shadow Waters`;
  }

  if (itemAmount($item`Rufus's shadow lodestone`) < 1) {
    return $effect`none`;
  }

  adv1($location`Shadow Rift(The Misspelled Cemetary)`);
  runChoice(2);
  return $effect`Shadow Waters`;
}
