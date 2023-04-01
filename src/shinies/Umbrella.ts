import { cliExecute, getProperty, userConfirm } from "kolmafia";
import { Config } from "../Config";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";

export function selectUmbrellaMode(info: AdventureInfo) {
  for (const mod of info.modifiers) {
    if (UmbrellaModeModifiers.has(mod)) {
      const mode = UmbrellaModeModifiers.get(mod)!;
      adjustUmbrella(mode);
      return;
    }
  }

  adjustUmbrella(UmbrellaMode.BucketStyle);
}

export function adjustUmbrella(mode: UmbrellaMode) {
  const cliArgStr = modeToCliStr(mode);
  if (!getProperty(UmbrellaProperty).includes(cliArgStr)) {
    if (Config.PromptUmbrella && !userConfirm(`Change umbrella mode to ${cliArgStr}?`))
      throw new Error("User abort on umbrella mode change");

    cliExecute(`umbrella ${cliArgStr}`);
  }
}

export enum UmbrellaMode {
  Broken,
  ForwardFacing,
  BucketStyle,
  PitchforkStyle,
  ConstantTwirl,
  Cocoon,
};

export const UmbrellaModeModifiers: Map<Modifier, UmbrellaMode> = new Map([
  [Modifier.MonsterLevel, UmbrellaMode.Broken],
  [Modifier.DamageReduction, UmbrellaMode.ForwardFacing],
  [Modifier.ItemDrop, UmbrellaMode.BucketStyle],
  [Modifier.WeaponDamage, UmbrellaMode.PitchforkStyle],
  [Modifier.SpellDamage, UmbrellaMode.ConstantTwirl],
  [Modifier.NonCombat, UmbrellaMode.Cocoon],
]);

const UmbrellaProperty = "umbrellaState";

function modeToCliStr(mode: UmbrellaMode): string {
  switch (mode) {
    case UmbrellaMode.Broken:
      return "broken";
    case UmbrellaMode.ForwardFacing:
      return "forward";
    case UmbrellaMode.BucketStyle:
      return "bucket";
    case UmbrellaMode.PitchforkStyle:
      return "pitchfork";
    case UmbrellaMode.ConstantTwirl:
      return "twirling";
    case UmbrellaMode.Cocoon:
      return"cocoon";
  }
}
