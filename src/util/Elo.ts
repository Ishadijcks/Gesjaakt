import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";

export class Elo {
  public static readonly D = 400;
  public static readonly K = 32;

  public static updatePlayerElo(
    winner: GesjaaktPlayer,
    losers: GesjaaktPlayer[]
  ) {
    const players = [winner, ...losers];
    let totalWinnerDelta = 0;
    losers.forEach((loser) => {
      const [winnerDelta, loserDelta] = this.calculateElo(
        winner.elo,
        loser.elo
      );
      totalWinnerDelta += winnerDelta / (players.length - 1);
      console.log(loser.name, "loses", loserDelta);
      loser.elo += loserDelta / (players.length - 1);
    });
    winner.elo += totalWinnerDelta;
    console.log(winner.name, "gains", totalWinnerDelta);
  }

  public static calculateElo(winner: number, loser: number): [number, number] {
    const eWinner = 1 / (1 + Math.pow(10, (loser - winner) / this.D));
    const eLoser = 1 / (1 + Math.pow(10, (winner - loser) / this.D));

    const winnerDelta = this.K * (1 - eWinner);
    const loserDelta = this.K * (0 - eLoser);

    return [winnerDelta, loserDelta];
  }
}
