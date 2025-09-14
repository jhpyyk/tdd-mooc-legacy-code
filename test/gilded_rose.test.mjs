import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const FOO = "foo";

// sellIn edges: 10, 5, 0, changes
// quality edges: 50, 0, changes

// item name cases: brie, bacstage, sulfuras, foo

describe("Gilded Rose ", () => {
  test("empty", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(gildedRose.items).to.deep.equal([]);
    expect(items).to.deep.equal([]);
  });

  test("empty array", () => {
    const gildedRose = new Shop([]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("not an item", () => {
    const gildedRose = new Shop(["not an item"]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("over 50 quality should not be included", () => {
    const brie = new Item(AGED_BRIE, 15, 51);
    const gildedRose = new Shop([brie]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("negative quality should not be included", () => {
    const brie = new Item(AGED_BRIE, 15, -1);
    const gildedRose = new Shop([brie]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("undefined name should not be included", () => {
    const item = new Item(undefined, 15, 2);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("undefined sellIn should not be included", () => {
    const item = new Item(AGED_BRIE, undefined, 2);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("item quality 80 not sulfuras", () => {
    const item = new Item(AGED_BRIE, 15, 80);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  describe("two items ", () => {
    test(`${AGED_BRIE} and ${BACKSTAGE_PASSES}`, () => {
      const brie = new Item(AGED_BRIE, 15, 40);
      const pass = new Item(BACKSTAGE_PASSES, 15, 40);
      const gildedRose = new Shop([brie, pass]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 41));
      expect(items[1]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 41));
    });

    test(`${AGED_BRIE} and ${SULFURAS}`, () => {
      const brie = new Item(AGED_BRIE, 15, 40);
      const pass = new Item(SULFURAS, 15, 80);
      const gildedRose = new Shop([brie, pass]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 41));
      expect(items[1]).to.deep.equal(new Item(SULFURAS, 15, 80));
    });
  });

  describe(`item name = ${AGED_BRIE} `, () => {
    test.for([
      [5, 0, 4, 1],
      [1, 50, 0, 50],
      [1, 0, 0, 1],
      [0, 0, -1, 2],
      [-3, 0, -4, 2],
    ])("sellIn = %i, quality = %i, expected sellIn = %i, quality = %i", ([sellIn, quality, expSellIn, expQuality]) => {
      const item = new Item(AGED_BRIE, sellIn, quality);
      const gildedRose = new Shop([item]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, expSellIn, expQuality));
    });
  });
});

describe(`item name = ${BACKSTAGE_PASSES} `, () => {
  describe("sellIn = 11 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 11, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 2));
    });
  });

  describe("sellIn = 10 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 10, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 2));
    });
  });

  describe("sellIn = 6 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 6, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 3));
    });
  });

  describe("sellIn = 5 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 5, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 3));
    });
  });

  describe("sellIn = 1 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 1, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 3));
    });
  });

  describe("sellIn = 0 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 0, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
    });
  });

  describe("sellIn = -3 ", () => {
    test("quality = 0", () => {
      const brie = new Item(BACKSTAGE_PASSES, 0, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
    });
  });
});

describe(`item name = ${SULFURAS} `, () => {
  test("quality 40 is not added", () => {
    const item = new Item(SULFURAS, 50, 40);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("Only quality 80 allowed ", () => {
    const item = new Item(SULFURAS, 12, 80);
    const gildedRose = new Shop([item]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.deep.equal(new Item(SULFURAS, 12, 80));
  });
});

describe(`item name = ${FOO} `, () => {
  describe("sellIn = 1 ", () => {
    test("quality = 50", () => {
      const brie = new Item(FOO, 1, 50);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, 0, 49));
    });

    test("quality = 0", () => {
      const brie = new Item(FOO, 1, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, 0, 0));
    });
  });

  describe("sellIn = 0 ", () => {
    test("quality = 50", () => {
      const brie = new Item(FOO, 0, 50);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, -1, 48));
    });

    test("quality = 0", () => {
      const brie = new Item(FOO, 0, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
    });
  });

  describe("sellIn = -3 ", () => {
    test("quality = 50", () => {
      const brie = new Item(FOO, 0, 50);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, -1, 48));
    });

    test("quality = 0", () => {
      const brie = new Item(FOO, 0, 0);
      const gildedRose = new Shop([brie]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
    });
  });
});
