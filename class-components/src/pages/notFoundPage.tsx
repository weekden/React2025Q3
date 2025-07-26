import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): ReactNode {
  return (
    <div
      style={{
        fontSize: '24px',
        margin: 'auto',
      }}
    >
      <p>This page doesn&apos;t exist.</p>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
