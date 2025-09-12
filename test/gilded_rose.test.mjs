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

  describe(`item name is ${AGED_BRIE} with`, () => {
    test(`sellIn = 100 and quality = 100, changes ${AGED_BRIE} sellIn -1`, () => {
      const brie = new Item(AGED_BRIE, 100, 100);
      const gildedRose = new Shop([{ ...brie }]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 99, 100));
    });

    test(`sellIn = 100 and quality = 25, changes ${AGED_BRIE} sellIn -1 and quality +1`, () => {
      const brie = new Item(AGED_BRIE, 100, 25);
      const gildedRose = new Shop([{ ...brie }]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 99, 26));
    });
  });

  describe(`item name is NOT ${AGED_BRIE} with with `, () => {
    test(`item name is NOT ${AGED_BRIE} with with sellIn =  100 and quality = 100, changes sellIn -1 and quality -1`, () => {
      const gildedRose = new Shop([new Item(FOO, 100, 100)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, 99, 99));
    });
  });
});

const coverage = "36-45,56-62,64-65";
