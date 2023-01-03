<script setup lang="ts">
import { Card } from "@/gesjaakt/game/Card";

const props = defineProps<{
  card: Card;
}>();
</script>

<template>
  <div
    class="w-12 h-24 m-2 p-2 flex flex-col justify-center items-center"
    :style="'background-color:' + card.color + ';'"
  >
    <div class="text-3xl text-white">{{ card.value }}</div>
  </div>
</template>

<style scoped></style>
