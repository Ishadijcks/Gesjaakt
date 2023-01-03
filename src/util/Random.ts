export class Random {
  public static shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  /**
   * Return a random integer between min (inclusive) and max (exclusive)
   * @param min inclusive
   * @param max exclusive
   */
  static intBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
