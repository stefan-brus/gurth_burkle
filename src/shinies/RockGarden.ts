import { getProperty, setProperty, visitUrl } from "kolmafia";
import { Properties } from "../Properties";

export const RockGarden = {
  harvest1: () => harvestN(1),
  harvest2: () => harvestN(2),
  harvest3: () => harvestN(3),
  harvestAll: () => { harvestN(1); harvestN(2); harvestN(3); }
};

function harvestN(n: number) {
  visitUrl(`campground.php?action=rgarden${n}&pwd`);

  const harvestedProp = parseInt(getProperty(Properties.Daily.RockGardenHarvested));
  const bitToSet = n === 3? 4 : n;
  setProperty(Properties.Daily.RockGardenHarvested, (harvestedProp | bitToSet).toString());
}
