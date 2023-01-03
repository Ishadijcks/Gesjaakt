import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class TakeIfFreeStrategy extends AbstractStrategy {
  constructor() {
    super(
      "TakeIfFree",
      "Only take the card if it would not increase our score"
    );
  }

  calculateMove(state: GesjaaktState): GesjaaktAction {
    if (state.currentPlayer.currentScore >= this.scoreIfTaking(state)) {
      return GesjaaktAction.TakeCard;
    } else {
      return GesjaaktAction.PlaceToken;
    }
  }
}
