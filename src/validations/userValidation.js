import Joi from "joi";

function userValidate(data) {
  const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().trim(),
    lastName: Joi.string().min(3).max(30).required().trim(),
    email: Joi.string().email().trim(),
    username: Joi.string().min(3).max(30).required().trim(),
    password: Joi.string().required().trim(),
    gender: Joi.boolean().required(),
    // pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).
    // repeat_password: Joi.ref("password"),
    phone: Joi.string()
      // .length(10)
      // .pattern(/^[0-9]+$/)
      .required(),
    role: Joi.string().required().trim(),
  });

  return userSchema.validate(data, { abortEarly: false });
}

export default userValidate;
