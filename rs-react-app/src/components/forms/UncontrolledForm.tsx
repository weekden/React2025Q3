import { useState, type JSX } from 'react';
import { addFormData } from '../../store/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import type { FormDataInputs } from '../../types/forms';
import { convertToBase64 } from '../../utils/base64';
import { countriesFilter } from '../../utils/automomplite';
import { formSchema } from '../../zod/formShema';

import './form.css';
import type { FormErrors } from '../../types/zod';
import FormFields from './RenderFields';
import Button from '../elements/Button';

function UncontrolledForm(): JSX.Element {
  const countriesStore = useAppSelector((state) => state.countries);
  const [, setFilteredCountries] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const [error, setErrors] = useState<FormErrors>({});

  const handleCountrySearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilteredCountries(countriesFilter(countriesStore, event.target.value));
  };

  const handleCountryBlur = (): void => {
    setFilteredCountries([]);
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & FormDataInputs
  > = async (event): Promise<void> => {
    event.preventDefault();

    const fieldErrors: FormErrors = {};
    const form = event.currentTarget;

    const {
      name,
      email,
      age,
      country,
      gender,
      password,
      confirmPassword,
      avatar,
      terms,
    } = form;
    const file = avatar.files;

    const avatarBase64 = await convertToBase64(file?.[0]);

    const data = {
      name: name.value,
      age: Number(age.value),
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      country: country.value,
      gender: gender.value,
      avatar: file,
      terms: terms.checked,
    };
    const validationResult = formSchema.safeParse(data);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((err) => {
        const field = err.path[0] as string;

        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      const finalData = {
        ...data,
        avatar: avatarBase64,
      };
      dispatch(addFormData(finalData));
    }
  };

  return (
    <form
      noValidate
      id="uncontroll-form"
      className="form"
      onSubmit={handleSubmit}
    >
      <FormFields
        customErrors={error}
        filteredCountries={countriesStore}
        onCountryInput={handleCountrySearch}
        onCountryBlur={handleCountryBlur}
      />
      <Button className="submit-btn" type="submit" text="Send" />
    </form>
  );
}

export default UncontrolledForm;
