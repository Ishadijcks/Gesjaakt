import type { PlayerState } from "@/gesjaakt/game/PlayerState";

export class GesjaaktResult {
  players: PlayerState[];
  winnerIndex: number;

  constructor(players: PlayerState[], winnerIndex: number) {
    this.players = players;
    this.winnerIndex = winnerIndex;
  }

  public get winner(): PlayerState {
    return this.players[this.winnerIndex];
  }

  public toString(): string {
    return `    ===========================
    The winner is ${this.winner.name} with ${this.winner.currentScore} points!
    ${this.players.map((player) => player.toString()).join("\n")}
    ===========================`;
  }
}
