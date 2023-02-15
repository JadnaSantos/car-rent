import joi from 'joi';

export const userCredentialsSchema = joi.object({
  username: joi.string().min(3).email().required(),
  password: joi
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required().min(8),
  phone: joi.string().max(12).required()
});

export const userCredentialsSigInSchema = joi.object({
  username: joi.string().email().required(),
  password: joi.string().required()
});
