import { StockQty } from "../interfaces/stock";
import StockController from "../controllers/stockQtyController";

export default (sku: string): Promise<StockQty | Error> => {
  return new Promise((resolve, reject) => {
    const stockController = new StockController(sku);

    const stockQty: StockQty | Error = stockController.getAvailableStockQty();
    resolve(stockQty);
  });
};
