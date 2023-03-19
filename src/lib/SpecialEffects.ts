import { adv1, Effect, getProperty, haveEffect, itemAmount, runChoice, setProperty, userConfirm } from "kolmafia";
import { $effect, $item, $location, ensureEffect } from "libram";
import { maxModifierReached } from "./Adventure";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectSpecialEffects(info: AdventureInfo) {
  if (info.getSpecialEffects) {
    info.modifiers.forEach(mod => {
      tryGetEffects(info, mod);
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

export function tryGetEffects(info: AdventureInfo, mod: Modifier): Effect[] {
  if (ModifierSpecial.has(mod) && !maxModifierReached(info, mod)) {
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
    if (haveEffect($effect`White-boy Angst`) < 1 && userConfirm("Get initiative from concert?")) {
      ensureEffect($effect`White-boy Angst`);
      return $effect`White-boy Angst`;
    }
  }
  else if (mod === Modifier.MeatDrop) {
    if (haveEffect($effect`Winklered`) < 1 && userConfirm("Get meat drop from concert?")) {
      ensureEffect($effect`Winklered`);
      return $effect`Winklered`;
    }
  }

  return $effect`none`;
}

function getShadowWaters(mod: Modifier): Effect {
  const LodedStoneChoice = "choiceAdventure1500";
  if (haveEffect($effect`Shadow Waters`) > 0 || itemAmount($item`Rufus's shadow lodestone`) < 1) {
    return $effect`none`;
  }

  if (userConfirm("Get Shadow Waters?")) {
    setProperty(LodedStoneChoice, "2");
    adv1($location`Shadow Rift(The Misspelled Cemetary)`);
    return $effect`Shadow Waters`;
  }

  return $effect`none`;
}
