# Rules

## General

- The event will start Friday the 10th of February.
- Friday the 24th of February we will run the final tournament on the big screen. Please submit your code before 15:00
- The [rules of the game](http://spelarch.vives.be/PDFspelregels/9119.pdf), make sure to read them carefully, there are
  a few subtle details
- The winner gets an awesome prize*
- Working together is allowed. If you are not a programmer, you are encouraged to participate with someone who is!

Have fun!

## Participating

- Create a new file `src/gesjaakt/qers/<You>/<Your>Strategy.ts`
- Your class needs to extend `AbstractStrategy`, or just copy the amazing `IshaStrategy` and tweak it
- Initialize any information you need in `initialize()`
- Note that your strategy stays persistent for the duration of the tournament.
  You can override `reset()` to clear data between games if needed
- Add your strategy to `src/App.vue` and simulate tournaments in the browser
- Code Examples can be found in `src/tests`!

> Get this file to me somehow. Make a pull request, or send it over e-mail in secret, any way you like!

## Competition

For the final competition, all strategies will be entered into a single tournament.
Each game of the tournament **3** players will be chosen at random to play against each other.
All players start with an **Elo rating of 1000**, which will be updated at the result of each game.
The [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system#Theory) uses the parameters `D = 400`
and `K = 8`.

> Only the winner gains Elo rating, and both losers lose the same amount.
**Your final score in the game does not matter, only winning matters** (and participating, obviously)

The tournament will use the following config

```ts
const tournament = new Tournament(players, {
  discardedCards: 9,
  firstPlayerStarts: false,
  startingTokens: 11,
  isTokenCountPublic: true,
  randomizePlayerOrder: true,
  debug: false
});

tournament.simulateUntilPlayerHitsPlays(1000);
```

We will play until the first player reaches 1000 games played (subject to change based on the number of
participants).
Once this is reached, the top **3** highest Elo players will continue playing games against each other.
They will play in the format of **first to 10 game wins (difference of 2)**, after which we will have the ultimate
winner!

## Details

- Each of your moves is allowed 20ms of computation time.
  If your strategy fails to provide an action after this time, it will default to taking the card
- You are allowed one json file with configuration/training data/whatever. Maximum of 10000 lines after linting
  with [jsonlint](https://jsonlint.com/)
- No additional libraries/npm packages may be used
- It is forbidden to make any external requests (internet or otherwise)

## Fair Spirit

Remember that this is not an official event, and I am running this in my free time.
It is likely there is a technicality allowing you to completely ruin this event, please don't.
Let me know and I will fix it.

You strategy must make a "best effort" to win.
_Gesjaakt_ is a game which can be trivialized easily.
Always taking a card leads to the other players having a 50% chance of winning.
This does not mean silly strategies are not allowed, but if your strategy is similar to random actions, it might not be
ran in the final tournament.

Did you spot a bug in the implementation, or do you have a question about anything, send me a message on Slack!
