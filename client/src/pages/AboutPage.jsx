import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <section className="page-stack">
      <div className="card info-card">
        <span className="eyebrow">About MicroFlip</span>
        <h1>Designed as a modern online shopping experience</h1>
        <p>
          MicroFlip Shop brings together a responsive storefront, simple cart interactions, and a
          clean product-first layout to demonstrate how a React shopping site can feel polished and
          practical.
        </p>
      </div>

      <div className="info-grid">
        <Link to="/about-me" className="card info-link">
          <h3>About Me</h3>
          <p>Learn about the creator-side story behind this project structure and experience.</p>
        </Link>
        <Link to="/about-website" className="card info-link">
          <h3>About Website</h3>
          <p>See the technology choices, feature set, and design goals used in the website.</p>
        </Link>
      </div>
    </section>
  );
}

export default AboutPage;
