import Transaction from "../interfaces/transaction";
import { Stock, StockQty } from "../interfaces/stock";
import StockModel from "../models/StockModel";
import TransactionModel from "../models/TransactionsModel";

class StockController {
  private sku: string;
  private soldStock: number;
  private skuStock: Stock;
  private skuTransactions: Array<Transaction>;

  constructor(sku) {
    this.sku = sku;
  }

  /**
   * @param transactions Array
   * @returns soldStock: number
   */
  getSoldStock(transactions): number {
    // get sold quantity of specific sku product from transaction
    return transactions.reduce((acc: number, transaction: Transaction) => {
      switch (transaction.type) {
        case "order":
          return acc + transaction.qty;
        case "refund":
          return acc - transaction.qty;
      }
    }, 0);
  }

  /**
   * @param void
   * @returns stockQty: {sku, qty}
   */
  getAvailableStockQty(): StockQty | Error {
    const transactionModel = new TransactionModel(this.sku);
    const stockModel = new StockModel(this.sku);
    this.skuTransactions = transactionModel.getTransactions();
    this.soldStock = this.getSoldStock(this.skuTransactions);
    this.skuStock = stockModel.getStock();

    if (!this.skuStock && !this.skuTransactions.length) {
      throw new Error("Oops!.. No transaction or stock found");
    }

    /**
     * Deduct sold stock from the existing
     * stock level to get current stock level
     */

    const stockQty: StockQty = {
      sku: this.sku,
      qty: (this.skuStock?.stock || 0) - this.soldStock,
    };

    return stockQty;
  }
}

export default StockController;
