import { Item, haveSkill, itemAmount, storageAmount, stringModifier } from "kolmafia";
import { Arguments } from "../Arguments";
import { $skill } from "libram";
import { print } from "kolmafia";

export function books(args: Arguments) {
  const checkStorage = args.flagArgs.includes("storage");

  Item.all().forEach(item => { 
    if ((checkStorage && storageAmount(item) > 0) || itemAmount(item) > 0) {
      const skillMod = stringModifier(item, "Skill");
      if (skillMod && !haveSkill($skill`${skillMod}`)) {
        print(`"${item.name}" teaches skill: "${skillMod}"`);
      }
    }
  });
}
