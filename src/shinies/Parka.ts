import { cliExecute, getProperty, haveEffect, userConfirm } from "kolmafia";
import { $effect } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";
import { Properties } from "../Properties";

export function selectParkaMode(info: AdventureInfo) {
  if (getProperty(Properties.SpikolodonTask) === "true" && spikesAvailable()) {
    adjustParka(ParkaMode.Spikolodon);
    return;
  }

  if (haveEffect($effect`Everything Looks Yellow`) < 1) {
    adjustParka(ParkaMode.Dilophosaur);
    return;
  }

  for (const [parkaMods, mode] of ParkaModeModifiers.entries()) {
    if (info.modifiers.some(mod => parkaMods.includes(mod))) {
      adjustParka(mode);
      return;
    }
  }

  adjustParka(ParkaMode.Kachungasaur);
}

export function spikesAvailable(): boolean {
  const usesToday = parseInt(getProperty(SpikesUsedProperty));
  return usesToday < 5;
}

export function currentParkaMode(): ParkaMode {
  const curModeStr = getProperty(ParkaProperty);
  switch (curModeStr) {
    case "kachungasaur":
      return ParkaMode.Kachungasaur;
    case "dilophosaur":
      return ParkaMode.Dilophosaur;
    case "spikolodon":
      return ParkaMode.Spikolodon;
    case "ghostasaurus":
      return ParkaMode.Ghostasaurus;
    case "pterodactyl":
      return ParkaMode.Pterodactyl;
    default:
      return ParkaMode.Nothing;
  }
}

export enum ParkaMode {
  Nothing,
  Kachungasaur,
  Dilophosaur,
  Spikolodon,
  Ghostasaurus,
  Pterodactyl,
};

const ParkaModeModifiers: Map<Modifier[], ParkaMode> = new Map([
  [[Modifier.HP, Modifier.MeatDrop, Modifier.ColdRes], ParkaMode.Kachungasaur],
  [[Modifier.SleazeDmg, Modifier.SleazeSpellDmg, Modifier.StenchRes], ParkaMode.Dilophosaur],
  [[Modifier.MonsterLevel, Modifier.SleazeRes], ParkaMode.Spikolodon],
  [[Modifier.DamageReduction, Modifier.SpookyRes], ParkaMode.Ghostasaurus],
  [[Modifier.NonCombat, Modifier.Initiative, Modifier.HotRes], ParkaMode.Pterodactyl],
]);

const ParkaProperty = "parkaMode";
const SpikesUsedProperty = "_spikolodonSpikeUses";

function adjustParka(mode: ParkaMode) {
  const cliArgStr = ParkaMode[mode].toLowerCase();
  if (getProperty(ParkaProperty) !== cliArgStr) {
    if (!userConfirm(`Change parka mode to ${cliArgStr}?`))
      throw new Error("User abort on parka mode change");

    cliExecute(`parka ${cliArgStr}`);
  }
  
}
