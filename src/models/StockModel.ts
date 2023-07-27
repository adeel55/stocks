const fs = require("fs");
import { Stock } from "../interfaces/stock";

class StockModel {
  private sku: string;

  constructor(sku) {
    this.sku = sku;
  }

  /**
   * @param void
   * @returns stockQty: {sku, qty}
   */
  getStock(): Stock {
    // read all stock values
    let stockBuffer = fs.readFileSync("src/data/stock.json");
    const stocks = JSON.parse(stockBuffer) || [];
    if (this.sku) {
      return stocks.find(({ sku }: { sku: string }) => sku === this.sku);
    }
    return null;
  }
}

export default StockModel;
