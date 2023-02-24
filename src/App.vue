<script setup lang="ts">
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { onUnmounted, ref, Ref, computed } from "vue";
import TournamentBuilder from "@/components/TournamentBuilder.vue";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import TournamentViewer from "@/components/TournamentViewer.vue";
import GameViewer from "@/components/GameViewer.vue";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";

import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { BennyStrategy } from "@/gesjaakt/qers/benny/BennyStrategy";
import { BobStrategy } from "@/gesjaakt/qers/bob/BobStrategy";
import { ChrisStrategy } from "@/gesjaakt/qers/chris/ChrisStrategy";

const allStrategies = [
  new TokenValueStrategy(3),
  new NeverTakeStrategy(),
  new TakeIfFreeStrategy(),

  new BennyStrategy(),
  new BobStrategy(),
  new ChrisStrategy(),
];

const activeTournament: Ref<Tournament | undefined> = ref();
const activeGame: Ref<GesjaaktGame | undefined> = ref();

const startTournament = (args: { tournament: Tournament; rounds: number }) => {
  clearTimeout(timeOut);
  maxRounds.value = args.rounds;
  roundsSimulated.value = 0;
  activeTournament.value = args.tournament;
  simulateRound();
};

const startGame = (args: { game: GesjaaktGame; turnDuration: number }) => {
  clearTimeout(timeOut);
  activeGame.value = args.game;
  const interval = setInterval(() => {
    currentGame.value?.takeTurn();
    if (currentGame.value?.isGameOver()) {
      clearInterval(interval);
    }
  }, args.turnDuration ?? 1000);
};

const currentGame = computed(() => {
  return activeTournament.value?.currentGame ?? activeGame.value ?? null;
});

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
      @startGame="startGame"
      :available-strategies="allStrategies"
    />
    <TournamentViewer
      v-if="activeTournament"
      :current-round="roundsSimulated"
      :max-rounds="maxRounds"
      :tournament="activeTournament"
    ></TournamentViewer>
    <GameViewer v-if="currentGame" :game="currentGame" />
  </div>
</template>

<style scoped></style>
