import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";

export class GesjaaktResult {
  players: GesjaaktPlayer[];
  private readonly _winnerIndex: number;

  constructor(players: GesjaaktPlayer[], winnerIndex: number) {
    this.players = players;
    this._winnerIndex = winnerIndex;
  }

  public get winner(): GesjaaktPlayer {
    return this.players[this._winnerIndex];
  }

  public get losers(): GesjaaktPlayer[] {
    return this.players.filter((player) => player.name != this.winner.name);
  }

  public toString(): string {
    return `    ===========================
    The winner is ${this.winner.name} with ${this.winner.currentScore} points!
    ${this.players.map((player) => player.toString()).join("\n")}
    ===========================`;
  }
}
