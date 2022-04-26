import Joi from "joi";

export const productSchema = Joi.object({
  productName: Joi.string().min(3).max(100).required().trim(),
  quantity: Joi.number().integer().min(1).required().default(1),
  discount: Joi.number().min(1).max(100).required().default(0),
  image: Joi.string().min(3).trim(),
  description: Joi.string().min(3).trim(),
  categoryId: Joi.number().required(),
});

export const queryProductSchema = Joi.object({
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
});
