export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    // loop through all items
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].quality > 0 &&
        this.items[i].name != "Sulfuras, Hand of Ragnaros" &&
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      if (this.items[i].quality < 50 && this.items[i].name === "Aged Brie") {
        this.items[i].quality = this.items[i].quality + 1;
      }

      if (this.items[i].quality < 50 && this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
        this.items[i].quality = this.items[i].quality + 1;
      }

      if (
        this.items[i].name === "Backstage passes to a TAFKAL80ETC concert" &&
        this.items[i].sellIn < 11 &&
        this.items[i].quality < 50
      ) {
        this.items[i].quality = this.items[i].quality + 1;
        if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }

      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn >= 0) {
        return this.items;
      }

      if (this.items[i].name === "Aged Brie" && this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1;
        return this.items;
      } else if (this.items[i].name === "Aged Brie" && this.items[i].quality >= 50) {
        return this.items;
      }

      if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
        this.items[i].quality = 0;
        return this.items;
      }

      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        return this.items;
      }

      if (this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
      }
    }

    return this.items;
  }
}
