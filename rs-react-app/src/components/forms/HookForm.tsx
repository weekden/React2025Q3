import { useState, type JSX } from 'react';

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { countriesFilter } from '../../utils/automomplite';

import type { FormDataValues } from '../../types/forms';
import FormFields from './RenderFields';

import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../zod/formShema';
import Button from '../elements/Button';
import { addFormData } from '../../store/formSlice';
import { convertToBase64 } from '../../utils/base64';

function HookForm(): JSX.Element {
  const countriesStore = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const [, setFilteredCountries] = useState<string[]>([]);
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataValues>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

  const handleCountrySearch = (): void => {
    setFilteredCountries(countriesFilter(countriesStore, watch('country')));
  };

  const onSubmit = async (data: FormDataValues): Promise<void> => {
    if (!isValid) {
      return;
    }
    const files = watch('avatar') as FileList | undefined;
    const avatarBase64 = await convertToBase64(files?.[0]);

    const finalData = {
      ...data,
      avatar: avatarBase64,
    };
    dispatch(addFormData(finalData));
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
        filteredCountries={countriesStore}
        onCountryInput={handleCountrySearch}
      />
      <Button
        className="submit-btn"
        type="submit"
        text="Send"
        disabled={!isValid}
      />
    </form>
  );
}
export default HookForm;
