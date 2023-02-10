import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class IshaStrategy extends AbstractStrategy {
  constructor() {
    super("Isha", "Makes really smart decisions... sometimes");
  }

  initialize() {
    // console.log("Trash talk module initiated...");
  }

  reset() {
    // console.log("Prepare to get Sjaakmatted");
  }

  calculateMove(state: GesjaaktState): GesjaaktAction {
    // Don't want a multiple of 3 tokens, obviously
    if (state.currentPlayer.tokens % 3 === 0) {
      return GesjaaktAction.PlaceToken;
    }

    // Primes are yuck
    if (
      [3, 5, 7, 11, 13, 17, 19, 23, 29, 31].includes(state.drawnCard.card.value)
    ) {
      return GesjaaktAction.PlaceToken;
    }

    const nextIndex = (state.currentTurnIndex + 1) % state.players.length;
    const nextPlayer = state.players[nextIndex];

    // Can't give him any tokens
    if (nextPlayer.name === "Chris") {
      return GesjaaktAction.TakeCard;
    }

    // Just take it and end the game
    if (state.cardsLeft === 0) {
      return GesjaaktAction.TakeCard;
    }

    // Does it even matter at this point?
    return Math.random() > 0.5
      ? GesjaaktAction.PlaceToken
      : GesjaaktAction.TakeCard;
  }
}
