"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = __importDefault(require("./order.model"));
// create a new order service
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(payload.productId);
    if (!product) {
        throw new Error("Invalid Product ID");
    }
    const result = yield order_model_1.default.create(payload);
    return result;
});
// get all order service
const getAllOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (typeof email === "string") {
        query = { email: email };
    }
    const result = yield order_model_1.default.find(query);
    return result;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
};
