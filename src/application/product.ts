import mongoose from "mongoose";
import { CategoryDTO } from "../domain/dto/category";
import { ProductDTO } from "../domain/dto/product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Product from "../infrastructure/schemas/Product";
import { Request, Response, NextFunction } from "express";

const products = [
  {
    categoryId: "1",
    image: "/assets/products/airpods-max.png",
    id: "1",
    name: "AirPods Max",
    price: "549.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "3",
    image: "/assets/products/echo-dot.png",
    id: "2",
    name: "Echo Dot",
    price: "99.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "2",
    image: "/assets/products/pixel-buds.png",
    id: "3",
    name: "Galaxy Pixel Buds",
    price: "99.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "1",
    image: "/assets/products/quietcomfort.png",
    id: "4",
    name: "Bose QuiteComfort",
    price: "249.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "3",
    image: "/assets/products/soundlink.png",
    id: "5",
    name: "Bose SoundLink",
    price: "119.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "5",
    image: "/assets/products/apple-watch.png",
    id: "6",
    name: "Apple Watch 9",
    price: "699.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "4",
    image: "/assets/products/iphone-15.png",
    id: "7",
    name: "Apple Iphone 15",
    price: "1299.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "4",
    image: "/assets/products/pixel-8.png",
    id: "8",
    name: "Galaxy Pixel 8",
    price: "549.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
];

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    //validate product id
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid product ID format");
    }

    const product = await Product.findById(selectedId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //runtime validation using zod
    const result = ProductDTO.safeParse(req.body);

    if (!result.success) {
      console.log(result.error.errors);
      throw new ValidationError(
        result.error.errors.map((e) => e.message).join(", ")
      );
    }
    const newProduct = new Product(result.data);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    //validate product id
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid product ID format");
    }

    //runtime validation using zod
    const result = ProductDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(
        result.error.errors.map((e) => e.message).join(", ")
      );
    }

    // Update and return the updated product
    const product = await Product.findByIdAndUpdate(selectedId, result.data, {
      new: true,
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    //validate product id
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid product ID format");
    }

    const product = await Product.findByIdAndDelete(selectedId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
