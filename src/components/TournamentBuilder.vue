<script setup lang="ts">
import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { ref } from "vue";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { Colors } from "@/util/Color";

const props = defineProps<{
  availableStrategies: AbstractStrategy[];
}>();

const rounds = ref(1000);
const tokens = ref(11);
const discardedCards = ref(9);

const checkedStrategies = ref(
  props.availableStrategies.map((_, index) => index)
);

const emit = defineEmits(["startTournament"]);

const start = () => {
  const strategies = checkedStrategies.value.map(
    (index) => props.availableStrategies[index]
  );

  const colors = Colors.createHsvColorRange(
    40,
    320,
    1,
    1,
    strategies.length + 1
  ).map((hsv) => Colors.toHex(Colors.toRgb(hsv)));

  const players = strategies.map((strategy, index) => {
    return new GesjaaktPlayer(strategy.name, strategy, colors[index]);
  });
  const tournament = new Tournament(players, {
    discardedCards: discardedCards.value,
    firstPlayerStarts: false,
    startingTokens: tokens.value,
    isTokenCountPublic: true,
    randomizePlayerOrder: true,
    debug: false,
  });
  emit("startTournament", tournament);
};
</script>

<template>
  <div class="bg-red-200 p-4 border-2 border-red-500 w-1/2">
    <table class="w-full">
      <tr>
        <th>Strategy</th>
        <th>Description</th>
        <th>Include</th>
      </tr>
      <tr v-for="(strategy, index) in availableStrategies" :key="strategy.name">
        <td>{{ strategy.name }}</td>
        <td>{{ strategy.description }}</td>
        <td>
          <input type="checkbox" :value="index" v-model="checkedStrategies" />
        </td>
      </tr>
    </table>

    <hr class="border-red-500" />

    <table class="w-full">
      <tr>
        <td>Games</td>
        <td><input type="number" v-model="rounds" min="100" max="10000" /></td>
        <td>How many games are played in total</td>
      </tr>
      <tr>
        <td>Starting tokens</td>
        <td><input type="number" v-model="tokens" min="5" max="20" /></td>
        <td>How many tokens each player starts with</td>
      </tr>
      <tr>
        <td>Discarded cards</td>
        <td>
          <input type="number" v-model="discardedCards" min="3" max="32" />
        </td>
        <td>How many cards are discarded after shuffling the deck</td>
      </tr>
    </table>

    <button class="p-4 border-2" @click="start()">Start!</button>
  </div>
</template>

<style scoped></style>
