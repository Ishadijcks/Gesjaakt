<script setup lang="ts">
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { computed } from "vue";

const props = defineProps<{
  tournament: Tournament;
  maxRounds?: number;
  currentRound?: number;
}>();

const players = computed(() => {
  return props.tournament.players;
});

const wins = computed(() => {
  return props.tournament.wins;
});

const plays = computed(() => {
  return props.tournament.plays;
});

const matrix = computed(() => {
  return props.tournament.matrix;
});

const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => b.elo - a.elo);
});

const percentage = (elo: number) => {
  const maxElo = Math.max(...players.value.map((player) => player.elo));
  return (elo / maxElo) * 100;
};
</script>

<template>
  <div class="bg-green-200 p-4 border-2 border-green-500 w-1/2">
    <table class="w-full">
      <tr>
        <th>Player</th>
        <th>Elo</th>
        <th>Wins</th>
      </tr>
      <tr v-for="player in sortedPlayers" :key="player.name">
        <td class="w-1/3">{{ player.name }}</td>
        <td class="w-1/3">
          <div
            :style="`
            width: ${percentage(player.elo)}%;
            background-color: ${player.color};
            `"
          >
            {{ player.elo.toFixed(0) }}
          </div>
        </td>
        <td class="w-1/3">
          {{ wins[player.name] }}/{{ plays[player.name] }} ({{
            ((wins[player.name] / plays[player.name]) * 100).toFixed(2)
          }}%)
        </td>
      </tr>
    </table>

    <table class="w-full">
      <tr>
        <th>{{ currentRound }}/{{ maxRounds }}</th>
        <th v-for="player in players" :key="player.name">{{ player.name }}</th>
      </tr>
      <tr v-for="player in players" :key="player.name">
        <td>{{ player.name }}</td>
        <td
          v-for="opp in players"
          :key="opp.name"
          :title="`
          ${matrix[player.name][opp.name].wins}/
          ${matrix[player.name][opp.name].plays}
          `"
        >
          {{
            opp.name === player.name
              ? "-"
              : (
                  (matrix[player.name][opp.name].wins /
                    matrix[player.name][opp.name].plays) *
                  100
                ).toFixed(0) + "%"
          }}
        </td>
      </tr>
    </table>
  </div>
</template>
