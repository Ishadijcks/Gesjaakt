import { describe, expect, it } from "vitest";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";

describe("Game", () => {
  it("should pass a basic smoke test of 3 players", function () {
    // Arrange
    const game = new GesjaaktGame(
      [
        new GesjaaktPlayer("Lvl 1 Noob", new RandomlyTakeStrategy(0.9)),
        new GesjaaktPlayer("Lvl 50 Crook", new RandomlyTakeStrategy(0.5)),
        new GesjaaktPlayer("Lvl 100 Boss", new NeverTakeStrategy()),
      ],
      {
        debug: true,
        startingTokens: 11,
        discardedCards: 0,
        isTokenCountPublic: true,
        randomizePlayerOrder: false,
        firstPlayerStarts: true,
        playerCount: 3,
      }
    );

    // Act
    const state = game.simulate();

    console.log(state.toString());
    // Assert
    expect(state.players[0].currentScore).lessThan(-100);
  });
});
