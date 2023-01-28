import { print, myName } from "kolmafia";
import { TrainSet } from "libram";

export function main(): void {
  print("Hello, " + myName());
  print("Is the trainset currently configurable? " + TrainSet.canConfigure());
}
