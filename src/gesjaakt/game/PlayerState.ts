import type { Card } from "@/gesjaakt/game/Card";

export class PlayerState {
  name: string;
  cards: Card[];
  tokens: number;

  currentScore: number;

  constructor(
    name: string,
    cards: Card[],
    tokens: number,
    currentScore: number
  ) {
    this.name = name;
    this.cards = cards.sort((c1, c2) => c1.value - c2.value);
    this.tokens = tokens;
    this.currentScore = currentScore;
  }
}
