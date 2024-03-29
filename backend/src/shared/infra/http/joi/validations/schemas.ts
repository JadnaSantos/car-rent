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


export const carCredentialsShema = joi.object({
  name: joi.string().required(),
  year: joi.string().required(),
  description: joi.string().required(),
  brand: joi.string().required(),
  banner: joi.string().required(),
  price: joi.number().required(),
  kilometers: joi.string().required(),
  userId: joi.string().required()
});

export const forgotPasswordShema = joi.object({
  username: joi.string().min(3).email().required(),
});
