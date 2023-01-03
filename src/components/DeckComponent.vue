<script setup lang="ts">
import CardComponent from "@/components/CardComponent.vue";
import { Deck } from "@/gesjaakt/game/Deck";
import { DrawnCard } from "@/gesjaakt/game/DrawnCard";

const props = defineProps<{
  deck: Deck;
  card: DrawnCard;
}>();
</script>

<template>
  <div class="flex flex-row h-48 bg-purple-100 p-2 border-4 border-purple-400">
    <div v-if="card">
      <CardComponent :card="card.card"></CardComponent>
      <span>Tokens: {{ card.tokens }}</span>
    </div>
  </div>
</template>

<style scoped></style>
