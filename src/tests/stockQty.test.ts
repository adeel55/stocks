import stockService from "../services/stockService";
import { StockQty } from "../interfaces/stock";
import StockModel from "../models/StockModel";

describe("test stockService functionality", () => {
  test("should return correct calculated stock object", async () => {
    const sku = "KED089097/68/09";
    const stock: StockQty | Error = await stockService(sku);

    expect(stock).toEqual({ qty: 4842, sku: "KED089097/68/09" });
  });

  test("should not return wrong qty or SKU string", async () => {
    const sku = "KED089097/68/09";
    const stock = await stockService(sku);

    expect(stock).not.toEqual({ qty: 300, sku: "KEDU9097/99/99" });
  });

  test("should throw error if sku does not exist", async () => {
    const sku = "KED089097/68/09BB";

    await expect(stockService(sku)).rejects.toThrow(
      "Oops!.. No transaction or stock found"
    );
  });

  test("should not throw error if sku exists", async () => {
    const sku = "KED089097/68/09";

    await expect(stockService(sku)).resolves.not.toThrow(
      "Oops!.. No transaction or stock found"
    );
  });
});
