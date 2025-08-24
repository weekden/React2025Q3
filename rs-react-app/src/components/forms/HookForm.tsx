import { useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import type { FormDataValues, FormProps } from '../../types/forms';
import FormFields from './RenderFields';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../elements/Button';
import { addFormData } from '../../store/formSlice';
import { convertToBase64 } from '../../utils/base64';
import { formSchema } from '../../zod/formShema';

function HookForm({ onClose }: FormProps): JSX.Element {
  const countriesStore = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormDataValues>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

  const onSubmit = async (data: FormDataValues): Promise<void> => {
    if (!isValid) return;

    const avatarBase64 = await convertToBase64(data.avatar);

    const finalData = {
      ...data,
      avatar: avatarBase64,
    };

    dispatch(addFormData(finalData));
    setSubmitMessage('Form submitted!');
    setTimeout(() => {
      setSubmitMessage(null);
      onClose?.();
    }, 1000);
  };
  return (
    <>
      {!submitMessage && (
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
          />
          <Button
            className="submit-btn"
            type="submit"
            text="Send"
            disabled={!isValid}
          />
        </form>
      )}
      {submitMessage && (
        <div data-testid="success-message">{submitMessage}</div>
      )}
    </>
  );
}
export default HookForm;
