import Joi from "joi";

export const categorySchema = Joi.object({
  categoryName: Joi.string().min(3).max(100).required().trim(),
});
