import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import table from "@/gesjaakt/qers/siebren/siebren_v3_7.json";

type Qtable = { [name: string]: [number, number] };

export class SiebrenStrategy extends AbstractStrategy {
  qTable: Qtable;
  constructor() {
    super("Siebren", "Qtable");
    this.qTable = table as unknown as Qtable;
  }

  initialize() {}

  reset() {}

  calculateMove(state: GesjaaktState): GesjaaktAction {
    let scoreIfTaking = state.drawnCard.card.value - state.drawnCard.tokens;
    for (const card of state.currentPlayer.cards) {
      if (
        card.value == state.drawnCard.card.value + 1 ||
        card.value == state.drawnCard.card.value - 1
      ) {
        scoreIfTaking = -state.drawnCard.tokens;
      }
    }
    if (scoreIfTaking < -10) {
      scoreIfTaking = -10;
    }
    const action = this.getActionIndex(
      this.qTable[
        `${state.currentPlayer.tokens}_${state.drawnCard.tokens}_${state.cardsLeft}_${scoreIfTaking}`
      ]
    );
    if (action == 0) {
      return GesjaaktAction.PlaceToken;
    } else {
      return GesjaaktAction.TakeCard;
    }
  }

  getActionIndex(array: [number, number]): number {
    if (array[0] > array[1]) {
      return 0;
    } else {
      return 1;
    }
  }
}
