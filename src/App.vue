<script setup lang="ts">
import GameComponent from "@/components/GameComponent.vue";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { reactive } from "vue";

const game = reactive(
  new GesjaaktGame(
    [
      new GesjaaktPlayer("Isha", new TokenValueStrategy(3)),
      new GesjaaktPlayer("Random 0.2", new TakeIfFreeStrategy()),
      new GesjaaktPlayer("Random 0.4", new TakeIfFreeStrategy()),
    ],
    {
      debug: true,
      startingTokens: 11,
      discardedCards: 9,
      isTokenCountPublic: true,
      randomizePlayerOrder: false,
      firstPlayerStarts: true,
    }
  )
);
</script>

<template>
  <div class="m-2 p-4 bg-red-300">Welcome</div>
  <GameComponent :game="game"></GameComponent>
</template>

<style scoped></style>
