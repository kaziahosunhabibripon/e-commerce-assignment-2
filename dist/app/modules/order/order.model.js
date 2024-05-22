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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_model_1 = require("../products/product.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    productId: {
        type: String,
        required: [true, "Product ID is required"],
    },
});
// Post save middleware for check product quantity is sufficient or not
orderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        const product = yield product_model_1.Product.findById({ _id: order.productId });
        if (!product) {
            throw new Error("Product not found");
        }
        const { inventory } = product;
        if (typeof inventory.quantity !== "number") {
            throw new Error("Invalid inventory value");
        }
        if (inventory.quantity < order.quantity) {
            product.inventory.inStock = false;
            // Update the product's inventory in the database
            yield product_model_1.Product.updateOne({ _id: order.productId }, {
                $set: { "inventory.inStock": false },
            });
            throw new Error(`Insufficient quantity available in inventory for product ${product.name}`);
        }
        // Calculate the new inventory after fulfilling the order
        const newInventory = inventory.quantity - order.quantity;
        // Update the product's inventory in the database
        yield product_model_1.Product.updateOne({ _id: order.productId }, {
            $set: { "inventory.quantity": newInventory },
            "inventory.inStock": newInventory > 0,
        });
        next();
    });
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
