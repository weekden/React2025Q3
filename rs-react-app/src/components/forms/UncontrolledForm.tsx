import { useRef, useState, type JSX } from 'react';
import Input from '../elements/Input';
import { formConfig } from '../../config/formConfig';
import { addFormData } from '../../store/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import type { FormDataInputs } from '../../types/forms';
import { convertToBase64 } from '../../utils/base64';
import { countriesFilter } from '../../utils/automomplite';
import { formSchema } from '../../zod/formShema';

import './form.css';
import type { FormErrors } from '../../types/zod';

function UncontrolledForm(): JSX.Element {
  const countriesStore = useAppSelector((state) => state.countries);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const [error, setErrors] = useState<FormErrors>({});

  const handleCountryInput = (): void => {
    if (countryRef.current) {
      const query = countryRef.current.value;
      setFilteredCountries(countriesFilter(countriesStore, query));
    }
  };

  const handleBlur = (): void => {
    setTimeout(() => setFilteredCountries([]), 100);
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
    const file = avatar.files?.[0];

    const avatarBase64 = await convertToBase64(file);

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
    console.log(data);
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
    <form noValidate id="form" className="form" onSubmit={handleSubmit}>
      {formConfig.map((field) => {
        if (field.gender) {
          return (
            <fieldset key={field.name} radioGroup="">
              <legend>{field.label}</legend>
              {field.gender.map((item) => (
                <Input
                  label={item}
                  key={item}
                  id={`radio-${item.toLowerCase()}`}
                  type={field.type}
                  name={field.name}
                  defaultValue={item.toLowerCase()}
                />
              ))}
              <p className="input-error">{error[field.name]}</p>
            </fieldset>
          );
        }

        if (field.name === 'country') {
          return (
            <div key={field.name} style={{ position: 'relative' }}>
              <Input
                ref={countryRef}
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                onInput={handleCountryInput}
                onBlur={handleBlur}
                errorMessage={error[field.name]}
              />

              {filteredCountries.length > 0 && (
                <ul className="countries-list">
                  {filteredCountries.map((item) => (
                    <li
                      className="countries-list__item"
                      key={item}
                      role="option"
                      onClick={() => {
                        if (countryRef.current) {
                          countryRef.current.value = item;
                          setFilteredCountries([]);
                        }
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return (
          <Input
            id={field.name}
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            label={field.label}
            autocomplete={field.autocomplete}
            errorMessage={error[field.name]}
          />
        );
      })}
    </form>
  );
}

export default UncontrolledForm;
