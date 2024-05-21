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
      message: "Woops! Product creation failed!",
      error: error.message,
    });
  }
};
// Get All products controller or based on the search query fetch data
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    let result;

    if (searchTerm) {
      // If search term is provided, search for products
      result = await ProductServices.getProductsBySearch(searchTerm as string);
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      // If no search term is provided, fetch all products
      result = await ProductServices.getAllProducts();
      res.status(200).json({
        success: true,
        message: "All products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Woops! Products Not Found !",
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
