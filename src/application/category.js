import NotFoundError from "../domain/errors/not-found-error.js";
import Category from "../infrastructure/schemas/Category.js";

export const getCategories = async (req, res, next) => {
  try {
    const data = await Category.find();
    return res.status(200).json(data).send();
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    const category = await Category.findById(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return res.status(200).json(category).send();
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    await Category.create(req.body);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    const category = await Category.findByIdAndUpdate(selectedId, req.body);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    const category = await Category.findByIdAndDelete(selectedId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
