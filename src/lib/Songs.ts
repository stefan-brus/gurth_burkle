import { cliExecute, Effect, haveEffect, haveSkill, mpCost, myEffects, myMaxmp, Skill, toEffect, toSkill, userConfirm, useSkill } from "kolmafia";
import { $effect, $skill } from "libram";
import { Config } from "../Config";
import { Constants } from "../Constants";
import { maxModifierReached } from "./Adventure";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectSongs(info: AdventureInfo) {
  let modifierSongs: Skill[] = [];
  info.modifiers.forEach(mod => {
    if (ModifierSongs.has(mod) && !maxModifierReached(info, mod)) {
      modifierSongs.push(ModifierSongs.get(mod)!);
    }
  });

  const songs = modifierSongs.concat(BaseSongs).slice(0, songCapacity());
  tryApplySongs(songs);
}

export const ModifierSongs: Map<Modifier, Skill> = new Map([
  [Modifier.HP, $skill`The Power Ballad of the Arrowsmith`],
  [Modifier.MP, $skill`The Magical Mojomuscular Melody`],
  [Modifier.Muscle, $skill`Stevedave's Shanty of Superiority`],
  [Modifier.Mysticality, $skill`Stevedave's Shanty of Superiority`],
  [Modifier.Moxie, $skill`Stevedave's Shanty of Superiority`],
  [Modifier.WeaponDamage, $skill`Jackasses' Symphony of Destruction`],
  [Modifier.SpellDamage, $skill`Jackasses' Symphony of Destruction`],
  [Modifier.Combat, $skill`Carlweather's Cantata of Confrontation`],
  [Modifier.NonCombat, $skill`The Sonata of Sneakiness`],
  [Modifier.MonsterLevel, $skill`Ur-Kel's Aria of Annoyance`],
  [Modifier.ItemDrop, $skill`Fat Leon's Phat Loot Lyric`],
  [Modifier.MeatDrop, $skill`The Polka of Plenty`],
  [Modifier.Initiative, $skill`Cletus's Canticle of Celerity`],
  [Modifier.DamageReduction, $skill`Brawnee's Anthem of Absorption`],
]);

const BaseSongs: Skill[] = [
  $skill`Fat Leon's Phat Loot Lyric`,
  $skill`The Polka of Plenty`,
  $skill`Aloysius' Antiphon of Aptitude`,
  $skill`Stevedave's Shanty of Superiority`,
];

function songCapacity(): number {
  return haveSkill($skill`Mariachi Memory`) ? 4 : 3;
}

function tryApplySongs(songs: Skill[]) {
  const desiredSongs = songs.filter(song => haveSkill(song)).map(song => toEffect(song));
  const currentSongs = Object.keys(myEffects()).map(name => Effect.get(name)).filter(effect => effect.song);
  const undesiredSongs = currentSongs.filter(song => desiredSongs.includes(song));

  let songsToRemove = desiredSongs.length + undesiredSongs.length - songCapacity();
  
  if (songsToRemove > undesiredSongs.length)
    throw new Error("Something went wrong with song computation");

  while (songsToRemove > 0) {
    cliExecute(`uneffect ${undesiredSongs[songsToRemove - 1].name}`);
    songsToRemove--;
  }

  desiredSongs.forEach(song => {
    const songSkill = toSkill(song);
    if (haveEffect(song) < 1 && mpCost(songSkill) + Constants.BuffCastMPBuffer > myMaxmp()) {
      if (!Config.PromptSongs || userConfirm("Cast song " + songSkill.name + "?")) {
        useSkill(1, songSkill);
      }
      else {
        throw new Error("User aborted on song " + songSkill.name);
      }
    }
  });
}
