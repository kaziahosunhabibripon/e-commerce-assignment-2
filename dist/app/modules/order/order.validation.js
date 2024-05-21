"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    price: zod_1.z.number().int().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.default = orderSchema;
