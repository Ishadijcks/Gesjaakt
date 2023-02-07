import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import type { GesjaaktConfig } from "@/gesjaakt/game/GesjaaktConfig";
import { Random } from "@/util/Random";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { Elo } from "@/util/Elo";
import type { TournamentResult } from "@/gesjaakt/tournaments/TournamentResult";
import { GesjaaktError } from "@/gesjaakt/errors/GesjaaktError";

/**
 * A tournament takes any number of players, and repeatedly lets 3 of them play against each other
 */
export class Tournament {
  players: GesjaaktPlayer[];

  config: GesjaaktConfig;

  public readonly PLAYERS_PER_GAME = 3;

  wins: Record<string, number> = {};
  plays: Record<string, number> = {};
  elos: Record<string, number[]> = {};

  currentGame: GesjaaktGame | undefined;

  constructor(players: GesjaaktPlayer[], gesjaaktConfig: GesjaaktConfig) {
    if (players.length < this.PLAYERS_PER_GAME) {
      throw new GesjaaktError(
        `Cannot start a tournament with fewer than ${this.PLAYERS_PER_GAME} players`
      );
    }
    this.players = players;
    this.config = gesjaaktConfig;

    this.reset();
  }

  public reset(): void {
    this.wins = {};
    this.plays = {};
    this.elos = {};

    this.players.forEach((player) => {
      this.wins[player.name] = 0;
      this.plays[player.name] = 0;
      this.elos[player.name] = [];
    });
  }

  public simulateRound(): TournamentResult {
    const shuffledPlayers = Random.shuffle([...this.players]);
    const selectedPlayers = shuffledPlayers.slice(0, this.PLAYERS_PER_GAME);

    this.currentGame = new GesjaaktGame(selectedPlayers, this.config);
    const result = this.currentGame.simulate();
    Elo.updatePlayerElo(result.winner, result.losers);

    // Update stats
    this.wins[result.winner.name]++;
    selectedPlayers.forEach((player) => {
      // console.log(`Giving player ${player.name} an elo of ${player.elo}`);
      this.elos[player.name].push(player.elo);
      this.plays[player.name]++;
    });

    return this.getResult();
  }

  public simulate(rounds: number): TournamentResult {
    this.reset();

    for (let i = 0; i < rounds; i++) {
      this.simulateRound();
    }
    return this.getResult();
  }

  public getResult(): TournamentResult {
    return {
      players: this.players,
      elos: this.elos,
      plays: this.plays,
      wins: this.wins,
    };
  }
}
