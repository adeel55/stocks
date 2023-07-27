import TransactionsModel from "../models/TransactionsModel";

const transactionsData = [
  { sku: "HPX415896/42/97", type: "order", qty: 5 },
  { sku: "HPX415896/42/97", type: "order", qty: 10 },
  { sku: "HPX415896/42/97", type: "order", qty: 9 },
  { sku: "HPX415896/42/97", type: "order", qty: 5 },
  { sku: "HPX415896/42/97", type: "order", qty: 9 },
  { sku: "HPX415896/42/97", type: "order", qty: 4 },
  { sku: "HPX415896/42/97", type: "order", qty: 6 },
  { sku: "HPX415896/42/97", type: "order", qty: 10 },
  { sku: "HPX415896/42/97", type: "order", qty: 0 },
  { sku: "HPX415896/42/97", type: "order", qty: 7 },
  { sku: "HPX415896/42/97", type: "order", qty: 9 },
];

describe("test transactions from database", () => {
  test("should return all transactions from database related to SKU", async () => {
    const sku: string = "HPX415896/42/97";
    const transactionsModel = new TransactionsModel(sku);
    const transactions = transactionsModel.getTransactions();

    expect(transactionsModel).toBeInstanceOf(TransactionsModel);
    expect(transactions).toEqual(transactionsData);
  });

  test("should return empty array if no transaction match with SKU ", async () => {
    const sku: string = "HPX415896/42/97BB";
    const transactionsModel = new TransactionsModel(sku);
    const stock = transactionsModel.getTransactions();

    expect(transactionsModel).toBeInstanceOf(TransactionsModel);
    expect(stock).toEqual([]);
  });
});
