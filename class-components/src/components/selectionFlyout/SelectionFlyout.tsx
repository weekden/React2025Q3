import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearSelection } from '../../store/cardsSlice';
import saveFile from '../../utils/saveFile';
import './selection.css';
import Button from '../elements/Button';

function SelectionFlyout(): JSX.Element {
  const selector = useAppSelector((state) => state.checkCards.list);
  const quantity = selector.length;
  const dispatch = useAppDispatch();
  return (
    <div className="checked-item">
      <span>Selected {quantity} elements</span>
      <div className="checked-item__buttons">
        <Button
          text="Unselect all"
          onClick={() => dispatch(clearSelection())}
        />
        <Button text="Download" onClick={() => saveFile(selector, quantity)} />
      </div>
    </div>
  );
}

export default SelectionFlyout;
