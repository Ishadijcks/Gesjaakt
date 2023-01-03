import { AbstractStrategy } from "@/gesjaakt/strategies/AbstractStrategy";
import { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";

export class NeverTakeStrategy extends AbstractStrategy {
  constructor() {
    super("NeverTake", "A basic strategy which never takes the card");
  }

  performMove(): GesjaaktAction {
    return GesjaaktAction.PlaceToken;
  }
}
