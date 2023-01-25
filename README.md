# Gesjaakt
> Another fun game ruined by math

## Gesjaakt Rules

http://spelarch.vives.be/PDFspelregels/9119.pdf


## Create your own strategy
- Create a new file `src/gesjaakt/qers/<YourStrategy>.ts`
- Your class needs to extend `AbstractStrategy`, or just copy the amazing `IshaStrategy` and tweak it
- Just be nice and don't do any weird stuff in your `calculateMove()`

## Evaluate your strategy
- Visualize single games by adding it to `src/App.vue` and view it in the browser
- Run benchmarks by playing games against the same players `src/gesjaakt/benchmarks`
- Or create a tournament with `src/tournaments`
- Code Examples can be found in `src/tests`!

## FAQ

> I need helper method X / Can you add Y to `GesjaaktState`?

Sure, or you can do it yourself by opening a pull request!

> Can I cheat?

No

## Run it
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
