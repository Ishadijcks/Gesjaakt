import type { Card } from "@/gesjaakt/game/Card";

export class PlayerState {
  cards: Card[];
  tokens: number;

  currentScore: number;

  constructor(cards: Card[], tokens: number, currentScore: number) {
    this.cards = cards.sort((c1, c2) => c1.value - c2.value);
    this.tokens = tokens;
    this.currentScore = currentScore;
  }
}
