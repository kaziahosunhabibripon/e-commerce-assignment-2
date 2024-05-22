import { TOrder } from "./order.interface";
import Order from "./order.model";

// create a new order service
const createOrder = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};

// get all order service

const getAllOrders = async (email: string | null) => {
  let query = {};
  if (typeof email === "string") {
    query = { email: email };
  }
  const result = await Order.find(query);
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
