import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const FOO = "foo";

// sellIn edges: 11, 6, 0
// quality edges: 50, 0

// item name cases: brie, bacstage, sulfuras, foo
// sellIn cases: 15, 11, 8, 3, 0, -3
// quality cases: 60, 50, 25, 0, -10

describe("Gilded Rose ", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item(FOO, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(FOO);
  });

  describe(`item name = ${AGED_BRIE} `, () => {
    describe("sellIn = 15 ", () => {
      test("quality = 60", () => {
        const brie = new Item(AGED_BRIE, 15, 60);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 60));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 15, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 50));
      });
    });
  });
});

const coverage = "36-45,56-62,64-65";
