export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

const addQualityToAgedBrie = (item) => {
  let newItem = { ...item };
  if (newItem.quality < 50) {
    newItem.quality = newItem.quality + 1;
  }
  return newItem;
};

const addQualityToBackstagePasses = (item) => {
  let newItem = { ...item };
  if (newItem.quality < 50) {
    newItem.quality = newItem.quality + 1;

    if (newItem.sellIn < 11 && newItem.quality < 50) {
      newItem.quality = newItem.quality + 1;
    }

    if (newItem.sellIn < 6 && newItem.quality < 50) {
      newItem.quality = newItem.quality + 1;
    }
  }
  return newItem;
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    // loop through all items
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === AGED_BRIE) {
        this.items[i] = addQualityToAgedBrie(this.items[i]);
      }

      if (this.items[i].name === BACKSTAGE_PASSES) {
        this.items[i] = addQualityToBackstagePasses(this.items[i]);
      }

      if (
        this.items[i].quality > 0 &&
        this.items[i].name != SULFURAS &&
        this.items[i].name != AGED_BRIE &&
        this.items[i].name != BACKSTAGE_PASSES
      ) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      if (this.items[i].name != SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn >= 0) {
        return this.items;
      }

      if (this.items[i].name === AGED_BRIE && this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1;
        return this.items;
      }

      if (this.items[i].name === AGED_BRIE && this.items[i].quality >= 50) {
        return this.items;
      }

      if (this.items[i].name === BACKSTAGE_PASSES) {
        this.items[i].quality = 0;
        return this.items;
      }

      if (this.items[i].name === SULFURAS) {
        return this.items;
      }

      if (this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
      }
    }

    return this.items;
  }
}
