import { myBuffedstat, myDaycount, myPrimestat } from "kolmafia";
import { Constants } from "../Constants";

export function myMainstat(): number {
  const mainstat = myPrimestat();
  return myBuffedstat(mainstat);
}

export function ascensionDaysLeft(): number {
  return Constants.PredictedAscensionDays - myDaycount() + 1;
}
