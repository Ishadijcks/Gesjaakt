<script setup lang="ts">
import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { ref } from "vue";
import { Tournament } from "@/gesjaakt/tournaments/Tournament";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { Colors } from "@/util/Color";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";

const props = defineProps<{
  availableStrategies: AbstractStrategy[];
}>();

const rounds = ref(1000);
const tokens = ref(11);
const discardedCards = ref(9);
const turnDuration = ref(1000);

const checkedStrategies = ref(
  props.availableStrategies.map((_, index) => index)
);

const emit = defineEmits(["startTournament", "startGame"]);

const startTournament = () => {
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
  emit("startTournament", { tournament, rounds: rounds.value });
};

const startGame = () => {
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

  const game = new GesjaaktGame(players, {
    discardedCards: discardedCards.value,
    firstPlayerStarts: false,
    startingTokens: tokens.value,
    isTokenCountPublic: true,
    randomizePlayerOrder: true,
    debug: false,
  });

  emit("startGame", { game, turnDuration: turnDuration.value });
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
      <tr>
        <td>Turn duration (Single Game only)</td>
        <td>
          <input type="number" v-model="turnDuration" min="100" max="10000" />
        </td>
        <td>How long each turn takes (ms)</td>
      </tr>
    </table>

    <button class="p-4 bg-blue-300 border-2" @click="startTournament()">
      Start Tournament!
    </button>
    <button class="p-4 bg-green-300 border-2" @click="startGame()">
      Start Game!
    </button>
  </div>
</template>

<style scoped></style>
