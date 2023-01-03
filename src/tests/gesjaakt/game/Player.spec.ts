import { describe, expect, it } from "vitest";
import { Card } from "@/gesjaakt/game/Card";
import { GesjaaktPlayer } from "@/gesjaakt/game/GesjaaktPlayer";
import { AlwaysTakeStrategy } from "@/gesjaakt/strategies/AlwaysTakeStrategy";
import { DrawnCard } from "@/gesjaakt/game/DrawnCard";

describe("Player", () => {
  it("should sum the scores correctly for non-overlapping cards", function () {
    // Arrange
    const player = new GesjaaktPlayer("Dummy", new AlwaysTakeStrategy());
    player.takeCard(new DrawnCard(new Card(4, "red"), 0));
    player.takeCard(new DrawnCard(new Card(6, "red"), 0));
    player.takeCard(new DrawnCard(new Card(11, "red"), 0));

    // Act
    const score = player.currentScore();

    // Assert
    expect(score).toBe(4 + 6 + 11);
  });

  it("should sum the scores correctly for overlapping cards", function () {
    // Arrange
    const player = new GesjaaktPlayer("Dummy", new AlwaysTakeStrategy());
    player.takeCard(new DrawnCard(new Card(14, "red"), 0));
    player.takeCard(new DrawnCard(new Card(15, "red"), 0));
    player.takeCard(new DrawnCard(new Card(9, "red"), 0));
    player.takeCard(new DrawnCard(new Card(8, "red"), 0));
    player.takeCard(new DrawnCard(new Card(1, "red"), 0));
    player.takeCard(new DrawnCard(new Card(2, "red"), 0));
    player.takeCard(new DrawnCard(new Card(3, "red"), 0));

    // Act
    const score = player.currentScore();

    // Assert
    expect(score).toBe(14 + 8 + 1);
  });

  it("should take tokens into account", function () {
    // Arrange
    const player = new GesjaaktPlayer("Dummy", new AlwaysTakeStrategy());
    player.takeCard(new DrawnCard(new Card(4, "red"), 3));
    player.takeCard(new DrawnCard(new Card(6, "red"), 3));

    // Act
    const score = player.currentScore();

    // Assert
    expect(score).toBe(4 - 3 + 6 - 3);
  });
});
