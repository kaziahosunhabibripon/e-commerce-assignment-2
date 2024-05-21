import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const inventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags must be provided "],
  },
  variants: {
    type: [variantSchema],
    required: [true, "Product variants are required"],
  },
  inventory: {
    type: inventorySchema,
    requiredPaths: ["quantity", "inStock"],
  },
});

export const Product = model<TProduct>("Product", productSchema);
