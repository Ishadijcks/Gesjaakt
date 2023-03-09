import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import { NeuralNet } from "@/gesjaakt/qers/danny/NeuralNet";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";

const NAME = "Danny";
const DESCRIPTION = "Powered by Cloud NFT Blockchain AI technology";
const VALUE_DELTA = 3;

type DannyStrategyProperties = {
  pointsDelta: number;
  scoreIncrease: number;
  cardValue: number;
  nextPlayerPointsDelta: number;
  nextPlayerScoreIncrease: number;
};

export type DannyStrategyConfig = {
  usedKeys: (keyof DannyStrategyProperties)[];
  layerSizes: number[];
  genes: number[];
};

export class DannyStrategy extends AbstractStrategy {
  brain: NeuralNet;
  config: DannyStrategyConfig;

  constructor(config?: DannyStrategyConfig, name?: string) {
    if (name) {
      super(name, DESCRIPTION);
    } else {
      super(NAME, DESCRIPTION);
    }

    if (!config) {
      this.config = {
        usedKeys: ["pointsDelta", "scoreIncrease", "nextPlayerPointsDelta"],
        layerSizes: [3, 4, 2],
        genes: [
          0.8337365707562858, 0.4657692260792343, 0.22280163846643664,
          0.2321707556739936, 0.27978061575851454, -0.7684728024463374,
          0.4445761721587096, -0.45573175048550985, 0.41939373962914983,
          -0.8346357595329055, -0.5977538638088191, 0.015507138953957167,
          0.6487236931346811, 0.7391580458854867, 0.21496120625757742,
          -0.8471562392064333, 0.7291150887044116, 0.8101971535622252,
          -0.7144319727874868, 0.04598647994668337, -0.5047212955807585,
          -0.8626682761386308, 0.9072999608003984, 0.18760859752930958,
          0.9407979439049301, 0.7179903346430572,
        ],
      };
    } else {
      this.config = config;
    }

    const layerSizes = this.config.layerSizes;
    const genes = this.config.genes;
    this.brain = new NeuralNet();
    this.brain.putWeights(layerSizes, genes);
  }

  initialize() {}

  reset() {}

  calculateMove(state: GesjaaktState): GesjaaktAction {
    const cardValue = state.drawnCard.card.value;
    const me = state.currentPlayer;

    const scoreIncrease = this.scoreIfTaking(state) - me.currentScore;

    const pointsDelta =
      this.scoreIfTaking(state) -
      state.currentPlayer.currentScore -
      VALUE_DELTA * state.drawnCard.tokens;

    const nextIndex = (state.currentTurnIndex + 1) % state.players.length;
    const nextPlayer = state.players[nextIndex];
    const nextPlayerScore = GesjaaktGame.calculateScore(
      [...nextPlayer.cards, state.drawnCard.card],
      nextPlayer.tokens + state.drawnCard.tokens
    );

    const nextPlayerPointsDelta =
      nextPlayerScore -
      nextPlayer.currentScore -
      VALUE_DELTA * (state.drawnCard.tokens + 1);

    const nextPlayerScoreIncrease = nextPlayerScore - nextPlayer.currentScore;

    const properties: DannyStrategyProperties = {
      pointsDelta,
      scoreIncrease,
      cardValue,
      nextPlayerPointsDelta,
      nextPlayerScoreIncrease,
    };

    const brainValue = this.brain.run(
      ...this.config.usedKeys.map((key) => properties[key])
    );

    if (brainValue[0] <= brainValue[1]) {
      return GesjaaktAction.TakeCard;
    } else {
      return GesjaaktAction.PlaceToken;
    }
  }
}
