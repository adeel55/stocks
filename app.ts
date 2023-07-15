const getStockLevel = require("./src/utils/getStock");

const skuInput = (process.env.SKU = "KED089097/68/09"); // default SKU value

const currentStock = getStockLevel(skuInput).then((currentStock) =>
  console.log(currentStock)
);
