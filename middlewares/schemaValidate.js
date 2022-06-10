
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { postURLSchema } from "../schemas/urlsSchemas.js"

export function schemaValidate(req, res, next) {
  const reqBody = req.body
  let schemaType = null;

  if (req.path === "/signin") schemaType = signInSchema
  else if (req.path === "/signup") schemaType = signUpSchema
  else if (req.path === "/urls/shorten") schemaType = postURLSchema;

  const { error } = schemaType.validate(reqBody, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message))
  next();
};