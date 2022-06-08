import { postURLSchema } from "../schemas/urlsSchemas.js";

export function postURLValidate(req, res, next) {
  const urlBody = req.body;

  const { error } = postURLSchema.validate(urlBody, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message));
  next();
}