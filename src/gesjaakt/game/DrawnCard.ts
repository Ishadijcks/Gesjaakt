import type { Card } from "@/gesjaakt/game/Card";

export class DrawnCard {
  card: Card;
  tokens: number;

  constructor(card: Card, tokens: number) {
    this.card = card;
    this.tokens = tokens;
  }
}
