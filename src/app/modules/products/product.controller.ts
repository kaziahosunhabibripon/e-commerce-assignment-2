import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchema from "./product.validation";

// create a new product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productValidationData = productSchema.parse(productData);
    const result = await ProductServices.createProduct(productValidationData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error || "Woops! Product creation failed!",
      error: error.message,
    });
  }
};
// Get All products controller or based on the search query fetch data
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getAllProducts(searchTerm as string);

    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error || "Woops! Products Not Found !",
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
// update a single product by id

const updateSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const result = await ProductServices.updateSingleProductById(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.details || "Wops! Product Not Found !",
      error: error.message,
    });
  }
};

// delete single product by id

const deleteSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
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
  updateSingleProductById,
  deleteSingleProductById,
};
