import Input from '../elements/Input';
import type { FormErrors } from '../../types/zod';
import type { JSX } from 'react';
import { formConfig } from '../../config/formConfig';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormDataValues } from '../../types/forms';
import { getErrorMessage } from '../../utils/getErrorMessage';

type Props = {
  filteredCountries: string[];
  onCountryInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryBlur?: () => void;
  register?: UseFormRegister<FormDataValues>;
  customErrors?: FormErrors;
  hookFormErrors?: FieldErrors<FormDataValues>;
  setHookCountryValue?: (value: string) => void;
};

function FormFields({
  filteredCountries,
  onCountryInput,
  onCountryBlur,
  register,
  customErrors,
  hookFormErrors,
}: Props): JSX.Element {
  return (
    <>
      {formConfig.map((field) => {
        const errorMessage = getErrorMessage(
          field.name,
          customErrors,
          hookFormErrors
        );
        if (field.gender) {
          return (
            <fieldset key={field.name}>
              <legend>{field.label}</legend>
              {field.gender.map((item) => (
                <Input
                  register={register}
                  label={item}
                  key={item}
                  id={`radio-${item.toLowerCase()}`}
                  type={field.type}
                  name={field.name}
                  defaultValue={item.toLowerCase()}
                />
              ))}
              <p className="input-error">{errorMessage}</p>
            </fieldset>
          );
        }

        if (field.name === 'country') {
          return (
            <div key={field.name}>
              <Input
                register={register}
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                onInput={onCountryInput}
                onBlur={onCountryBlur}
                list={field.list}
                errorMessage={errorMessage}
              />

              <datalist id={field.list} className="countries-list">
                {filteredCountries.map((item) => (
                  <option
                    className="countries-list__item"
                    key={item}
                    value={item}
                  />
                ))}
              </datalist>
            </div>
          );
        }

        return (
          <Input
            register={register}
            id={field.name}
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            label={field.label}
            autocomplete={field.autocomplete}
            errorMessage={errorMessage}
          />
        );
      })}
    </>
  );
}

export default FormFields;
