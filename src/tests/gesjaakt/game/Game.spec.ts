import { describe, expect, it } from "vitest";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";

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
});
