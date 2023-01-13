import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import type { GesjaaktConfig } from "@/gesjaakt/game/GesjaaktConfig";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { Elo } from "@/util/Elo";
import type { BenchmarkResult } from "@/gesjaakt/benchmarks/BenchmarkResult";

export abstract class AbstractBenchmark {
  players: GesjaaktPlayer[];
  rounds: number;

  protected constructor(
    player: GesjaaktPlayer,
    opponents: GesjaaktPlayer[],
    rounds: number = 100
  ) {
    this.players = [player, ...opponents];
    this.rounds = rounds;
  }

  public simulate(config: GesjaaktConfig): BenchmarkResult {
    const wins = new Array(this.players.length).fill(0);
    const elos: number[][] = [];
    this.players.forEach((_) => {
      elos.push([]);
    });
    for (let i = 0; i < this.rounds; i++) {
      const game = new GesjaaktGame(this.players, config);
      const result = game.simulate();
      Elo.updatePlayerElo(result.winner, result.losers);

      console.log("Round", i, "won by", result.winner.name);

      // Update stats
      wins[this.players.indexOf(result.winner)]++;
      this.players.forEach((player, index) => {
        console.log(
          `Giving player ${index} ${player.name} an elo of ${player.elo}`
        );
        elos[index].push(player.elo);
      });
    }
    return {
      players: this.players,
      wins: wins,
      elos: elos,
    };
  }
}
