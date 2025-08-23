import { useState, type JSX } from 'react';

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { countriesFilter } from '../../utils/automomplite';
import { addFormData } from '../../store/formSlice';
import type { FormDataValues } from '../../types/forms';
import FormFields from './RenderFields';

function HookForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const countriesStore = useAppSelector((state) => state.countries);

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormDataValues>();

  const handleCountrySearch = (): void => {
    setFilteredCountries(countriesFilter(countriesStore, watch('country')));
  };

  const onSubmit = (data: FormDataValues): void => {
    dispatch(addFormData(data));
  };
  return (
    <form
      noValidate
      id="hook-form"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFields
        register={register}
        hookFormErrors={errors}
        filteredCountries={filteredCountries}
        onCountryInput={handleCountrySearch}
      />
    </form>
  );
}
export default HookForm;
