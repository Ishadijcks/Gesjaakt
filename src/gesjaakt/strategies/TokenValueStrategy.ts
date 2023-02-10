import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class TokenValueStrategy extends AbstractStrategy {
  tokenValue: number;

  constructor(tokenValue: number) {
    super(
      "TokenValue",
      "Calculate the amount of points gained by taking this card, and only take if lower than tokenValue"
    );
    this.tokenValue = tokenValue;
  }

  calculateMove(state: GesjaaktState): GesjaaktAction {
    const pointsDelta =
      this.scoreIfTaking(state) - state.currentPlayer.currentScore;
    if (pointsDelta <= this.tokenValue) {
      return GesjaaktAction.TakeCard;
    } else {
      return GesjaaktAction.PlaceToken;
    }
  }
}
