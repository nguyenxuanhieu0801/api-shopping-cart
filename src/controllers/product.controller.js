import { HttpStatusCode } from "constants/HttpStatusCode";
import { ProductService } from "services/product.service";

const findAll = async (req, res) => {
  const { page, limit, sortBy, orderBy, search } = req.query;

  const results = await ProductService.findAll({ search, page, limit, sortBy, orderBy });
  return res.status(HttpStatusCode.OK).json({ ...results });
};

const findOne = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const product = await ProductService.findOne(productId);
    if (product) {
      return res.status(HttpStatusCode.OK).json(product);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${productId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = { ...req.body };
    data.price = parseFloat(data.price);
    data.stock = parseInt(data.stock);
    data.categoryId = parseInt(data.categoryId);
    const product = await ProductService.create({ ...data });

    return res.status(HttpStatusCode.OK).json({ product });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const productId = parseInt(req.params.productId);

  const data = { ...req.body };
  data.price = parseFloat(data.price);
  data.stock = parseInt(data.stock);
  data.categoryId = parseInt(data.categoryId);

  try {
    const foundProduct = await ProductService.findOne(productId);
    if (!foundProduct)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${productId}` });

    const product = await ProductService.update(productId, data);
    return res.status(HttpStatusCode.OK).json(product);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const product = await ProductService.remove(productId);
    if (product) {
      return res.status(HttpStatusCode.OK).json({ message: "Delete product successfully", product });
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${productId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const ProductController = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
