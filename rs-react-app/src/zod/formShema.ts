import { z } from 'zod';
import { countryList, genderOptions } from '../config/formConfig';

export const formSchema = z
  .object({
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
      }),
    confirmPassword: z.string().min(1, 'Passwords do not match'),
    gender: z.enum(genderOptions, {
      message: 'Choose the gender',
    }),
    country: z.string().refine((val) => countryList.includes(val), {
      message: 'Choose the country',
    }),
    avatar: z
      .any()
      .transform((val) => (val instanceof FileList ? val[0] : val))
      .pipe(
        z
          .file()
          .min(1, 'Choose the your avatar')
          .max(2_000_000, 'The size should not exceed 2Mb')
          .mime(['image/png', 'image/jpeg'], 'Should use png or jpeg format')
      ),

    terms: z
      .boolean()
      .refine((val) => val === true, "You did't accept our terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
    when(payload) {
      return formSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });
