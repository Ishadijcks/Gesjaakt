import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import type { GesjaaktConfig } from "@/gesjaakt/game/GesjaaktConfig";
import { Deck } from "@/gesjaakt/game/Deck";
import { Random } from "@/util/Random";
import { DrawnCard } from "@/gesjaakt/game/DrawnCard";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import { GesjaaktResult } from "@/gesjaakt/game/GesjaaktResult";
import type { Card } from "@/gesjaakt/game/Card";

export class GesjaaktGame {
  players: GesjaaktPlayer[];
  currentPlayerIndex: number;
  config: GesjaaktConfig;

  turnsTaken: number;

  drawnCard: DrawnCard | null = null;

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
      player.cards = [];
    });

    this.currentPlayerIndex = this.config.firstPlayerStarts
      ? 0
      : Random.intBetween(0, this.players.length);
  }

  /**
   * Check whether we still have the correct amount of cards and tokens in play
   */
  public validateGame(): void {
    const totalCards =
      this.players.reduce((sum, player) => sum + player.cards.length, 0) +
      this.deck.cardsLeft +
      (this.drawnCard != undefined ? 1 : 0);
    if (totalCards + this.config.discardedCards != 35 - 2) {
      console.error(totalCards, this.config.discardedCards);
      throw new Error("Invalid amount of cards");
    }
    const totalTokens =
      this.players.reduce((sum, player) => sum + player.tokens, 0) +
      (this.drawnCard != undefined ? this.drawnCard.tokens : 0);
    if (totalTokens != this.players.length * this.config.startingTokens) {
      console.error(totalTokens);
      throw new Error("Invalid amount of tokens");
    }
  }

  public simulate(): GesjaaktResult {
    this.reset();

    while (!this.isGameOver()) {
      // TODO remove for performance
      this.validateGame();

      this.takeTurn();
      this.turnsTaken++;
    }

    // Calculate the winner
    let winnerIndex = -1;
    let bestScore = Infinity;
    this.players.forEach((player: GesjaaktPlayer, index: number) => {
      if (player.currentScore() < bestScore) {
        bestScore = player.currentScore();
        winnerIndex = index;
      }
    });
    return new GesjaaktResult(this.players, winnerIndex);
  }

  public static calculateScore(cards: Card[], tokens: number): number {
    if (cards.length === 0) {
      return -tokens;
    }
    const filteredCards = cards.filter((card: Card, index: number) => {
      if (index === 0) {
        return true;
      }
      return card.value != cards[index - 1].value + 1;
    });
    const sum = filteredCards.reduce((sum: number, card: Card) => {
      return sum + card.value;
    }, 0);
    return sum - tokens;
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
      action = currentPlayer.calculateMove(state) ?? GesjaaktAction.TakeCard;
    } catch (e) {
      action = GesjaaktAction.TakeCard;
    }
    switch (action) {
      case GesjaaktAction.PlaceToken:
        if (this.config.debug) {
          console.log(
            `${currentPlayer.name} got ${this.drawnCard} and placed a token`
          );
        }
        currentPlayer.loseToken();
        this.drawnCard.addToken();
        this.nextPlayer();
        break;
      case GesjaaktAction.TakeCard:
        if (this.config.debug) {
          console.log(
            `${currentPlayer.name} got ${this.drawnCard} and took it`
          );
        }
        currentPlayer.takeCard(this.drawnCard);
        this.drawnCard = null;
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
