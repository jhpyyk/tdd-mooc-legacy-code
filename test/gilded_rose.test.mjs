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
// sellIn cases: 15, 10, 8, 5, 1, 0, -3
// quality cases: (51), 50, 49, 2, 1, 0, (-1)

// quality case 51 removed after reading specs
// quality case -1 removed after reading specs

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
    describe("sellIn = 15 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 15, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 15, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 15, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 15, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 15, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 14, 1));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 11, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 11, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 11, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 10, 2));
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

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 10, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 10, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 10, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 9, 1));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 8, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 8, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 8, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 2));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 8, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 8, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 7, 1));
      });
    });

    describe("sellIn = 6 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 6, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 5, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 6, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 5, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 6, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 5, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 6, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 5, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(AGED_BRIE, 6, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 5, 1));
      });
    });

    describe("sellIn = 5 ", () => {
      test("quality = 50", () => {
        const brie = new Item(AGED_BRIE, 5, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 5, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 5, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 5, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 4, 2));
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

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 1, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 0, 50));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 1, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 0, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, 1, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, 0, 2));
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

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, 0, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 4));
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

      test("quality = 49", () => {
        const brie = new Item(AGED_BRIE, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -1, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(AGED_BRIE, -3, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -4, 4));
      });

      test("quality = 1", () => {
        const brie = new Item(AGED_BRIE, -3, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(AGED_BRIE, -4, 3));
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
    describe("sellIn = 15 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 3));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 2));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 15, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 14, 1));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 4));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 11, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 10, 3));
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

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 4));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 3));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 9, 2));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 4));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 3));
      });

      test("quality = 0", () => {
        const brie = new Item(BACKSTAGE_PASSES, 8, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 7, 2));
      });
    });

    describe("sellIn = 6 ", () => {
      test("quality = 50", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 50));
      });

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 5));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 6, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 5, 4));
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

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 5, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 5, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 5));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 5, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 4, 4));
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

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 1, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 50));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 1, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 5));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 1, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, 0, 4));
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

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 1);
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

      test("quality = 49", () => {
        const brie = new Item(BACKSTAGE_PASSES, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -1, 0));
      });

      test("quality = 2", () => {
        const brie = new Item(BACKSTAGE_PASSES, -3, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -4, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(BACKSTAGE_PASSES, -3, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(BACKSTAGE_PASSES, -4, 0));
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
    describe("sellIn = 15 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 15, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 15, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 15, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 15, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 15, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 14, 0));
      });
    });

    describe("sellIn = 11 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 11, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 11, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 11, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 11, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 10, 0));
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

      test("quality = 49", () => {
        const brie = new Item(FOO, 10, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 10, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 10, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 10, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 9, 0));
      });
    });

    describe("sellIn = 8 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 8, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 8, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 8, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 8, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 8, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 7, 0));
      });
    });

    describe("sellIn = 6 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 6, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 5, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 6, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 5, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 6, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 5, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 6, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 5, 0));
      });

      test("quality = 0", () => {
        const brie = new Item(FOO, 6, 0);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 5, 0));
      });
    });

    describe("sellIn = 5 ", () => {
      test("quality = 50", () => {
        const brie = new Item(FOO, 5, 50);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 49));
      });

      test("quality = 49", () => {
        const brie = new Item(FOO, 5, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 5, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 5, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 4, 0));
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

      test("quality = 49", () => {
        const brie = new Item(FOO, 1, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 0, 48));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 1, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 0, 1));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 1, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, 0, 0));
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

      test("quality = 49", () => {
        const brie = new Item(FOO, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 47));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, 0, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, 0, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 0));
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

      test("quality = 49", () => {
        const brie = new Item(FOO, 0, 49);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -1, 47));
      });

      test("quality = 2", () => {
        const brie = new Item(FOO, -3, 2);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -4, 0));
      });

      test("quality = 1", () => {
        const brie = new Item(FOO, -3, 1);
        const gildedRose = new Shop([brie]);
        const items = gildedRose.updateQuality();
        expect(items[0]).to.deep.equal(new Item(FOO, -4, 0));
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
