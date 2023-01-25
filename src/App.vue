<script setup lang="ts">
import GameComponent from "@/components/GameComponent.vue";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { TakeIfFreeStrategy } from "@/gesjaakt/strategies/TakeIfFreeStrategy";
import { reactive } from "vue";
import { RandomlyTakeStrategy } from "@/gesjaakt/strategies/RandomlyTakeStrategy";
import { IshaStrategy } from "@/gesjaakt/qers/IshaStrategy";

const game = reactive(
  new GesjaaktGame(
    [
      new GesjaaktPlayer("Isha (pro)", new IshaStrategy()),
      new GesjaaktPlayer("Take if free", new TakeIfFreeStrategy()),
      new GesjaaktPlayer("Random 0.3", new RandomlyTakeStrategy(0.3)),
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
