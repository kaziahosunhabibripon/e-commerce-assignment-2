import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create a new product
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// get all products
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

// Get single product based on id

const getSingleProductById = async (id: string) => {
  const result = await Product.findById({
    _id: id,
  });
  return result;
};

// export all the services
export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
};
