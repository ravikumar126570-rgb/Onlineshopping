import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Zap, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductDetailsPage({ products }) {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="main-container section-spacing">
        <div className="empty-state card">
          <h2>Product not found</h2>
          <p>The product you&apos;re looking for does not exist or may have been removed.</p>
          <Link className="btn-view-all" style={{ marginTop: '20px' }} to="/products">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Flipkart style strike price
  const originalPrice = Math.floor(product.price * 1.25);

  return (
    <div className="main-container section-spacing">
      <div className="pdp-layout">
        <div className="pdp-left">
          <div className="pdp-img-wrap">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="pdp-actions">
            <button className="btn-cart" onClick={() => addToCart(product)}>
              <ShoppingCart size={20} />
              ADD TO CART
            </button>
            <button className="btn-buy" onClick={() => { addToCart(product); /* navigate logic could go here */ }}>
              <Zap size={20} fill="currentColor" />
              BUY NOW
            </button>
          </div>
        </div>

        <div className="pdp-right">
          <nav className="breadcrumb" style={{ fontSize: '12px', color: 'var(--fk-text-light)', marginBottom: '12px' }}>
            Home &gt; {product.category} &gt; {product.name}
          </nav>
          
          <h1 className="pdp-title">{product.name}</h1>
          
          <div className="pdp-rating-row">
            <div className="badge-green">
              <span>{product.rating}</span>
              <Star size={12} fill="currentColor" />
            </div>
            <span className="pdp-rating-text">432 Ratings & 54 Reviews</span>
          </div>

          <div className="pdp-price">
            <span style={{ fontSize: '14px', color: 'var(--fk-green)', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Special Price</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span>₹{product.price.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '16px', color: 'var(--fk-text-light)', textDecoration: 'line-through', fontWeight: '400' }}>₹{originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '16px', color: 'var(--fk-green)', fontWeight: '500' }}>25% off</span>
            </div>
          </div>

          <div className="offers" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Available offers</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ fontSize: '14px' }}><span style={{ color: 'var(--fk-green)', fontWeight: '500' }}>Bank Offer</span> 10% instant discount on XYZ Bank cards.</li>
              <li style={{ fontSize: '14px' }}><span style={{ color: 'var(--fk-green)', fontWeight: '500' }}>Partner Offer</span> Get extra 5% off on your first order.</li>
            </ul>
          </div>

          <div className="pdp-description">
            <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Product Description</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#212121' }}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
