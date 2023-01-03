import type { PlayerState } from "@/gesjaakt/game/PlayerState";
import type { DrawnCard } from "@/gesjaakt/game/DrawnCard";

export interface GesjaaktState {
  players: PlayerState;
  currentTurnIndex: number;

  // The card that is currently being played with
  drawnCard: DrawnCard;

  // How many cards are left in the deck (excluding the open card)
  cardsLeft: number;
}
