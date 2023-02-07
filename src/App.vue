<script setup lang="ts">
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { ref, Ref } from "vue";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";
import { IshaStrategy } from "@/gesjaakt/qers/IshaStrategy";
import TournamentBuilder from "@/components/TournamentBuilder.vue";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { AlwaysTakeStrategy } from "@/gesjaakt/strategies/AlwaysTakeStrategy";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import TournamentViewer from "@/components/TournamentViewer.vue";

const allStrategies = [
  new IshaStrategy(),
  new NeverTakeStrategy(),
  new AlwaysTakeStrategy(),
  new RandomlyTakeStrategy(0.5),
  new RandomlyTakeStrategy(0.8),
  new TakeIfFreeStrategy(),
];

const activeTournament: Ref<Tournament | undefined> = ref();

const startTournament = (tournament: Tournament) => {
  activeTournament.value = tournament;
  console.log(tournament);
};
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <tournament-builder
      @startTournament="startTournament"
      :available-strategies="allStrategies"
    />
    <tournament-viewer
      v-if="activeTournament"
      :tournament="activeTournament"
    ></tournament-viewer>
  </div>
</template>

<style scoped></style>
