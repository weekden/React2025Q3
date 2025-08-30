import { useContext, type JSX } from 'react';
import { addonInformValues } from '../../config';
import './modalWidget.scss';
import { FilterContext } from '../../context/filterContext';

type ModatWidgetProps = {
  onClose: () => void;
};

function ModatWidget({ onClose }: ModatWidgetProps): JSX.Element | null {
  const context = useContext(FilterContext);
  if (!context) {
    return null;
  }

  const selectedFields = context.selectedFields;
  const setSelectedFields = context.setSelectedFields;

  const toggleCard = (value: string): void => {
    if (selectedFields.includes(value)) {
      setSelectedFields(selectedFields.filter((item) => item !== value));
    } else {
      setSelectedFields([...selectedFields, value]);
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <button className="widget-close" onClick={onClose}>
          X
        </button>
      </div>

      <div className="widget-wrapper">
        {addonInformValues.map((item) => (
          <label className="widget-wrapper__item" key={item}>
            {item}
            <input
              type="checkbox"
              value={item}
              checked={selectedFields.includes(item)}
              onChange={() => toggleCard(item)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default ModatWidget;
