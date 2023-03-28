import { Effect, haveEffect, Item, itemAmount, use, userConfirm } from "kolmafia";
import { $effect, $item } from "libram";
import { Config } from "../Config";
import { maxModifierReached } from "./Adventure";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectPotions(info: AdventureInfo) {
  info.modifiers.forEach(mod => {
    if (ModifierPotions.has(mod) && !maxModifierReached(info, mod)) {
      tryUsePotions(ModifierPotions.get(mod)!);
    }
  });
}

export const ModifierPotions: Map<Modifier, Item[]> = new Map([
  [Modifier.Muscle, [
    $item`votive of confidence`,
    $item`Mick's IcyVapoHotness Rub`,
    $item`pygmy pygment`,
    $item`industrial strength starch`,
    $item`Angry Farmer candy`,
    $item`that gum you like`,
    $item`thin black candle`,
    $item`old eyebrow pencil`,
    $item`super-spiky hair gel`,
  ]],
  [Modifier.Mysticality, [
    $item`votive of confidence`,
  ]],
  [Modifier.Moxie, [
    $item`gaffer's tape`,
    $item`votive of confidence`,
  ]],
  [Modifier.ItemDrop, [
    $item`Salsa Caliente&trade; candle`,
    $item`emergency glowstick`,
    $item`autumn leaf`,
    $item`eagle feather`,
  ]],
  [Modifier.MeatDrop, [
    $item`flapper fly`,
    $item`Smoldering Clover&trade; candle`,
    $item`autumn dollar`,
  ]],
  [Modifier.Initiative, [
    $item`banana candle`,
    $item`giraffe-necked turtle`,
    $item`ant agonist`,
    $item`Angry Farmer candy`,
    $item`that gum you like`,
    $item`vial of The Glistening`,
  ]],
  [Modifier.HotRes, [
    $item`rainbow glitter candle`,
  ]],
  [Modifier.ColdRes, [
    $item`rainbow glitter candle`,
  ]],
  [Modifier.StenchRes, [
    $item`single-use dust mask`,
    $item`rainbow glitter candle`,
    $item`Polysniff Perfume`,
  ]],
  [Modifier.SpookyRes, [
    $item`rainbow glitter candle`,
  ]],
  [Modifier.SleazeRes, [
    $item`rainbow glitter candle`,
  ]],
  [Modifier.StenchDmg, [
    $item`lynyrd musk`,
    $item`colorful toad`,
  ]],
]);

export const PotionEffects = new Map<Item, Effect>([
  // muscle
  [$item`Mick's IcyVapoHotness Rub`, $effect`Extreme Muscle Relaxation`],
  [$item`pygmy pygment`, $effect`Woad Warrior`],
  [$item`industrial strength starch`, $effect`Industrial Strength Starch`],
  [$item`thin black candle`, $effect`Rainy Soul Miasma`],
  [$item`old eyebrow pencil`, $effect`Browbeaten`],
  [$item`super spiky hair gel`, $effect`Spiky Hair`],
  [$item`votive of confidence`, $effect`Confidence of the Votive`],

  // moxie
  [$item`gaffer's tape`, $effect`Gaffe Free`],

  // item
  [$item`Salsa Caliente™ candle`, $effect`El Aroma de Salsa`],
  [$item`emergency glowstick`, $effect`Glowing Hands`],
  [$item`autumn leaf`, $effect`Crunching Leaves`],
  [$item`eagle feather`, $effect`Eagle Eyes`],

  // meat
  [$item`flapper fly`, $effect`Flapper Dancin'`],
  [$item`Smoldering Clover&trade; candle`, $effect`Good Things Are Coming, You Can Smell It`],
  [$item`autumn dollar`, $effect`Bet Your Autumn Dollar`],

  // init
  [$item`banana candle`, $effect`Everything Is Bananas`],
  [$item`giraffe-necked turtle`, $effect`Adorable Lookout`],
  [$item`ant agonist`, $effect`All Fired Up`],
  [$item`Angry Farmer candy`, $effect`Sugar Rush`],
  [$item`that gum you like`, $effect`Sugar Rush`],
  [$item`vial of The Glistening`, $effect`The Glistening`],
  [$item`old bronzer`, $effect`Sepia Tan`],

  // hot res
  [$item`rainbow glitter candle`, $effect`Covered in the Rainbow`],

  // stench res
  [$item`single-use dust mask`, $effect`Temporarily Filtered`],
  [$item`Polysniff Perfume`, $effect`Neutered Nostrils`],

  // stench dmg
  [$item`lynyrd musk`, $effect`Musky`],
  [$item`colorful toad`, $effect`All Glory To the Toad`],
]);

function tryUsePotions(items: Item[]) {
  items.filter(item => itemAmount(item) > 0).forEach(item => tryUsePotion(item));
}

function tryUsePotion(item: Item) {
  const effect = PotionEffects.get(item)
  if (effect !== undefined && haveEffect(effect) > 1) {
    return;
  }

  if (!Config.PromptPotions || userConfirm("Use potion " + item.name + "?")) {
    use(1, item);
  }
  else {
    throw new Error ("User aborted on potion " + item.name);
  }
}
