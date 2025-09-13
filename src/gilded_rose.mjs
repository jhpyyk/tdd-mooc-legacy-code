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
  newItem.quality = newItem.quality + 1;

  if (newItem.quality > 50) {
    newItem.quality = 50;
  }
  return newItem;
};

const addQualityToBackstagePasses = (item) => {
  let newItem = { ...item };
  newItem.quality = newItem.quality + 1;

  if (newItem.sellIn <= 10) {
    newItem.quality = newItem.quality + 1;
  }

  if (newItem.sellIn <= 5) {
    newItem.quality = newItem.quality + 1;
  }

  if (newItem.quality > 50) {
    newItem.quality = 50;
  }
  return newItem;
};

const degrade = (item) => {
  let newItem = { ...item, quality: item.quality - 1 };
  return newItem;
};

const filterItems = (items) => {
  let newItems = [];
  for (let item of items) {
    if (item.quality <= 50 && item.quality >= 0) {
      newItems.push(item);
    }
  }
  return newItems;
};

export class Shop {
  constructor(items = []) {
    this.items = filterItems(items);
  }

  updateQuality() {
    // loop through all items
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === SULFURAS) {
        continue;
      }

      if (this.items[i].name === AGED_BRIE) {
        this.items[i] = addQualityToAgedBrie(this.items[i]);
      }

      if (this.items[i].name === BACKSTAGE_PASSES) {
        this.items[i] = addQualityToBackstagePasses(this.items[i]);
      }

      if (this.items[i].quality > 0 && this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES) {
        this.items[i] = degrade(this.items[i]);
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn >= 0) {
        continue;
      }

      if (this.items[i].name === AGED_BRIE && this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1;
        continue;
      }

      if (this.items[i].name === AGED_BRIE && this.items[i].quality >= 50) {
        continue;
      }

      if (this.items[i].name === BACKSTAGE_PASSES) {
        this.items[i].quality = 0;
        continue;
      }

      if (this.items[i].quality > 0) {
        this.items[i] = degrade(this.items[i]);
      }
    }

    return this.items;
  }
}
