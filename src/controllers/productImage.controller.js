import { HttpStatusCode } from "constants/HttpStatusCode";
import { ProductImageService } from "services/productImage.service";
import { ProductService } from "services/product.service";
import fs from "fs";

const create = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await ProductService.findOne(productId);

    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${productId}` });

    if (product) {
      const files = req.files;
      if (files) {
        files.forEach(async (file) => {
          const { filename, path, size } = file;
          await ProductImageService.create({
            imagePath: path,
            fileName: filename,
            fileSize: size,
            productId: product.id,
          });
        });
      }
    }
    return res.status(HttpStatusCode.OK).json({ message: "Upload image successfully" });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const productImageId = parseInt(req.params.productImageId);

  try {
    const productImage = await ProductImageService.remove(productImageId);
    if (productImage) {
      fs.unlink(productImage.imagePath, (err) => {
        if (err) throw err;
      });
      return res.status(HttpStatusCode.OK).json({ message: "Delete productImage successfully", productImage });
    } else {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: `No product image found with the id ${productImageId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const ProductImageController = {
  remove,
  create,
};
