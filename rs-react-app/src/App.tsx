import Popup from './components/Popup/Popup';
import Button from './components/elements/Button';

import type { FormType } from './types/enums';
import { useState, type JSX } from 'react';

import './App.css';

export default function App(): JSX.Element {
  const [formType, setFormType] = useState<FormType>(null);

  return (
    <div className="buttons-container">
      <Button
        onClick={() => {
          setFormType('uncontroll');
        }}
        text="Uncontroll Form"
      ></Button>

      <Button onClick={() => setFormType('hookForm')} text="Hook Form"></Button>

      <Popup isOpen={!!formType} onClose={() => setFormType(null)}>
        {formType === 'uncontroll' && <p>Render uncontrolled form</p>}
        {formType === 'hookForm' && <p>Render ReactHookForm form</p>}
      </Popup>
    </div>
  );
}
