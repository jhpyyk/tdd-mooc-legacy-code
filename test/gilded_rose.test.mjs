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

      test("quality = 25", () => {
        const brie = new Item(AGED_BRIE, 15, 25);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 26));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 15, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 1));
      });

      test("quality = -10", () => {
        const brie = new Item(AGED_BRIE, 15, -10);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, -9));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 60", () => {
        const brie = new Item(AGED_BRIE, 11, 60);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 60));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 11, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 25", () => {
        const brie = new Item(AGED_BRIE, 11, 25);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 26));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 11, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 1));
      });

      test("quality = -10", () => {
        const brie = new Item(AGED_BRIE, 11, -10);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, -9));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 60", () => {
        const brie = new Item(AGED_BRIE, 8, 60);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 60));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 8, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 50));
      });

      test("quality = 25", () => {
        const brie = new Item(AGED_BRIE, 8, 25);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 26));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 8, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 1));
      });

      test("quality = -10", () => {
        const brie = new Item(AGED_BRIE, 8, -10);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, -9));
      });
    });

    describe("sellIn = 3 ", () => {
      test("quality = 60", () => {
        const brie = new Item(AGED_BRIE, 3, 60);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 60));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 3, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 50));
      });

      test("quality = 25", () => {
        const brie = new Item(AGED_BRIE, 3, 25);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 26));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 3, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 1));
      });

      test("quality = -10", () => {
        const brie = new Item(AGED_BRIE, 3, -10);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, -9));
      });
    });
  });
});

const coverage = "36-45,56-62,64-65";
