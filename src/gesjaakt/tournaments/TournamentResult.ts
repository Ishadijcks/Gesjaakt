import type { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";

export interface TournamentResult {
  players: GesjaaktPlayer[];
  elos: Record<string, number[]>;
  wins: Record<string, number>;
  plays: Record<string, number>;
}
