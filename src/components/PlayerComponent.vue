<script setup lang="ts">
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import CardComponent from "@/components/CardComponent.vue";

const props = defineProps<{
  player: GesjaaktPlayer;
  yourTurn: boolean;
}>();
</script>

<template>
  <div
    class="flex flex-col h-36 p-2 bg-green-100 border-4 border-green-400 w-full"
    :class="{ 'bg-green-300': yourTurn }"
  >
    <div class="text-center">
      {{ player.name }} [{{ player.strategy.name }}] ({{
        player.tokens
      }}
      Tokens) [Score {{ player.currentScore() }}]
    </div>

    <div class="flex flex-row">
      <CardComponent
        :card="card"
        class=""
        v-for="card in player.cards"
        :key="card.value"
      >
      </CardComponent>
    </div>
  </div>
</template>

<style scoped></style>
