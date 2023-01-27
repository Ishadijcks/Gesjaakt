import { describe, expect, it } from "vitest";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { Card } from "@/gesjaakt/game/Card";

describe("Game", () => {
  it("should pass a basic smoke test of 3 players", function () {
    // Arrange
    const game = new GesjaaktGame(
      [
        new GesjaaktPlayer("Lvl 1 Noob", new TakeIfFreeStrategy()),
        new GesjaaktPlayer("Lvl 50 Crook", new TokenValueStrategy(3)),
        new GesjaaktPlayer("Lvl 100 Boss", new NeverTakeStrategy()),
      ],
      {
        debug: true,
        startingTokens: 11,
        discardedCards: 9,
        isTokenCountPublic: true,
        randomizePlayerOrder: false,
        firstPlayerStarts: true,
      }
    );

    // Act
    const state = game.simulate();

    console.log(state.toString());

    // Assert
    expect(state.winner).not.toBeNull();
  });

  it("should calculate the correct score for standalone cards", function () {
    // Arrange
    const cards = [
      new Card(4, "red"),
      new Card(6, "red"),
      new Card(10, "red"),
      new Card(21, "red"),
    ];

    // Act
    const score = GesjaaktGame.calculateScore(cards, 0);

    // Assert
    expect(score).toEqual(41);
  });

  it("should calculate the correct score for series of cards", function () {
    // Arrange
    const cards = [
      new Card(13, "red"),
      new Card(15, "red"),
      new Card(16, "red"),
    ];

    // Act
    const score = GesjaaktGame.calculateScore(cards, 0);

    // Assert
    expect(score).toEqual(28);
  });

  it("should calculate the correct score including tokens", function () {
    // Arrange
    const cards = [
      new Card(3, "red"),
      new Card(7, "red"),
      new Card(8, "red"),
      new Card(10, "red"),
      new Card(14, "red"),
      new Card(15, "red"),
      new Card(16, "red"),
      new Card(25, "red"),
    ];
    const tokens = 8;

    // Act
    const score = GesjaaktGame.calculateScore(cards, tokens);

    // Assert
    expect(score).toEqual(51);
  });
});
