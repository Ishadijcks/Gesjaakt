export interface GesjaaktConfig {
  debug: boolean;

  startingTokens: number;

  // Whether you can see the amount of tokens other players have
  isTokenCountPublic: boolean;

  // How many cards are discarded at the start of the game
  discardedCards: number;

  // Shuffle the players between each round
  randomizePlayerOrder: boolean;

  // Does the first player always start or does a random player start?
  firstPlayerStarts: boolean;
}
