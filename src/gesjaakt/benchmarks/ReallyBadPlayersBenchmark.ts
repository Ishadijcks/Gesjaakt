import { AbstractBenchmark } from "@/gesjaakt/benchmarks/AbstractBenchmark";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";

export class ReallyBadPlayersBenchmark extends AbstractBenchmark {
  constructor(
    player: GesjaaktPlayer,
    opponentCount: number = 2,
    rounds: number = 10000
  ) {
    const opponents = [];
    for (let i = 0; i < opponentCount; i++) {
      opponents.push(
        new GesjaaktPlayer(
          `RandomTake-${i}`,
          new RandomlyTakeStrategy(0.1 * (i + 1))
        )
      );
    }
    super(player, opponents, rounds);
  }
}
