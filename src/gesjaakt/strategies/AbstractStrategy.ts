import type { GesjaaktState } from "@/gesjaakt/game/GesjaaktState";
import type { GesjaaktAction } from "@/gesjaakt/game/GesjaaktAction";
import { GesjaaktGame } from "@/gesjaakt/game/GesjaaktGame";

/**
 * The base class to extend from when implementing your own strategy.
 *
 * Your strategy is persistent for a single game,
 * meaning you are able to keep track of other peoples moves and behaviour within your own strategy instance
 */
export abstract class AbstractStrategy {
  // Give it a cool name
  name: string;

  // Write a short explanation of your algorithm
  description: string;

  protected constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  /**
   * Process the game state and return an action to win the game!
   */
  public abstract calculateMove(state: GesjaaktState): GesjaaktAction;

  /**
   * Returns your new score if you would take the drawn card
   */
  public scoreIfTaking(state: GesjaaktState): number {
    return GesjaaktGame.calculateScore(
      [...state.currentPlayer.cards, state.drawnCard.card],
      state.currentPlayer.tokens
    );
  }
}
