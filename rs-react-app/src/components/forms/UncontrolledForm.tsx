import type { JSX } from 'react';
import Input from '../elements/Input';
import { formConfig } from '../../config/formConfig';
import './form.css';
// import Button from '../elements/Button';

function UncontrolledForm(): JSX.Element {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <form id="form" className="form" onSubmit={handleSubmit}>
      {formConfig.map((field) => {
        if (field.gender) {
          return (
            <fieldset key={field.name}>
              <legend>{field.label}</legend>
              {field.gender.map((item) => (
                <Input
                  label={item}
                  key={item}
                  id={`radio-${item.toLowerCase()}`}
                  type={field.type}
                  name={field.name}
                  value={item.toLowerCase()}
                />
              ))}
            </fieldset>
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
            accept={field.accept}
          />
        );
      })}
    </form>
  );
}

export default UncontrolledForm;
