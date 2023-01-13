import { AbstractBenchmark } from "@/gesjaakt/benchmarks/AbstractBenchmark";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";

export class DecentBenchmark extends AbstractBenchmark {
  constructor(player: GesjaaktPlayer, rounds: number = 100) {
    const opponents = [
      new GesjaaktPlayer("Take If Free", new TakeIfFreeStrategy()),
      new GesjaaktPlayer("Random 0.1", new RandomlyTakeStrategy(0.1)),
    ];
    super(player, opponents, rounds);
  }
}
