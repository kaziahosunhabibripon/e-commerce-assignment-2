import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";
import { NextFunction } from "express";
import { Product } from "../products/product.model";

const orderSchema = new Schema<TOrder>({
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
// Pre save middleware for check productId is valid or not
orderSchema.pre<TOrder>("save", async function (next: NextFunction) {
  const order = this as TOrder;

  const productExists = await Product.exists({ _id: order.productId });
  if (!productExists) {
    throw new Error("Invalid Product ID");
  }
  next();
});

const Order = model<TOrder>("Order", orderSchema);

export default Order;
