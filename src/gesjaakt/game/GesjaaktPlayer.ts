import type { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import type { Card } from "@/gesjaakt/game/Card";
import type { DrawnCard } from "@/gesjaakt/game/DrawnCard";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import { PlayerState } from "@/gesjaakt/game/PlayerState";

export class GesjaaktPlayer {
  name: string;
  strategy: AbstractStrategy;
  elo: number = 1000;

  cards: Card[];
  tokens: number;

  constructor(name: string, strategy: AbstractStrategy) {
    this.name = name;
    this.strategy = strategy;
    this.cards = [];
    this.tokens = 0;
  }

  public calculateMove(state: GesjaaktState): GesjaaktAction {
    return this.tokens === 0
      ? GesjaaktAction.TakeCard
      : this.strategy.calculateMove(state);
  }

  public takeCard(card: DrawnCard) {
    this.cards.push(card.card);
    this.cards.sort((a: Card, b: Card) => a.value - b.value);
    this.tokens += card.tokens;
  }

  /**
   * Calculates your current score by summing cards and subtracting tokens.
   *
   * You want a score as low as possible
   */
  public currentScore(): number {
    if (this.cards.length === 0) {
      return -this.tokens;
    }
    const filteredCards = this.cards.filter((card: Card, index: number) => {
      if (index === 0) {
        return true;
      }
      return card.value != this.cards[index - 1].value + 1;
    });
    const sum = filteredCards.reduce((sum: number, card: Card) => {
      return sum + card.value;
    }, 0);
    return sum - this.tokens;
  }

  public loseToken(): void {
    this.tokens--;
  }

  public getState(): PlayerState {
    return new PlayerState(this.name, this.cards, this.tokens);
  }
}
