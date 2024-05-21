import { Request, Response } from "express";
import orderSchema from "./order.validation";
import { OrderServices } from "./order.service";

// create a new order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const orderValidationData = orderSchema.parse(orderData);
    const result = await OrderServices.createOrder(orderValidationData);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error || "Woops! Order creation failed!",
      error: error.message,
    });
  }
};
// Get All Order Data
//
export const OrderController = {
  createOrder,
};
