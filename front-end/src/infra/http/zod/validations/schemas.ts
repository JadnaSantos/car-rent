import * as zod from 'zod';


export type SchemaFieldSignin = zod.infer<typeof FormValidationSchema>

export const FormValidationSchema = zod.object({
  username: zod.string().min(3).email(),
  password: zod
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .min(8, { message: 'A sua senha deve ter no mínimo 8 caracters' }),

});


export const FormValidationSignupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8, { message: 'A sua senha deve ter no mínimo 8 caracters' }),
  phone: zod.string().max(12)
});

export type SchemaFieldSignup = zod.infer<typeof FormValidationSignupSchema>
