import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import type { GesjaaktConfig } from "@/gesjaakt/game/GesjaaktConfig";
import { Random } from "@/util/Random";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { Elo } from "@/util/Elo";
import type { TournamentResult } from "@/gesjaakt/tournaments/TournamentResult";

export class Tournament {
  players: GesjaaktPlayer[];

  rounds: number;

  config: GesjaaktConfig;

  constructor(
    players: GesjaaktPlayer[],
    gesjaaktConfig: GesjaaktConfig,
    rounds: number
  ) {
    this.players = players;
    this.rounds = rounds;
    this.config = gesjaaktConfig;
  }

  public simulate(): TournamentResult {
    const wins: Record<string, number> = {};
    const plays: Record<string, number> = {};
    const elos: Record<string, number[]> = {};

    this.players.forEach((player) => {
      wins[player.name] = 0;
      plays[player.name] = 0;
      elos[player.name] = [];
    });

    for (let i = 0; i < this.rounds; i++) {
      const shuffledPlayers = Random.shuffle([...this.players]);
      const selectedPlayers = shuffledPlayers.slice(0, 3);

      const game = new GesjaaktGame(selectedPlayers, this.config);
      const result = game.simulate();
      Elo.updatePlayerElo(result.winner, result.losers);

      // Update stats
      wins[result.winner.name]++;
      selectedPlayers.forEach((player) => {
        console.log(`Giving player ${player.name} an elo of ${player.elo}`);
        elos[player.name].push(player.elo);
        plays[player.name]++;
      });
    }

    return {
      players: this.players,
      elos,
      plays,
      wins,
    };
  }
}
