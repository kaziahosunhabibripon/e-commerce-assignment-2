import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create a new product
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// get all products and get all those products based on search query match
const getAllProducts = async (searchTerm: string | undefined | null) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, "i") } },
        { description: { $regex: new RegExp(searchTerm, "i") } },
        { category: { $regex: new RegExp(searchTerm, "i") } },
        { tags: { $regex: new RegExp(searchTerm, "i") } },
      ],
    };
  }

  const result = await Product.find(query)
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

const updateSingleProductById = async (id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  return result;
};

// delete single product based on id

const deleteSingleProductById = async (id: string) => {
  const result = await Product.findByIdAndDelete({
    _id: id,
  });
  return result;
};

// export all the services
export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateSingleProductById,
  deleteSingleProductById,
};
