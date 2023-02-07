import { describe, expect, it } from "vitest";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";

describe("Tournament", () => {
  it("should let the best player win always*", function () {
    // Arrange
    const ROUNDS = 1000;
    const tournament = new Tournament(
      [
        new GesjaaktPlayer("Never", new NeverTakeStrategy()),
        new GesjaaktPlayer("TakeRandom 0.8", new RandomlyTakeStrategy(0.7)),
        new GesjaaktPlayer("TakeRandom 0.8", new RandomlyTakeStrategy(0.7)),
      ],
      {
        randomizePlayerOrder: true,
        startingTokens: 11,
        discardedCards: 9,
        isTokenCountPublic: true,
        firstPlayerStarts: true,
        debug: false,
      }
    );

    // Act
    const result = tournament.simulate(ROUNDS);

    // tournament.players.forEach((player) => {
    //   console.log(player.name + "\t", result.elos[player.name].join("\t"));
    // });

    // Assert
    expect(result.wins["Never"]).toBeGreaterThanOrEqual(0.99 * ROUNDS);
  });
});
