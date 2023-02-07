<script setup lang="ts">
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import PlayerComponent from "@/components/PlayerComponent.vue";
import DeckComponent from "@/components/DeckComponent.vue";

const props = defineProps<{
  game: GesjaaktGame;
}>();
</script>

<template>
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
