import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// create a new product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProduct(productData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Wops! Product creation failed!",
      error: error.message,
    });
  }
};
// Get All products controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Wops! Products Not Found !",
      error: error.message,
    });
  }
};
// get single product controller
const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Wops! Product Not Found !",
      error: error.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProductById,
};
