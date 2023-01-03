<script setup lang="ts">
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import PlayerComponent from "@/components/PlayerComponent.vue";
import DeckComponent from "@/components/DeckComponent.vue";

const props = defineProps<{
  game: GesjaaktGame;
}>();

const start = () => {
  props.game.reset();
  setInterval(() => {
    if (!props.game.isGameOver()) {
      props.game.takeTurn();
    }
  }, 100);
};
</script>

<template>
  <button class="m-2 p-4 border" @click="start">Start</button>
  <div class="flex flex-row space-x-4">
    <div class="flex flex-col flex-grow space-y-2">
      <PlayerComponent
        v-for="(player, index) in game.players"
        :player="player"
        :key="player.name"
        :your-turn="game.currentPlayerIndex === index"
      ></PlayerComponent>
    </div>
    <DeckComponent
      :deck="game.deck"
      :card="game.drawnCard"
      class="w-64"
    ></DeckComponent>
  </div>
</template>

<style scoped></style>
