import { HttpStatusCode } from "constants/HttpStatusCode";
import { CategoryService } from "services/CategoryService";

const findAll = async (req, res) => {
  const categories = await CategoryService.findAll();
  return res.status(HttpStatusCode.OK).json({ categories });
};

const findOne = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
    const category = await CategoryService.findOne(categoryId);
    if (category) {
      return res.status(HttpStatusCode.OK).json(category);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${categoryId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const category = await CategoryService.create(req.body);
    return res.status(HttpStatusCode.OK).json({ category });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
    const foundProduct = await CategoryService.findOne(categoryId);
    if (!foundProduct) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${categoryId}` });
    const category = await CategoryService.update(categoryId, req.body);
    return res.status(HttpStatusCode.OK).json(category);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    const category = await CategoryService.remove(categoryId);
    if (category) {
      return res.status(HttpStatusCode.OK).json(category);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${categoryId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const CategoryController = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
