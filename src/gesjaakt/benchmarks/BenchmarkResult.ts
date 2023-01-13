import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";

export interface BenchmarkResult {
  players: GesjaaktPlayer[];
  elos: number[][];

  wins: number[];
}
