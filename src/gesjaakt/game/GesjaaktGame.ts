import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import type { GesjaaktConfig } from "@/gesjaakt/game/GesjaaktConfig";
import { Deck } from "@/gesjaakt/game/Deck";
import { Random } from "@/util/Random";
import { DrawnCard } from "@/gesjaakt/game/DrawnCard";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";

export class GesjaaktGame {
  players: GesjaaktPlayer[];
  currentPlayerIndex: number;
  config: GesjaaktConfig;

  turnsTaken: number;

  drawnCard?: DrawnCard;

  deck: Deck;

  constructor(players: GesjaaktPlayer[], config: GesjaaktConfig) {
    this.players = players;
    this.config = config;

    this.currentPlayerIndex = 0;
    this.turnsTaken = 0;
    this.deck = Deck.createDefaultDeck();

    this.reset();
  }

  /**
   * Initialises the players and deck,
   */
  public reset(): void {
    if (this.config.randomizePlayerOrder) {
      this.players = Random.shuffle(this.players);
    }

    this.deck = Deck.createDefaultDeck();
    for (let i = 0; i < this.config.discardedCards; i++) {
      this.deck.draw();
    }

    this.players.forEach((player: GesjaaktPlayer) => {
      player.tokens = this.config.startingTokens;
    });

    this.currentPlayerIndex = this.config.firstPlayerStarts
      ? 0
      : Random.intBetween(0, this.players.length);
  }

  public simulate() {
    this.reset();

    while (!this.isGameOver()) {
      this.takeTurn();
      this.nextPlayer();
    }
    console.log("Game over");
  }

  public isGameOver(): boolean {
    return !this.drawnCard && this.deck.isEmpty();
  }

  public takeTurn(): void {
    if (!this.drawnCard) {
      this.drawnCard = new DrawnCard(this.deck.draw(), 0);
    }
    const currentPlayer = this.players[this.currentPlayerIndex];

    const state = this.getState();

    let action: GesjaaktAction;
    try {
      action = currentPlayer.calculateMove(state);
    } catch (e) {
      action = GesjaaktAction.TakeCard;
    }
    switch (action) {
      case GesjaaktAction.PlaceToken:
        currentPlayer.loseToken();
        this.drawnCard.addToken();
        return;
      case GesjaaktAction.TakeCard:
        currentPlayer.takeCard(this.drawnCard);
        break;
    }
  }

  public getState(): GesjaaktState {
    return new GesjaaktState(
      this.players.map((player: GesjaaktPlayer) => {
        return player.getState();
      }),
      this.currentPlayerIndex,
      this.drawnCard as DrawnCard,
      this.deck.cardsLeft
    );
  }

  public nextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }
}
