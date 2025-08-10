import type { ReactNode } from 'react';

function About(): ReactNode {
  return (
    <div className="page-wrapper" data-testid="about-page">
      <h1>Zelda Store</h1>
      <p>
        This is small App for check information about person this amazing game!
      </p>
      <p>
        Created by <strong>Denis Nedelko</strong>
      </p>
      <p>
        <a href="https://github.com/weekden/" target="blank">
          My GitHub
        </a>
      </p>
      <p>
        <a
          href="https://rs.school/courses/reactjs"
          target="blank"
          data-testid="rs-school-link"
        >
          RSS React Cours
        </a>
      </p>
    </div>
  );
}

export default About;
