import Joi from "joi";

export const createServiceSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(500)
    .required(),

  duration: Joi.number()
    .integer()
    .min(1)
    .required(),

  price: Joi.number()
    .min(0)
    .required(),

  isActive: Joi.boolean()
    .default(true),
});

export const updateServiceSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  description: Joi.string()
    .trim()
    .max(500),

  duration: Joi.number()
    .integer()
    .min(1),

  price: Joi.number()
    .min(0),

  isActive: Joi.boolean(),
}).min(1);