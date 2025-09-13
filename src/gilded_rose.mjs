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

export class Shop {
  constructor(items) {
    if (items === undefined) {
      this.items = [];
    } else {
      this.items = filterItems(items);
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // does not degrade and is not sold
      if (this.items[i].name === SULFURAS) {
        continue;
      }

      // update expirations
      this.items[i].sellIn = this.items[i].sellIn - 1;

      // not working as intended in requirements
      if (this.items[i].name === BACKSTAGE_PASSES) {
        this.items[i] = addQualityToBackstagePasses(this.items[i]);
      }

      if (this.items[i].name !== BACKSTAGE_PASSES && this.items[i].name !== AGED_BRIE) {
        this.items[i] = degrade(this.items[i]);
      }

      // not working as intended in requirements
      if (this.items[i].name === AGED_BRIE) {
        this.items[i] = addQualityToAgedBrie(this.items[i]);
      }

      if (this.items[i].quality > 50) {
        this.items[i].quality = 50;
      }
    }

    return this.items;
  }
}

// not working as intended in requirements
const addQualityToAgedBrie = (item) => {
  let newItem = { ...item };
  if (item.sellIn < 0) {
    newItem.quality = newItem.quality + 2;
  } else {
    newItem.quality = newItem.quality + 1;
  }
  return newItem;
};

// not working as intended in requirements
const addQualityToBackstagePasses = (item) => {
  let newItem = { ...item };
  newItem.quality = newItem.quality + 1;

  if (newItem.sellIn <= 10) {
    newItem.quality = newItem.quality + 1;
  }
  if (newItem.sellIn <= 5) {
    newItem.quality = newItem.quality + 1;
  }
  if (newItem.sellIn < 0) {
    newItem.quality = 0;
  }
  return newItem;
};

const degrade = (item) => {
  let degradeValue = -1;
  if (item.sellIn < 0) {
    degradeValue = -2;
  }
  let newQuality = item.quality + degradeValue;
  if (newQuality < 0) {
    newQuality = 0;
  }
  let newItem = { ...item, quality: newQuality };
  return newItem;
};

const filterItems = (items) => {
  let newItems = [];
  for (let item of items) {
    if (!(item instanceof Item)) {
      continue;
    }
    if (item.name === SULFURAS && item.quality !== 80) {
      continue;
    }
    if (item.name === SULFURAS && item.quality === 80) {
      newItems.push(item);
    }
    if (item.quality <= 50 && item.quality >= 0) {
      newItems.push(item);
    }
  }
  return newItems;
};
