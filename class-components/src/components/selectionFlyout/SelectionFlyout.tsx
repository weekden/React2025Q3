import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearSelection } from '../../store/cardsSlice';
import saveFile from '../../utils/saveFile';
import './selection.css';

function SelectionFlyout(): ReactNode {
  const selector = useAppSelector((state) => state.checkCards.list);
  const quantity = selector.length;
  const dispatch = useAppDispatch();
  return (
    <div className="checked-item">
      <span>Selected {quantity} elements</span>
      <div className="checked-item__buttons">
        <button onClick={() => dispatch(clearSelection())}>Unselect all</button>
        <button onClick={() => saveFile(selector, quantity)}>Download</button>
      </div>
    </div>
  );
}

export default SelectionFlyout;
