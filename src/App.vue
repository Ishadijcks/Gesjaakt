<script setup lang="ts">
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { onUnmounted, ref, Ref } from "vue";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";
import { IshaStrategy } from "@/gesjaakt/qers/isha/IshaStrategy";
import TournamentBuilder from "@/components/TournamentBuilder.vue";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import TournamentViewer from "@/components/TournamentViewer.vue";
import GameViewer from "@/components/GameViewer.vue";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";

const allStrategies = [
  new TokenValueStrategy(3),
  new IshaStrategy(),
  new NeverTakeStrategy(),
  new RandomlyTakeStrategy(0.3),
  new RandomlyTakeStrategy(0.5),
  new TakeIfFreeStrategy(),
];

const activeTournament: Ref<Tournament | undefined> = ref();

const startTournament = (args: { tournament: Tournament; rounds: number }) => {
  clearTimeout(timeOut);
  maxRounds.value = args.rounds;
  roundsSimulated.value = 0;
  activeTournament.value = args.tournament;
  simulateRound();
};

let timeOut: ReturnType<typeof setTimeout>;
const roundsSimulated = ref(0);
const maxRounds = ref(0);
const simulateRound = () => {
  activeTournament.value?.simulateRound();
  roundsSimulated.value++;

  if (roundsSimulated.value >= maxRounds.value) {
    clearTimeout(timeOut);
    return;
  }
  timeOut = setTimeout(() => simulateRound());
};

onUnmounted(() => {
  clearTimeout(timeOut);
});
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <TournamentBuilder
      @startTournament="startTournament"
      :available-strategies="allStrategies"
    />
    <TournamentViewer
      v-if="activeTournament"
      :current-round="roundsSimulated"
      :max-rounds="maxRounds"
      :tournament="activeTournament"
    ></TournamentViewer>
    <GameViewer
      v-if="activeTournament?.currentGame"
      :game="activeTournament.currentGame"
    />
  </div>
</template>

<style scoped></style>
