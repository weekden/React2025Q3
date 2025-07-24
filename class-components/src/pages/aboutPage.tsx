import type { ReactNode } from 'react';

function About(): ReactNode {
  return (
    <div className="page-wrapper">
      <p>Denis Nedelko</p>
      <a href="https://github.com/weekden/" target="blank">
        My GitHub
      </a>
    </div>
  );
}

export default About;
