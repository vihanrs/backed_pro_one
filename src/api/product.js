import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../application/product.js";

export const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
