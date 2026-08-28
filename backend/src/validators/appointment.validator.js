import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createAppointmentSchema = Joi.object({
  // userId: Joi.string()
  //   .pattern(objectIdPattern)
  //   .required()
  //   .messages({
  //     "string.pattern.base": "Invalid userId",
  //   }),

  serviceId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      "string.pattern.base": "Invalid serviceId",
    }),

  appointmentDate: Joi.date()
    .required()
    .messages({
      "date.base": "Invalid appointment date",
    }),

  // status: Joi.string()
  //   .valid(
  //     "pending",
  //     "confirmed",
  //     "cancelled",
  //     "completed"
  //   )
  //   .default("pending"),

  notes: Joi.string()
    .trim()
    .max(500)
    .allow(""),

  scheduleId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      "string.pattern.base": "Invalid scheduleId",
    }),
});

export const updateAppointmentSchema = Joi.object({
  appointmentDate: Joi.date(),

  status: Joi.string().valid(
    "pending",
    "confirmed",
    "cancelled",
    "completed"
  ),

  notes: Joi.string()
    .trim()
    .max(500)
    .allow(""),

  scheduleId: Joi.string()
    .pattern(objectIdPattern)
    .messages({
      "string.pattern.base": "Invalid scheduleId",
    }),
}).min(1);