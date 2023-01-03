import type { PlayerState } from "@/gesjaakt/game/PlayerState";
import type { DrawnCard } from "@/gesjaakt/game/DrawnCard";

export class GesjaaktState {
  players: PlayerState[];
  currentTurnIndex: number;

  // The card that is currently being played with
  drawnCard: DrawnCard;

  // How many cards are left in the deck (excluding the open card)
  cardsLeft: number;

  constructor(
    players: PlayerState[],
    currentTurnIndex: number,
    drawnCard: DrawnCard,
    cardsLeft: number
  ) {
    this.players = players;
    this.currentTurnIndex = currentTurnIndex;
    this.drawnCard = drawnCard;
    this.cardsLeft = cardsLeft;
  }

  public get currentPlayer(): PlayerState {
    return this.players[this.currentTurnIndex];
  }
}
