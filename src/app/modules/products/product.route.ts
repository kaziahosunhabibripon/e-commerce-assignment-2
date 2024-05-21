import express, { Request, Response } from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:productId", ProductController.getSingleProductById);
router.put("/:productId", ProductController.updateSingleProductById);
router.delete("/:productId", ProductController.deleteSingleProductById);

export const ProductRoutes = router;
