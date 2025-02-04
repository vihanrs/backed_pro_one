import mongoose from "mongoose";
import NotFoundError from "../domain/errors/not-found-error";
import Category from "../infrastructure/schemas/Category";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CategoryDTO } from "../domain/dto/category";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Category.find();
    res.status(200).json(data).send();
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid category ID format");
    }

    const category = await Category.findById(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(200).json(category).send();
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body using Zod
    const result = CategoryDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(
        result.error.errors.map((e) => e.message).join(", ")
      );
    }

    await Category.create(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid category ID format");
    }

    // Validate request body with Zod
    const result = CategoryDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(
        result.error.errors.map((e) => e.message).join(", ")
      );
    }

    const category = await Category.findByIdAndUpdate(selectedId, result.data, {
      new: true,
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selectedId = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(selectedId)) {
      throw new ValidationError("Invalid category ID format");
    }

    const category = await Category.findByIdAndDelete(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
