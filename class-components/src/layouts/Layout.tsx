import { Outlet } from 'react-router-dom';

import type { ReactNode } from 'react';
import Header from '../components/header/Header';

function Layout(): ReactNode {
  return (
    <>
      <Header />
      <main className="conntainer">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
