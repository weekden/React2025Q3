import { z } from 'zod';
import { genderOptions } from '../config/formConfig';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Enter the name')
      .regex(/^[A-Z]/, 'The name must start with a capital letter'),
    age: z
      .number()
      .min(1, 'Age must be positive')
      .max(100, 'Age should not be more than 100'),
    email: z.email('Invalid email'),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message:
          '1 number, 1 uppercased letter, 1 lowercased letter, 1 special character, 8 length',
      }),
    confirmPassword: z.string().min(1, 'You have to confirm your password'),
    gender: z.enum(genderOptions, {
      message: 'Choose the gender',
    }),
    country: z.string().min(1, 'Choose the country'),
    avatar: z
      .file()
      .max(2_000_000, 'The size should not exceed 2Mb')
      .mime(['image/png', 'image/jpeg'], 'Shoud use png or jpeg format')
      .optional(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You did't accept our terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't equal",
    path: ['confirmPassword'],
  });
