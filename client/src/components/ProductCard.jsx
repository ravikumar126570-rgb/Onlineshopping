import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Flipkart style strike price
  const originalPrice = Math.floor(product.price * 1.25);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-img-wrap">
        <img src={product.image} alt={product.name} />
      </Link>

      <span className="product-card-category">{product.category}</span>
      <Link to={`/products/${product.id}`} className="product-card-title">
        {product.name}
      </Link>

      <div className="badge-green" style={{ marginBottom: '12px' }}>
        <span>{product.rating}</span>
        <Star size={10} fill="currentColor" />
      </div>

      <div className="product-card-price" style={{ marginBottom: '16px' }}>
        <span>₹{product.price.toLocaleString('en-IN')}</span>
        <span style={{ fontSize: '12px', color: 'var(--fk-text-light)', textDecoration: 'line-through', fontWeight: '400' }}>
          ₹{originalPrice.toLocaleString('en-IN')}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--fk-green)', fontWeight: '500' }}>25% off</span>
      </div>

      <div style={{ width: '100%', marginTop: 'auto' }}>
        <button 
          className="btn-buy" 
          style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '2px', background: 'var(--fk-blue)' }} 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
