import Joi from "joi";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
const isStartTimeBeforeEndTime = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  return startTotalMinutes < endTotalMinutes;
};

export const createScheduleSchema = Joi.object({
  day: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )
    .required(),

  startTime: Joi.string()
    .pattern(timePattern)
    .required()
    .messages({
      "string.pattern.base":
        "Start time must be in HH:mm format",
    }),

  endTime: Joi.string()
    .pattern(timePattern)
    .required()
    .custom((value, helpers) => {
      const { startTime } = helpers.state.ancestors[0];

      if (!startTime) {
        return value;
      }

      if (!isStartTimeBeforeEndTime(startTime, value)) {
        return helpers.error("any.invalid");
      }

      return value;
    })
    .messages({
      "string.pattern.base":
        "End time must be in HH:mm format",

      "any.invalid":
        "End time must be after start time",
    }),

  isAvailable: Joi.boolean().default(true),
});
export const updateScheduleSchema = Joi.object({
  day: Joi.string()
    .valid(...days),

  startTime: Joi.string()
    .pattern(timePattern)
    .messages({
      "string.pattern.base":
        "Start time must be in HH:mm format",
    }),

  endTime: Joi.string()
    .pattern(timePattern)
    .messages({
      "string.pattern.base":
        "End time must be in HH:mm format",
    }),

  isAvailable: Joi.boolean(),
}).min(1);