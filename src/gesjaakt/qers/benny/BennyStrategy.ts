import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class BennyStrategy extends AbstractStrategy {
  cardValueTokenRatio = -2;
  myTokenThreshold = 3;
  myCardTokensThreshold = 10;
  tokenDiffThresholds = new Map();
  playerBeforeIndex: number | null = null;
  defaultTokenDiffThreshold = 10;
  lastSkippedFreeCardValue: number | null = null;

  constructor() {
    super("Benny", "Simple strategy by a simple backender");
  }

  reset() {
    super.reset();

    this.lastSkippedFreeCardValue = null;
  }

  calculateMove(state: GesjaaktState): GesjaaktAction {
    // Card values: 3 - 35

    // Determine the player before
    const otherPlayers = [];
    for (let i = 0; i < state.players.length; i++) {
      if (i == state.currentTurnIndex) {
        // It's a me!
        continue;
      }

      // Determine player before me on the first move.
      if (this.playerBeforeIndex === null) {
        if (
          i == state.currentTurnIndex + 1 ||
          (i == 0 && state.currentTurnIndex == state.players.length - 1)
        ) {
          // This player is directly after me.
        } else {
          // This player is directly before me.
          this.playerBeforeIndex = i;
        }
      }

      otherPlayers.push(state.players[i]);
    }

    for (let i = 0; i < otherPlayers.length; i++) {
      const player = otherPlayers[i];
      if (!this.tokenDiffThresholds.has(player.name)) {
        this.tokenDiffThresholds.set(
          player.name,
          this.defaultTokenDiffThreshold
        );
      }
    }

    if (this.lastSkippedFreeCardValue !== null) {
      if (state.drawnCard.card.value !== this.lastSkippedFreeCardValue) {
        // Whoops, we skipped the free card to earn more tokens, but another player took it. Let's learn from this sad experience.

        // Find out which player took it. We will lower their threshold, but we can also f*ck them up on the parking lot after the tournament.
        const thief = otherPlayers.filter(
          (x) =>
            x.cards.filter(
              (card) => card.value == this.lastSkippedFreeCardValue
            ).length == 1
        )[0];

        if (!thief) {
          if (
            state.players[state.currentTurnIndex].cards.filter(
              (x) => x.value == this.lastSkippedFreeCardValue
            ).length == 0
          ) {
            throw new Error("An unknown party stole my free card!");
          }
        }

        // Lower the threshold for the thief.
        this.tokenDiffThresholds.set(
          thief.name,
          this.tokenDiffThresholds.get(thief.name) - 3
        );
        console.log(
          "Lowered the threshold for greedy thief " +
            thief.name +
            " to " +
            this.tokenDiffThresholds.get(thief.name)
        );
      }

      this.lastSkippedFreeCardValue = null;
    }

    // Take free card unless we can afford to wait until the next round.
    const diff =
      this.scoreIfTaking(state) - (state.currentPlayer.currentScore + 1); // If I don't take the card, I lose a token, so I gain an extra point.
    const otherPlayerCanTakeForFree =
      otherPlayers.filter(
        (player) =>
          player.cards.filter(
            (card) =>
              card.value == state.drawnCard.card.value - 1 ||
              card.value == state.drawnCard.card.value + 1
          ).length > 0 ||
          state.drawnCard.card.value - state.drawnCard.tokens <=
            (state.players.indexOf(player) == this.playerBeforeIndex ? 2 : 1)
      ).length > 0;
    const otherPlayerHasLowTokenAmount =
      otherPlayers.filter(
        (x) => x.tokens == 0 || (x.tokens == 1 && state.drawnCard)
      ).length > 0;
    let otherPlayersTokenThresholdExceeded = false;
    for (let i = 0; i < otherPlayers.length; i++) {
      if (
        state.drawnCard.tokens +
          (state.players.indexOf(otherPlayers[i]) == this.playerBeforeIndex
            ? 2
            : 1) -
          otherPlayers[i].tokens >
        this.tokenDiffThresholds.get(otherPlayers[i].name)
      ) {
        otherPlayersTokenThresholdExceeded = true;
        break;
      }
    }
    const myTokenThresholdExceeded =
      state.currentPlayer.tokens <= this.myTokenThreshold ||
      state.drawnCard.tokens >= this.myCardTokensThreshold;
    if (diff <= 0) {
      if (
        otherPlayerCanTakeForFree ||
        otherPlayerHasLowTokenAmount ||
        otherPlayersTokenThresholdExceeded ||
        myTokenThresholdExceeded ||
        this.generateRandomNumber(0, 1) > 0.85
      ) {
        return GesjaaktAction.TakeCard;
      } else {
        this.lastSkippedFreeCardValue = state.drawnCard.card.value;

        return GesjaaktAction.PlaceToken;
      }
    }

    // Take card if two cards next to adjacent cards are already in posession and the two cards in between are potentially still in play.
    /*
    if (state.currentPlayer.cards.filter(x => x.value == state.drawnCard.card.value - 2).length == 1 &&
      state.currentPlayer.cards.filter(x => x.value == state.drawnCard.card.value + 2).length == 1 &&
      state.players.flatMap(x => x.cards).filter(x => x.value == state.drawnCard.card.value - 1).length == 0 &&
      state.players.flatMap(x => x.cards).filter(x => x.value == state.drawnCard.card.value + 1).length == 0 &&
      state.cardsLeft > 10) {
      return GesjaaktAction.TakeCard;
    }
     */

    // Take card if ratio of card value vs tokens is good enough.
    if (state.drawnCard.tokens - diff >= this.cardValueTokenRatio) {
      return GesjaaktAction.TakeCard;
    }

    return GesjaaktAction.PlaceToken;
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
