import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";

export class RandomlyTakeStrategy extends AbstractStrategy {
  // The percentage [0-1] chance of taking the card
  probability: number;

  constructor(probability: number) {
    super(
      `RandomlyTake (${probability})`,
      "A basic strategy which takes the card with a probability"
    );
    this.probability = probability;
  }

  calculateMove(): GesjaaktAction {
    return Math.random() <= this.probability
      ? GesjaaktAction.TakeCard
      : GesjaaktAction.PlaceToken;
  }
}
