import { Effect, haveEffect, Item, itemAmount, use, userConfirm } from "kolmafia";
import { $effect, $item } from "libram";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectSpleen(info: AdventureInfo) {
  info.modifiers.forEach(mod => {
    if (ModifierSpleen.has(mod)) {
      tryUseSpleens(ModifierSpleen.get(mod)!);
    }
  });
}

export const ModifierSpleen: Map<Modifier, Item[]> = new Map([
  [Modifier.Muscle, [
    $item`autumn breeze`,
  ]],
]);

export const SpleenEffects: Map<Item, Effect> = new Map([
  [$item`autumn breeze`, $effect`Delighted by Autumn`],
]);

function tryUseSpleens(items: Item[]) {
  items.filter(item => itemAmount(item) > 0).forEach(item => tryUseSpleen(item));
}

function tryUseSpleen(item: Item) {
  const effect = SpleenEffects.get(item)
  if (effect !== undefined && haveEffect(effect) > 1) {
    return;
  }

  if (userConfirm("Use spleen " + item.name + "?")) {
    use(1, item);
  }
  else {
    throw new Error ("User aborted on spleen " + item.name);
  }
}
