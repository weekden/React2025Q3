import { useState, type JSX } from 'react';
import { addFormData } from '../../store/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { convertToBase64 } from '../../utils/base64';
import type { FormErrors } from '../../types/zod';
import FormFields from './RenderFields';
import Button from '../elements/Button';
import { formSchema } from '../../zod/formShema';
import type { FormProps } from '../../types/forms';
import './form.css';

function UncontrolledForm({ onClose }: FormProps): JSX.Element {
  const countriesStore = useAppSelector((state) => state.countries);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const [error, setErrors] = useState<FormErrors>({});
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const fieldErrors: FormErrors = {};

    const formData = Object.fromEntries(new FormData(form));

    const data = {
      ...formData,
      age: Number(formData.age),
      terms: !formData.terms ? false : formData.terms === 'on',
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
      const data = validationResult.data;
      const avatarBase64 = await convertToBase64(data.avatar);

      const finalData = {
        ...data,
        avatar: avatarBase64,
      };

      dispatch(addFormData(finalData));

      setErrors({});
      setSubmitMessage('Form submitted!');

      setTimeout(() => {
        setSubmitMessage(null);
        onClose?.();
      }, 1000);
    }
  };

  return (
    <>
      {!submitMessage && (
        <form
          noValidate
          id="uncontroll-form"
          className="form"
          onSubmit={handleSubmit}
        >
          <FormFields customErrors={error} filteredCountries={countriesStore} />
          <Button className="submit-btn" type="submit" text="Send" />
        </form>
      )}
      {submitMessage && (
        <div data-testid="success-message">{submitMessage}</div>
      )}
    </>
  );
}

export default UncontrolledForm;
