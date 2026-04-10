import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="empty-state card">
      <span className="eyebrow">404 Error</span>
      <h1>Page not found</h1>
      <p>The page you requested does not exist. Let&apos;s get you back to shopping.</p>
      <Link className="button" to="/">
        Return Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
