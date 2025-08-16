import type { JSX } from 'react';
import type { TitleProps } from '../../types/title';
import './title.css';

function Title({ title }: TitleProps): JSX.Element {
  return (
    <>
      <h1 className="title" data-testid="title">
        {title || 'Default title'}
      </h1>
    </>
  );
}
export default Title;
