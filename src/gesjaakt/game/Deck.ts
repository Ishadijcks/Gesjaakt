import type { Card } from "@/gesjaakt/game/Card";
import { Random } from "@/util/Random";
import { GesjaaktError } from "@/gesjaakt/errors/GesjaaktError";

export class Deck {
  private readonly _originalCards: Card[];
  private _cards: Card[];

  constructor(cards: Card[]) {
    this._originalCards = [...cards];
    this._cards = Random.shuffle(cards);
  }

  public draw(): Card {
    if (this.isEmpty()) {
      throw new GesjaaktError("Cannot draw from a deck which has 0 cards left");
    }
    return this._cards.shift() as Card;
  }

  public reset(): void {
    this._cards = Random.shuffle(this._originalCards);
  }

  public isEmpty(): boolean {
    return this._cards.length === 0;
  }

  public get cardsLeft(): number {
    return this._cards.length;
  }

  public get cards(): Card[] {
    return this._cards;
  }
}
