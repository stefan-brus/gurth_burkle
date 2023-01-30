import { getProperty, Item, itemAmount } from "kolmafia";
import { TrainSet } from "libram";
import { Station } from "libram/dist/resources/2022/TrainSet";
import { Task } from "../tasks/Task";

export const ConfigureTrainsetTask: Task = {
  name: "Reconfigure trainset",
  subtasks: [
    {
      name: "Reconfigure trainset",
      available: () => TrainSet.canConfigure(),
      progress: () => configureTrainset(suggestedConfig()),
      completed: () => suggestedConfig() == TrainSet.cycle(),
    },
  ],
};

const TrainsetConfigOre: [Station, Station, Station, Station, Station, Station, Station, Station] = [
  Station.COAL_HOPPER,
  Station.GAIN_MEAT,
  Station.ORE_HOPPER,
  Station.LOGGING_MILL,
  Station.TOWER_FIZZY,
  Station.BRAWN_SILO,
  Station.BRAIN_SILO,
  Station.GROIN_SILO,
];

const TrainsetConfigML: [Station, Station, Station, Station, Station, Station, Station, Station] = [
  Station.COAL_HOPPER,
  Station.GAIN_MEAT,
  Station.WATER_BRIDGE,
  Station.LOGGING_MILL,
  Station.TOWER_FIZZY,
  Station.BRAWN_SILO,
  Station.BRAIN_SILO,
  Station.GROIN_SILO,
];

const TrapperQuestProperty = "questL08Trapper";
const TrapperOreProperty = "trapperOre";

function suggestedConfig(): [Station, Station, Station, Station, Station, Station, Station, Station] {
  const trapperQuest = getProperty(TrapperQuestProperty);
  const trapperGivenOre = trapperQuest != "unstarted" && trapperQuest != "started" && trapperQuest != "step1";

  if (!trapperGivenOre) {
    const trapperOre = getProperty(TrapperOreProperty);

    if (trapperOre != "") {
      const trapperItem = Item.get(trapperOre);

      if (itemAmount(trapperItem) < 3) {
        return TrainsetConfigOre;
      }
    }
    else if (
      itemAmount(Item.get("asbestos ore")) < 3 || 
      itemAmount(Item.get("chrome ore")) < 3 ||
      itemAmount(Item.get("linoleum ore")) < 3
    ) {
      return TrainsetConfigOre;
    }
  }

  return TrainsetConfigML;
}

function configureTrainset(config: [Station, Station, Station, Station, Station, Station, Station, Station]) {
  if (!TrainSet.setConfiguration(config)) {
    throw new Error("Error configuring trainset");
  }
}
