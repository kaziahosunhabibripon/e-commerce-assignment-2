"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const oderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        min: 0,
        max: 10000,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        trim: true,
        min: 0,
        max: 10000,
    },
});
exports.Order = (0, mongoose_1.model)("Order", oderSchema);
