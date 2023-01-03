import { describe, expect, it } from "vitest";
import { Deck } from "@/gesjaakt/game/Deck";
import { Card } from "@/gesjaakt/game/Card";

describe("Deck", () => {
  it("should shuffle cards when instantiating the deck", function () {
    // Arrange
    const deck = new Deck([
      new Card(0, "red"),
      new Card(1, "red"),
      new Card(2, "red"),
      new Card(3, "red"),
      new Card(4, "red"),
      new Card(5, "red"),
      new Card(6, "red"),
      new Card(7, "red"),
    ]);

    // Act
    const isInTheSameOrder = deck.cards.every((card: Card, index: number) => {
      return card.value === index;
    });

    // Assert
    expect(isInTheSameOrder).toBe(false);
  });

  it("should throw an exception when trying to draw too many cards", function () {
    // Arrange
    const deck = new Deck([]);

    // Assert
    expect(() => deck.draw()).toThrowError("0 cards");
  });

  it("should draw cards continuously until empty", function () {
    // Arrange
    const deck = new Deck([
      new Card(0, "red"),
      new Card(1, "red"),
      new Card(2, "red"),
    ]);

    // Act
    const isEmptyBefore = deck.isEmpty();
    const first = deck.draw();
    const second = deck.draw();
    const third = deck.draw();
    const isEmptyAfter = deck.isEmpty();

    // Assert
    expect(isEmptyBefore).toBe(false);
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(third).not.toBeNull();
    expect(isEmptyAfter).toBe(true);
  });

  it("should reset to its original state", function () {
    // Arrange
    const deck = new Deck([new Card(0, "red")]);

    // Act
    deck.draw();
    deck.reset();

    // Assert
    expect(deck.cardsLeft).toBe(1);
  });

  it("should create a default deck with the right number of cards", function () {
    // Arrange
    const deck = Deck.createDefaultDeck();

    // Act
    const cards = deck.cardsLeft;

    // Assert
    expect(cards).toBe(35 - 3 + 1);
  });
});
