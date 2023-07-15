const getStockLevel = require("./../utils/getStock");

describe("test getStockLevel functionality", () => {
  test("should return correct calculated stock object", async () => {
    const sku = "KED089097/68/09";
    const stock = await getStockLevel(sku);

    expect(stock.qty).toBe(4842);
    expect(stock.sku).toBe(sku);
    expect(stock).toEqual({ qty: 4842, sku: "KED089097/68/09" });
  });

  test("should not return wrong qty or SKU string", async () => {
    const sku = "KED089097/68/09";
    const stock = await getStockLevel(sku);

    expect(stock.qty).not.toBe(400);
    expect(stock.sku).not.toBe("KEDU9097/99/99");
    expect(stock).not.toEqual({ qty: 300, sku: "KEDU9097/99/99" });
  });

  test("should throw error if sku does not exist", async () => {
    const sku = "KED089097/68/09BB";

    expect(getStockLevel(sku)).rejects.toEqual(
      "Oops!.. No transaction or stock found"
    );
  });

  test("should not throw error if sku exists", async () => {
    const sku = "KED089097/68/09";

    expect(getStockLevel(sku)).rejects.not.toEqual(
      "Oops!.. No transaction or stock found"
    );
  });
});
