import ServerMainPage from '@/components/mainPage/ServerMainPage';
import { JSX } from 'react';

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      style={{
        flexDirection: 'row',
      }}
      className="page-wrapper"
    >
      <div className="cards-container">
        <ServerMainPage />
        <div className="layout-details">{children}</div>
      </div>
    </div>
  );
}
