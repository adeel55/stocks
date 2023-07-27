const fs = require("fs");
import Transaction from "../interfaces/transaction";

class TransactionModel {
  private sku;

  constructor(sku: string) {
    this.sku = sku;
  }

  /**
   * @param void
   * @returns stockQty: {sku, qty}
   */
  getTransactions(): Array<Transaction> {
    // read all transactions
    let transactionsBuffer = fs.readFileSync("src/data/transactions.json");
    const allTransactions = JSON.parse(transactionsBuffer) || [];

    if (this.sku) {
      // filter transactions matching with SKU
      return allTransactions.filter(
        ({ sku }: { sku: string }) => this.sku === sku
      );
    }

    return allTransactions;
  }
}

export default TransactionModel;
