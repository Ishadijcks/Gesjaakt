import { describe, expect, it } from "vitest";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { DecentBenchmark } from "@/gesjaakt/benchmarks/DecentBenchmark";

describe("Benchmarks", () => {
  it("should simulate a tournament with really bad players", function () {
    // Arrange
    const player = new GesjaaktPlayer("Isha", new TokenValueStrategy(3));
    const benchmark = new DecentBenchmark(player, 1000);

    // Act
    const result = benchmark.simulate({
      randomizePlayerOrder: true,
      startingTokens: 11,
      discardedCards: 9,
      isTokenCountPublic: true,
      firstPlayerStarts: true,
      debug: false,
    });

    console.log(result.elos[0].join("\t"));
    console.log(result.elos[1].join("\t"));
    console.log(result.elos[2].join("\t"));

    // Assert
    expect(true).toBeFalsy();
  });
});
