"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TVariantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty(),
    value: zod_1.z.string().nonempty(),
});
const TInventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    inStock: zod_1.z.boolean(),
});
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string().min(1)),
    variants: zod_1.z.array(TVariantSchema),
    inventory: TInventorySchema,
});
exports.default = productSchema;
