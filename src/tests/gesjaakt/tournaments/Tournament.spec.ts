import { describe, expect, it } from "vitest";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";

describe("Tournament", () => {
  it("should simulate a tournament with a list of players", function () {
    // Arrange
    const tournament = new Tournament(
      [
        new GesjaaktPlayer("Isha (pro)", new TokenValueStrategy(3)),
        new GesjaaktPlayer("TakeRandom 0.1", new RandomlyTakeStrategy(0.1)),
        new GesjaaktPlayer("TakeRandom 0.3", new RandomlyTakeStrategy(0.3)),
        new GesjaaktPlayer("TakeIfFree", new TakeIfFreeStrategy()),
        new GesjaaktPlayer("TakeNever", new NeverTakeStrategy()),
      ],
      {
        randomizePlayerOrder: true,
        startingTokens: 11,
        discardedCards: 9,
        isTokenCountPublic: true,
        firstPlayerStarts: true,
        debug: false,
      },
      1500
    );

    // Act
    const result = tournament.simulate();

    tournament.players.forEach((player) => {
      console.log(player.name + "\t", result.elos[player.name].join("\t"));
    });

    // Assert
    expect(true).toBeFalsy();
  });
});
