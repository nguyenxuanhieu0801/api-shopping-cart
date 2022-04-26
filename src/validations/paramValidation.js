import Joi from "joi";

export const paramSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]/)
    .required(),
});
