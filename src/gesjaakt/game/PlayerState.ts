import type { Card } from "@/gesjaakt/game/Card";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";

export class PlayerState {
  name: string;
  cards: Card[];
  tokens: number;

  constructor(name: string, cards: Card[], tokens: number) {
    this.name = name;
    this.cards = cards.sort((c1, c2) => c1.value - c2.value);
    this.tokens = tokens;
  }

  public get currentScore(): number {
    return GesjaaktGame.calculateScore(this.cards, this.tokens);
  }

  public toString(): string {
    return `
    ${this.name}. tokens: ${this.tokens}, score: ${this.currentScore}
    cards: [${this.cards.map((card: Card) => card.value).join(",")}]`;
  }
}
