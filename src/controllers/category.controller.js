import { HttpStatusCode } from "constants/HttpStatusCode";
import { CategoryService } from "services/category.service";
import createError from "http-errors";

const findAll = async (req, res, next) => {
  const { page = 0, limit = 1, sortBy = "id", orderBy = "asc", search = "" } = req.query;
  try {
    const results = await CategoryService.findAll({ search, page, limit, sortBy, orderBy });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const findOne = async (req, res, next) => {
  const categoryId = +req.params.categoryId;
  try {
    const category = await CategoryService.findOne(categoryId);
    if (!category) {
      next(createError.NotFound(`No category found with the id ${categoryId}`));
    }
    return res.status(HttpStatusCode.OK).json(category);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const create = async (req, res) => {
  try {
    const category = await CategoryService.create(req.body);
    return res.status(HttpStatusCode.OK).json({ category });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const update = async (req, res, next) => {
  const categoryId = +req.params.categoryId;
  try {
    const foundProduct = await CategoryService.findOne(categoryId);
    if (!foundProduct)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${categoryId}` });
    const category = await CategoryService.update(categoryId, req.body);
    return res.status(HttpStatusCode.OK).json(category);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const remove = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    const category = await CategoryService.remove(categoryId);

    if (!category) {
      next(createError.NotFound(`No category found with the id ${categoryId}`));
    }
    return res.status(HttpStatusCode.OK).json(category);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

export const CategoryController = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
