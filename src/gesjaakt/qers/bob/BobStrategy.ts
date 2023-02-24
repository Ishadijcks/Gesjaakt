import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import type { PlayerState } from "@/gesjaakt/game/PlayerState";

export class BobStrategy extends AbstractStrategy {
  constructor() {
    super("B😎b", "🤞");
  }

  private config = {
    takeIfLowerOrEqualToXIncludingFiches: 8,
    jackpot: 15,
    tooHigh: 30,
  };

  calculateMove(state: GesjaaktState): GesjaaktAction {
    const strategies = [
      this.takeIfItLowersScore,
      this.takeIfFree,
      this.takeIfLowerOrEqualToXIncludingFiches,
      this.takeIfJackpot,
      this.skipIfTooHigh,
      this.takeIfLowerThanSix,
    ];

    if (state.cardsLeft < 3 && !this.amIFirst(state)) {
      // debugger;
    }

    if (state.currentPlayer.tokens === 0) {
      // console.log("no token!!");
    }

    let outcome = null;
    for (const strategy of strategies) {
      outcome = strategy.bind(this)(state);
      if (outcome !== null) {
        return outcome;
      }
    }

    return GesjaaktAction.PlaceToken;
  }

  private takeIfLowerThanSix(state: GesjaaktState): GesjaaktAction | null {
    return state.drawnCard.card.value < 6 ? GesjaaktAction.TakeCard : null;
  }

  private takeIfLowerOrEqualToXIncludingFiches(
    state: GesjaaktState
  ): GesjaaktAction | null {
    return state.drawnCard.tokens >= 3 &&
      state.drawnCard.card.value - state.drawnCard.tokens <=
        this.config.takeIfLowerOrEqualToXIncludingFiches
      ? GesjaaktAction.TakeCard
      : null;
  }

  private takeIfItLowersScore(state: GesjaaktState): GesjaaktAction | null {
    const doesItLowerMyScore =
      this.scoreIfTaking(state) < state.currentPlayer.currentScore;

    if (!doesItLowerMyScore) {
      return null;
    }

    if (state.cardsLeft === 0 && this.amIFirst(state)) {
      // End game!
      return GesjaaktAction.TakeCard;
    }

    if (this.waitAnotherRound(state)) {
      // Get some more tokens out if it
      return GesjaaktAction.PlaceToken;
    }

    return GesjaaktAction.TakeCard;
  }

  private takeIfFree(state: GesjaaktState): GesjaaktAction | null {
    // should I wait?
    const isFreeForMe =
      this.scoreIfTaking(state) <= state.currentPlayer.currentScore;

    if (!isFreeForMe) {
      return null;
    }

    if (state.cardsLeft === 0 && this.amIFirst(state)) {
      // End game!
      return GesjaaktAction.TakeCard;
    }

    if (this.waitAnotherRound(state)) {
      // Get some more tokens out if it
      return GesjaaktAction.PlaceToken;
    }

    return GesjaaktAction.TakeCard;
  }

  private skipIfTooHigh(state: GesjaaktState): GesjaaktAction | null {
    return state.drawnCard.card.value >= this.config.tooHigh
      ? GesjaaktAction.PlaceToken
      : null;
  }

  private takeIfJackpot(state: GesjaaktState): GesjaaktAction | null {
    const jackpot =
      this.config.jackpot +
      (state.drawnCard.card.value >= this.config.tooHigh ? 2 : 0);
    return state.drawnCard.tokens >= jackpot ? GesjaaktAction.TakeCard : null;
  }

  private getPlayersInRound(state: GesjaaktState): PlayerState[] {
    const myIndex = state.players.indexOf(state.currentPlayer);
    return [
      ...state.players.slice(myIndex + 1, state.players.length),
      ...state.players.slice(0, myIndex),
    ];
  }

  private scoreIfTakingForPlayer(
    state: GesjaaktState,
    player: PlayerState
  ): number {
    return GesjaaktGame.calculateScore(
      [...player.cards, state.drawnCard.card],
      player.tokens + state.drawnCard.tokens
    );
  }

  private getRanking(state: GesjaaktState): PlayerState[] {
    return [...state.players].sort((a, b) => {
      const scoreA = this.scoreIfTakingForPlayer(state, a);
      const scoreB = this.scoreIfTakingForPlayer(state, b);
      return scoreA < scoreB ? -1 : 1;
    });
  }

  private amIFirst(state: GesjaaktState): boolean {
    return this.getRanking(state)[0] === state.currentPlayer;
  }

  private waitedForCard: number | null = null;

  private waitAnotherRound(state: GesjaaktState): boolean {
    if (this.waitedForCard === state.drawnCard.card.value) {
      // I waited
      // For now, only wait 1 round
      console.log("got coins", this.waitedForCard);
      this.waitedForCard = null;
      return false;
    }

    const players = this.getPlayersInRound(state);
    const isFreeOrLowersForOthers = players.reduce((result, p) => {
      const newScore = this.scoreIfTakingForPlayer(state, p);
      return result || newScore <= p.currentScore;
    }, false);

    if (isFreeOrLowersForOthers) {
      return false;
    }

    this.waitedForCard = state.drawnCard.card.value;
    return true;
  }
}
