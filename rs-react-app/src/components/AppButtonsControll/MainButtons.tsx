import { useState, type JSX } from 'react';
import Button from '../elements/Button';
import type { FormType } from '../../types/enums';
import Popup from '../Popup/Popup';
import UncontrolledForm from '../forms/UncontrolledForm';
import './mainButtons.css';
import { useAppSelector } from '../../store/redux';

function AppButtonsControll(): JSX.Element {
  const formData = useAppSelector((state) => state.formData);
  const [formType, setFormType] = useState<FormType>(null);

  return (
    <div className="buttons-container">
      <Button
        onClick={() => {
          setFormType('uncontroll');
        }}
        text="Uncontroll Form"
      />
      <Button onClick={() => setFormType('hook')} text="Hook Form" />
      <Popup
        title={formType}
        isOpen={!!formType}
        onClose={() => setFormType(null)}
      >
        {formType === 'uncontroll' && <UncontrolledForm />}
        {formType === 'hook' && (
          <p>Render ReactHookForm form {JSON.stringify(formData)}</p>
        )}
      </Popup>
    </div>
  );
}

export default AppButtonsControll;
