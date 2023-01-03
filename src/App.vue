<script setup lang="ts">
import GameComponent from "@/components/GameComponent.vue";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { TokenValueStrategy } from "@/gesjaakt/strategies/TokenValueStrategy";
import { NeverTakeStrategy } from "@/gesjaakt/strategies/NeverTakeStrategy";
import { reactive } from "vue";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";

const game = reactive(
  new GesjaaktGame(
    [
      new GesjaaktPlayer("Lvl 1 Noob", new TakeIfFreeStrategy()),
      new GesjaaktPlayer("Lvl 50 Crook", new TokenValueStrategy(2)),
      new GesjaaktPlayer("Lvl 0.5 Yolo", new RandomlyTakeStrategy(0.3)),
      new GesjaaktPlayer("Lvl 100 Boss", new NeverTakeStrategy()),
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
