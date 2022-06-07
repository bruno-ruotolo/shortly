import { signInSchema, signUpSchema } from "../schemas/usersSchemas.js";

export function postSignIn(req, res, next) {
  const signIn = req.body;

  const { error } = signInSchema.validate(signIn, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message))
  next();
}

export function postSignUp(req, res, next) {
  const signUp = req.body;

  const { error } = signUpSchema.validate(signUp, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map(detail => detail.message));
  next()
}