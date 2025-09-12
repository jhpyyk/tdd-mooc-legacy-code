import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const FOO = "foo";

describe("Gilded Rose ", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item(FOO, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(FOO);
  });

  test(`item name is ${AGED_BRIE} with quality is 100 and sellIn is 100, returns the same items`, () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 100, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
  });

  test(`item name is NOT ${AGED_BRIE} with quality is 100 and sellIn is 100,  -1 to quality`, () => {
    const gildedRose = new Shop([new Item(FOO, 100, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(FOO);
    expect(items[0].quality).to.equal(99);
  });
});
