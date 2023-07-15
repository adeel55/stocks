const fs = require("fs");

interface Transaction {
  sku: string;
  type: string;
  qty: number;
}

interface Stock {
  sku: string;
  stock: number;
}

interface StockQty {
  sku: string;
  qty: number;
}

/**
 * @param String skuInput
 * @returns Object { sku: string; qty: number; }
 */
module.exports = (skuInput: string): Promise<StockQty> => {
  return new Promise((resolve, reject) => {
    // read all transactions
    let transactionsBuffer = fs.readFileSync("src/data/transactions.json");
    let transactions = JSON.parse(transactionsBuffer);

    // read all stock values
    let stockBuffer = fs.readFileSync("src/data/stock.json");
    let stocks = JSON.parse(stockBuffer);

    // get all transactions matching with SKU
    const relatedTransactions = transactions.filter(
      ({ sku }: { sku: string }) => skuInput === sku
    );

    // get sold quantity of specific sku product from transaction
    const soldStock = relatedTransactions.reduce(
      (acc: number, transaction: Transaction) => {
        switch (transaction.type) {
          case "order":
            return acc + transaction.qty;
          case "refund":
            return acc - transaction.qty;
        }
      },
      0
    );

    // get existing stock level
    const stockData: Stock = stocks.find(
      ({ sku }: { sku: string }) => sku === skuInput
    );

    if (!stockData && !relatedTransactions.length) {
      reject(new Error("Oops!.. No transaction or stock found"));
    }

    /**
     * Deduct sold stock from the existing
     * stock level to get current stock level
     */

    const stockQty: StockQty = {
      sku: skuInput,
      qty: (stockData?.stock || 0) - soldStock,
    };

    resolve(stockQty);
  });
};
