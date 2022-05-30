import { HttpStatusCode } from "constants/HttpStatusCode";
import { ProductService } from "services/product.service";
import createError from "http-errors";

const findAll = async (req, res, next) => {
  const { page = 0, limit = 1, sortBy = "id", orderBy = "asc", search = "" } = req.query;
  try {
    const results = await ProductService.findAll({ search, page, limit, sortBy, orderBy });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const findOne = async (req, res, next) => {
  const productId = +req.params.productId;
  console.log(typeof ++req.params.productId);
  try {
    const product = await ProductService.findOne(productId);
    if (product) {
      return res.status(HttpStatusCode.OK).json(product);
    } else {
      next(createError.NotFound(`No product found with the id ${productId}`));
    }
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };

    data.price = parseFloat(data.price);
    data.stock = +data.stock;
    data.categoryId = +data.categoryId;
    const product = await ProductService.create({ ...data });

    return res.status(HttpStatusCode.OK).json({ product });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const update = async (req, res, next) => {
  const productId = +req.params.productId;

  const data = { ...req.body };
  data.price = parseFloat(data.price);
  data.stock = +data.stock;
  data.categoryId = +data.categoryId;

  try {
    const foundProduct = await ProductService.findOne(productId);
    if (!foundProduct) next(createError.NotFound(`No product found with the id ${productId}`));

    const product = await ProductService.update(productId, data);
    return res.status(HttpStatusCode.OK).json(product);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const remove = async (req, res, next) => {
  const productId = parseInt(req.params.productId);

  try {
    const product = await ProductService.remove(productId);
    if (!product) next(createError.NotFound(`No product found with the id ${productId}`));

    return res.status(HttpStatusCode.OK).json({ message: "Delete product successfully", product });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

export const ProductController = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
