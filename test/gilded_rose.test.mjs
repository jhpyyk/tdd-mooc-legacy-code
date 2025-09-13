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
// sellIn cases: 10, 5, 1, 0, -3
// quality cases: 50, 1, 0

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

    test(`${AGED_BRIE} and not item`, () => {
      const brie = new Item(AGED_BRIE, 15, 40);
      const notItem = "not item";
      const gildedRose = new Shop([brie, notItem]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 41));
      expect(items.length).to.equal(1);
    });

    test(`${AGED_BRIE} and not item`, () => {
      const brie = new Item(AGED_BRIE, 15, 40);
      const notItem = new Item("not item");
      const gildedRose = new Shop([brie, notItem]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 41));
      expect(items.length).to.equal(1);
    });

    test(`${AGED_BRIE} and false item`, () => {
      const brie = new Item(AGED_BRIE, 15, 40);
      const falseItem = new Item(AGED_BRIE, undefined, 40);
      const gildedRose = new Shop([brie, falseItem]);
      const items = gildedRose.updateQuality();
      expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 41));
      expect(items.length).to.equal(1);
    });
  });

  describe(`item name = ${AGED_BRIE} `, () => {
    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 11, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 1));
      });
    });

    describe("sellIn = 10 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 10, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 1));
      });
    });

    describe("sellIn = 5 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 5, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 5, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 1));
      });
    });

    describe("sellIn = 1 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 1, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 0, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 1, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 0, 1));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 0, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 0, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 2));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 0, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 0, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 2));
      });
    });
  });

  describe(`item name = ${BACKSTAGE_PASSES} `, () => {
    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 2));
      });
    });

    describe("sellIn = 10 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 2));
      });
    });

    describe("sellIn = 6 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 3));
      });
    });

    describe("sellIn = 5 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 5, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 5, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 3));
      });
    });

    describe("sellIn = 1 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 1, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 50));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 1, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 3));
      });
    });

    describe("sellIn = 0 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });
    });

    describe("sellIn = -3 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

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
    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 49));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 11, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 0));
      });
    });

    describe("sellIn = 10 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 10, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 49));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 0));
      });
    });

    describe("sellIn = 5 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 5, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 49));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 5, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 0));
      });
    });

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
});
