import { Card } from "@/gesjaakt/game/Card";
import { Random } from "@/util/Random";
import { GesjaaktError } from "@/gesjaakt/errors/GesjaaktError";
import { Colors } from "@/util/Color";

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

  public static createDefaultDeck(): Deck {
    const lowestCard = 3;
    const highestCard = 35;
    const colors = Colors.createHsvColorRange(
      40,
      320,
      1,
      1,
      highestCard - lowestCard + 1
    );
    console.log(colors.map((hsv) => Colors.toHex(Colors.toRgb(hsv))));
    const cards = [];
    for (let i = lowestCard; i <= highestCard; i++) {
      cards.push(
        new Card(i, Colors.toHex(Colors.toRgb(colors[i - lowestCard])))
      );
    }
    return new Deck(cards);
  }
}
