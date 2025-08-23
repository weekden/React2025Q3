import { z } from 'zod';
import { genderOptions } from '../config/formConfig';

let password = '';
export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Enter the name')
    .regex(/^[A-Z]/, 'The name must start with a capital letter'),
  age: z
    .number('Enter your age')
    .min(1, 'Age must be positive')
    .max(100, 'Age should not be more than 100'),
  email: z.email('Invalid email'),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
      message:
        '1 number, 1 uppercased letter, 1 lowercased letter, 1 special character, 8 length',
    })
    .refine((value) => {
      password = value;
      return true;
    }),
  confirmPassword: z
    .string()
    .min(1, 'Enter confirm password')
    .refine((val) => password === val, {
      message: "Passwords don't equal",
      path: ['confirmPassword'],
    }),
  gender: z.enum(genderOptions, {
    message: 'Choose the gender',
  }),
  country: z.string().min(1, 'Choose the country'),
  avatar: z
    .any()
    .transform((val) => (val instanceof FileList ? val[0] : val))
    .pipe(
      z
        .file()
        .max(2_000_000, 'The size should not exceed 2Mb')
        .mime(['image/png', 'image/jpeg'], 'Should use png or jpeg format')
    )
    .optional(),
  terms: z
    .boolean()
    .refine((val) => val === true, "You did't accept our terms"),
});
