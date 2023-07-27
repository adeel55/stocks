import stockService from "./src/services/stockService";

const sku = process.env.SKU || "KED089097/68/09"; // default SKU value

stockService(sku).then((currentStock) => console.log(currentStock));
