import { useState, type JSX } from 'react';
import Button from '../elements/Button';
import type { FormType } from '../../types/enums';
import Popup from '../Popup/Popup';
import UncontrolledForm from '../forms/UncontrolledForm';

import './mainButtons.css';
import HookForm from '../forms/HookForm';

function AppButtonsControll(): JSX.Element {
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
        form={formType}
      >
        {formType === 'uncontroll' && <UncontrolledForm />}
        {formType === 'hook' && <HookForm />}
      </Popup>
    </div>
  );
}

export default AppButtonsControll;
