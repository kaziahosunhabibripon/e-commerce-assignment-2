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

// Post save middleware for check product quantity is sufficient or not
orderSchema.pre<TOrder>("save", async function (next: NextFunction) {
  const order = this as TOrder;
  const product = await Product.findById({ _id: order.productId });
  if (!product) {
    throw new Error("Product not found");
  }
  let { inventory } = product;

  if (typeof inventory.quantity !== "number") {
    throw new Error("Invalid inventory value");
  }
  if (typeof inventory.inStock !== "number") {
    throw new Error("Invalid inventory value");
  }
  if (inventory.quantity < order.quantity) {
    throw new Error("Insufficient inventory");
  }

  // Calculate the new inventory after fulfilling the order
  const newInventory = inventory.quantity - order.quantity;

  // Update the product's inventory in the database
  await Product.updateOne(
    { _id: order.productId },
    {
      $set: { "inventory.quantity": newInventory },
      "inventory.inStock": newInventory > 0,
    }
  );

  console.log("Product inventory updated:", newInventory);

  next();
});

const Order = model<TOrder>("Order", orderSchema);

export default Order;
