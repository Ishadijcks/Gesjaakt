import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";

export class AlwaysTakeStrategy extends AbstractStrategy {
  constructor() {
    super("AlwaysTake", "A basic strategy which always takes the card");
  }

  calculateMove(): GesjaaktAction {
    return GesjaaktAction.TakeCard;
  }
}
