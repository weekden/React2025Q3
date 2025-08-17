import saveFile from '../../utils/saveFile';
import Button from '../elements/Button';
import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearSelection } from '../../store/cardsSlice';
import { useTranslations } from 'next-intl';

import './selection.css';

function SelectionFlyout(): JSX.Element {
  const selector = useAppSelector((state) => state.checkCards.list);
  const quantity = selector.length;
  const dispatch = useAppDispatch();
  const t = useTranslations('main');
  return (
    <div className="checked-item">
      <span>
        {t('flyOut.coin')} : <strong>{quantity}</strong>
      </span>
      <div className="checked-item__buttons">
        <Button
          nameLocale="main"
          keyLocale="flyOut.uncheckAll"
          onClick={() => dispatch(clearSelection())}
        />
        <Button
          nameLocale="main"
          keyLocale="flyOut.download"
          onClick={() => saveFile(selector, quantity)}
        />
      </div>
    </div>
  );
}

export default SelectionFlyout;
