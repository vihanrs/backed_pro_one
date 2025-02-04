import NotFoundError from "../domain/errors/not-found-error";
import Category from "../infrastructure/schemas/Category";
import { Request, Response, NextFunction } from "express";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Category.find();
    res.status(200).json(data).send();
    return;
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
    const category = await Category.findById(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(200).json(category).send();
    return;
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
    await Category.create(req.body);
    res.status(201).send();
    return;
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
    const category = await Category.findByIdAndUpdate(selectedId, req.body);

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
    const category = await Category.findByIdAndDelete(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
};
