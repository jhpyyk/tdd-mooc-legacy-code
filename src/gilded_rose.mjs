export class Item {
  constructor(name, sellIn, quality, conjured = false) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.conjured = conjured;
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

      this.items[i] = degrade(this.items[i]);

      // Stryker disable next-line EqualityOperator; Does not matter if it is < or <=
      if (this.items[i].quality > 50) {
        this.items[i].quality = 50;
      }

      // Stryker disable next-line EqualityOperator; Does not matter if it is < or <=
      if (this.items[i].quality < 0) {
        this.items[i].quality = 0;
      }
    }

    return this.items;
  }
}

const calculatePassQualityAdd = (pass) => {
  if (pass.sellIn < 0) {
    return 0;
  }
  if (pass.sellIn <= 5) {
    return 3;
  }
  if (pass.sellIn <= 10) {
    return 2;
  }
  return 1;
};

const degrade = (item) => {
  let degradeValue = -1;
  if (item.sellIn < 0) {
    degradeValue = -2;
  }
  if (item.name === AGED_BRIE) {
    degradeValue = -1 * degradeValue;
  }
  if (item.name === BACKSTAGE_PASSES) {
    degradeValue = calculatePassQualityAdd(item);
  }
  if (item.conjured === true) {
    degradeValue = degradeValue * 2;
  }

  let newQuality = item.quality + degradeValue;
  let newItem = { ...item, quality: newQuality };
  return newItem;
};

const filterItems = (items) => {
  let newItems = [];
  for (let item of items) {
    if (item.sellIn === undefined || item.name === undefined) {
      continue;
    }
    if (item.name === SULFURAS && item.quality === 80) {
      newItems.push(item);
      continue;
    }
    if (item.name === SULFURAS) {
      continue;
    }
    if (item.quality > 50 || item.quality < 0) {
      continue;
    }
    newItems.push(item);
  }
  return newItems;
};
