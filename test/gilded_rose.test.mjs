import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie";

describe("Gilded Rose ", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  test(`item name is ${AGED_BRIE} with quality >= 50 and sellIn >= 0, returns the same items`, () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
  });
});
