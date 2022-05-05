import { HttpStatusCode } from "constants/HttpStatusCode";
import Joi from "joi";

const create = async (req, res, next) => {
  const condition = Joi.object({
    name: Joi.string().min(3).max(100).required().trim(),
    price: Joi.number().precision(2).min(1).required(),
    stock: Joi.number().integer().min(0).required(),
    description: Joi.string().min(3).max(100).required().trim(),
    categoryId: Joi.number().integer().required(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    let errors = "";
    for (const err of error.details) {
      errors += err.path.join(" > ") + err.message.slice(err.message.lastIndexOf('"') + 1);
    }

    res.status(HttpStatusCode.BAD_REQUEST).json({ errors });
  }
};

const update = async (req, res, next) => {
  const condition = Joi.object({
    name: Joi.string().min(3).max(100).trim(),
    price: Joi.number().precision(2).min(1),
    stock: Joi.number().integer().min(0),
    description: Joi.string().min(3).max(100).trim(),
    categoryId: Joi.number().integer(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  } catch (error) {
    let errors = "";
    for (const err of error.details) {
      errors += err.path.join(" > ") + err.message.slice(err.message.lastIndexOf('"') + 1);
    }

    res.status(HttpStatusCode.BAD_REQUEST).json({ errors });
  }
};

export const ProductValidation = { create, update };
