import StockModel from "../models/StockModel";
const stockService = require("../services/stockService");

describe("test existing stock records", () => {
  test("should return correct stock object from database", async () => {
    const sku: string = "DTW874360/97/81";
    const stockModel = new StockModel(sku);
    const stock = stockModel.getStock();

    expect(stockModel).toBeInstanceOf(StockModel);
    expect(stock).toEqual({ stock: 270, sku });
  });

  test("should return undefined if stock object not found in database", async () => {
    const sku: string = "DTW874360/97/81BB";
    const stockModel = new StockModel(sku);
    const stock = stockModel.getStock();

    expect(stockModel).toBeInstanceOf(StockModel);
    expect(stock).toEqual(undefined);
  });
});
