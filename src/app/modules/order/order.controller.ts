import { Request, Response } from "express";
import orderSchema from "./order.validation";
import { OrderServices } from "./order.service";
import { unknown } from "zod";

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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    if (typeof req.query.email === "string") {
      const email = req.query.email;
      const result = await OrderServices.getAllOrders(email);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrders(null);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error || "Order Not Found!",
      error: error.message,
    });
  }
};
//
export const OrderController = {
  createOrder,
  getAllOrders,
};
