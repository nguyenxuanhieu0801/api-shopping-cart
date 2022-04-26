import upload from "middlewares/upload";
import { HttpStatusCode } from "constants/HttpStatusCode";
import { ProductImageService } from "services/ProductImageService";
import { ProductService } from "services/ProductService";

const uploadImage = upload.array("image", 3);

const findAll = async (req, res) => {
  const { page, limit, sortBy, orderBy, search } = req.query;

  const products = await ProductService.findAll({ search, page, limit, sortBy, orderBy });
  return res.status(HttpStatusCode.OK).json({ products });
};

const findOne = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const product = await ProductService.findOne(productId);
    if (product) {
      return res.status(HttpStatusCode.OK).json(product);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${productId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const product = await ProductService.create(req.body);
    // if (product) {
    // uploadImage(req, res, function (err) {
    // if (err) {
    //   return res.status(HttpStatusCode.BAD_REQUEST).send({ message: err.message });
    // }
    // const files = req.files;

    // if (files) {
    //   files.forEach(async (file) => {
    //     const { filename, path, size } = file;
    //     await ProductImageService.create({ imagePath: path, filename, fileSize: size });
    //   });
    // }
    //});
    // }
    return res.status(HttpStatusCode.OK).json({ product });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const foundProduct = await ProductService.findOne(productId);
    if (!foundProduct)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${productId}` });

    const product = await ProductService.update(productId, req.body);
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
      return res.status(HttpStatusCode.OK).json(product);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${productId}` });
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
