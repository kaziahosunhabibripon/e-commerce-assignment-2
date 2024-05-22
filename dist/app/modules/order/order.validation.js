"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format").min(1, "Email is required"),
    price: zod_1.z
        .number()
        .positive("Price must be a positive number")
        .min(1, "Price is required"),
    quantity: zod_1.z
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity is required"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
exports.default = orderSchema;
