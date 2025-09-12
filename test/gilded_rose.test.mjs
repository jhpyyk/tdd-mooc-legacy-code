import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const FOO = "foo";

// sellIn edges: 11, 6, 0, does not change
// quality edges: 50, 0, changes

// item name cases: brie, bacstage, sulfuras, foo
// sellIn cases: 15, 11, 8, 3, 0, -3
// quality cases: 51, 50, 49, 1, 0, -1

describe("Gilded Rose ", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item(FOO, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(FOO);
  });

  describe(`item name = ${AGED_BRIE} `, () => {
    describe("sellIn = 15 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 15, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 15, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 15, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 15, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 15, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 15, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 0));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 11, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 11, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 11, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 11, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 11, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 11, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 0));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 8, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 8, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 8, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 8, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 8, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 8, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 0));
      });
    });

    describe("sellIn = 3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 3, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 3, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 3, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 3, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 3, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 2, 0));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 0, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 3));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 2));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 1));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(AGED_BRIE, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, -3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -4, 3));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 2));
      });

      test("quality = -1", () => {
        const brie = new Item(AGED_BRIE, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 1));
      });
    });
  });

  describe(`item name = ${BACKSTAGE_PASSES} `, () => {
    describe("sellIn = 15 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 0));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 1));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 0));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 3));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 2));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 1));
      });
    });

    describe("sellIn = 3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 4));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 3));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 3, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 2, 2));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, -3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -4, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });
    });
  });

  describe(`item name = ${SULFURAS} `, () => {
    describe("sellIn = 15 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 15, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 15, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 15, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, 15, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 15, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 15, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 15, -1));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 11, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 11, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 11, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, 11, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 11, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 11, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 11, -1));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 8, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 8, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 8, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, 8, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 8, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 8, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 8, -1));
      });
    });

    describe("sellIn = 3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 3, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 3, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 3, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, 3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 3, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 3, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 3, -1));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, 0, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, -1));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(SULFURAS, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 51));
      });

      test("quality = 50", () => {
        const brie = new Item(SULFURAS, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(SULFURAS, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 49));
      });

      test("quality = 1", () => {
        const brie = new Item(SULFURAS, -3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, -3, 1));
      });

      test("quality = 0", () => {
        const brie = new Item(SULFURAS, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(SULFURAS, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(SULFURAS, 0, -1));
      });
    });
  });

  describe(`item name = ${FOO} `, () => {
    describe("sellIn = 15 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 15, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 50));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 15, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 15, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 48));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 15, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 15, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 15, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, -1));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 11, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 50));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 11, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 11, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 48));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 11, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 11, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 11, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, -1));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 8, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 50));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 8, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 8, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 48));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 8, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 8, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 8, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, -1));
      });
    });

    describe("sellIn = 3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 3, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, 50));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 3, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 3, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, 48));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 3, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 3, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 2, -1));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 49));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 48));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 47));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 0, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, -1));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 51", () => {
        const brie = new Item(FOO, 0, 51);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 49));
      });

      test("quality = 50", () => {
        const brie = new Item(FOO, 0, 50);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 48));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 0, 49);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 47));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, -3, 1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -4, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 0, 0);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
      });

      test("quality = -1", () => {
        const brie = new Item(FOO, 0, -1);
        const gildedRose = new Shop([{ ...brie }]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, -1));
      });
    });
  });
});

const coverage = "36-45,56-62,64-65";
