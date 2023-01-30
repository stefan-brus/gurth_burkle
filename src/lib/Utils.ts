import { myBuffedstat, myPrimestat } from "kolmafia";

export function myMainstat(): number {
  const mainstat = myPrimestat();
  return myBuffedstat(mainstat);
}
