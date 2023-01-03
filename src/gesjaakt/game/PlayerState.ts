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

  public toString(): string {
    return `
    ${this.name}. tokens: ${this.tokens}, score: ${this.currentScore}
    cards: [${this.cards.map((card: Card) => card.value).join(",")}]`;
  }
}
