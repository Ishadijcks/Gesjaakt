import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class ChrisStrategy extends AbstractStrategy {
  constructor() {
    super("Chris", "Kan stiekem nog best programmeren");
  }

  calculateMove(state: GesjaaktState): GesjaaktAction {
    //state.currentPlayer.tokens
    //state.drawnCard.card.value
    //state.currentTurnIndex
    //state.players
    //state.cardsLeft

    // // lage kaarten sowieso pakken
    // if (state.drawnCard.card.value <= 5) {
    //   console.log(
    //     "Chris takes",
    //     state.drawnCard.card.value,
    //     "because it's below 11"
    //   );
    //   return GesjaaktAction.TakeCard;
    // }

    const maxTokens = 10;
    const takeIfFewTokensLeft = 8;
    const takeIfHas1Token = 8;
    const takeIfHas2Tokens = 16;
    const takeIfHas3Tokens = 20;

    // als we veul tokens hebben
    if (state.currentPlayer.tokens >= maxTokens) {
      return GesjaaktAction.PlaceToken;
    }

    // als we nog weinig tokens hebben
    if (
      state.currentPlayer.tokens < 5 &&
      state.drawnCard.card.value <= takeIfFewTokensLeft
    ) {
      console.log(
        "Chris takes",
        state.drawnCard.card.value,
        "because he has few tokens left and it's below",
        takeIfFewTokensLeft + 1
      );
      return GesjaaktAction.TakeCard;
    }

    // als er een token op ligt
    if (
      state.drawnCard.tokens == 1 &&
      state.drawnCard.card.value <= takeIfHas1Token
    ) {
      console.log(
        "Chris takes",
        state.drawnCard.card.value,
        "because it has 1 token and it's below",
        takeIfHas1Token + 1
      );
      return GesjaaktAction.TakeCard;
    }

    // als er 2 tokens op liggen
    if (
      state.drawnCard.tokens == 2 &&
      state.drawnCard.card.value <= takeIfHas2Tokens
    ) {
      console.log(
        "Chris takes",
        state.drawnCard.card.value,
        "because it has 2 tokens and it's below",
        takeIfHas2Tokens + 1
      );
      return GesjaaktAction.TakeCard;
    }

    // als er 3 tokens op liggen
    if (
      state.drawnCard.tokens > 2 &&
      state.drawnCard.card.value <= takeIfHas3Tokens
    ) {
      console.log(
        "Chris takes",
        state.drawnCard.card.value,
        "because it has 3 tokens and it's below",
        takeIfHas3Tokens + 1
      );
      return GesjaaktAction.TakeCard;
    }

    // "gratis" kaarten sowieso pakken
    // TODO: of eerst rond laten gaan?
    let take = false;
    state.currentPlayer.cards.forEach(function (card) {
      if (card.value == state.drawnCard.card.value - 1) {
        console.log(
          "Chris takes",
          state.drawnCard.card.value,
          "because he has",
          card.value,
          "so it's free"
        );
        take = true;
      }
    });
    if (take) return GesjaaktAction.TakeCard;

    return GesjaaktAction.PlaceToken;
  }
}
