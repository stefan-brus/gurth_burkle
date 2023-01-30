import { Location, myBuffedstat, setProperty, Stat } from "kolmafia";
import { AdventureInfo } from "./AdventureInfo";

export const DailyDungeon = {
  run: runDailyDungeon,
};

const DoorChoice = "choiceAdventure692";
const TrapChoice = "choiceAdventure693";
const FirstChestChoice = "choiceAdventure690";
const SecondChestChoice = "choiceAdventure691";
const FatLootChoice = "choiceAdventure689";

function runDailyDungeon(): AdventureInfo {
  // Open door based on highest stat
  const muscle = myBuffedstat(Stat.get("Muscle"));
  const mysticality = myBuffedstat(Stat.get("Mysticality"));
  const moxie = myBuffedstat(Stat.get("Moxie"));

  if (muscle >= mysticality && muscle >= moxie) {
    setProperty(DoorChoice, "4");
  }
  else if (mysticality >= muscle && mysticality >=  moxie) {
    setProperty(DoorChoice, "5");
  }
  else {
    setProperty(DoorChoice, "6");
  }

  setProperty(TrapChoice, "1");
  
  setProperty(FirstChestChoice, "3");
  setProperty(SecondChestChoice, "3");
  setProperty(FatLootChoice, "1");

  return {
    location: Location.get("The Daily Dungeon"),
    modifiers: [],
    expectedNoncombat: "The Final Reward",
  };
}
