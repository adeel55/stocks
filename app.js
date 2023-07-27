"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stockService_1 = __importDefault(require("./src/services/stockService"));
const sku = process.env.SKU || "KED089097/68/09"; // default SKU value
(0, stockService_1.default)(sku).then((currentStock) => console.log(currentStock));
