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
// get all those products based on search query match
const getProductsBySearch = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: new RegExp(searchTerm, "i") } },
      { description: { $regex: new RegExp(searchTerm, "i") } },
      { category: { $regex: new RegExp(searchTerm, "i") } },
      { tags: { $regex: new RegExp(searchTerm, "i") } },
    ],
  })
    .populate("variants")
    .populate("inventory");

  return result;
};

// Get single product based on id

const getSingleProductById = async (id: string) => {
  const result = await Product.findById({
    _id: id,
  });
  return result;
};

// update a product

// delete single product based on id

// export all the services
export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  getProductsBySearch,
};
