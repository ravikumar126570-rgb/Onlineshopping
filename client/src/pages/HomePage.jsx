import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroCarousel from '../components/HeroCarousel';

function HomePage({ products }) {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      <HeroCarousel />

      <div className="main-container section-spacing">
        <section className="deals-section card">
          <div className="deals-header">
            <h2>Trending Products</h2>
            <Link className="btn-view-all" to="/products">View All</Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="deals-section card" style={{ marginTop: '24px' }}>
          <div className="deals-header">
            <h2>Featured Collection</h2>
            <Link className="btn-view-all" to="/products">Explore</Link>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
