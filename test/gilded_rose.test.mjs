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

  test(`item name is ${AGED_BRIE} with sellIn = 100 and quality = 100, returns the same items`, () => {
    const brie = new Item(AGED_BRIE, 100, 100);
    const gildedRose = new Shop([brie]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.deep.equal(brie);
  });

  test(`item name is ${AGED_BRIE} with sellIn = 0 and quality = 100, returns the same items`, () => {
    const brie = new Item(AGED_BRIE, 0, 100);
    const gildedRose = new Shop([brie]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.deep.equal(brie);
  });

  test(`item name is ${AGED_BRIE} with sellIn = 0 and quality = 50, returns the same items`, () => {
    const brie = new Item(AGED_BRIE, 0, 50);
    const gildedRose = new Shop([brie]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.deep.equal(brie);
  });

  test(`item name is NOT ${AGED_BRIE} with with sellIn =  100 and quality = 100,  -1 to quality`, () => {
    const gildedRose = new Shop([new Item(FOO, 100, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(FOO);
    expect(items[0].quality).to.equal(99);
  });
});
