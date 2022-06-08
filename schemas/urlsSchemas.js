import joi from "joi";

export const postURLSchema = joi.object({
  url: joi.string().uri().required()
});
