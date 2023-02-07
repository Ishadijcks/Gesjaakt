<script setup lang="ts">
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { computed, onMounted } from "vue";

const props = defineProps<{
  tournament: Tournament;
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

const simulateRound = () => {
  props.tournament.simulateRound();
  setTimeout(() => simulateRound());
};

onMounted(() => {
  simulateRound();
});
</script>

<template>
  <div class="bg-green-200 p-4 border-2 border-green-500 w-1/2">
    <table class="w-full">
      <tr>
        <th>Player</th>
        <th>Elo</th>
        <th>Wins</th>
      </tr>
      <tr v-for="player in players" :key="player.name">
        <td class="w-1/3">{{ player.name }}</td>
        <td class="w-1/3">{{ player.elo.toFixed(0) }}</td>
        <td class="w-1/3">
          {{ wins[player.name] }}/{{ plays[player.name] }} ({{
            ((wins[player.name] / plays[player.name]) * 100).toFixed(2)
          }}%)
        </td>
      </tr>
    </table>
  </div>
</template>
