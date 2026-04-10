import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const {
    cartItems,
    cartTotal,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = cartItems.length > 0 ? (cartTotal > 500 ? 0 : 40) : 0;
  const discount = Math.floor(cartTotal * 0.1); // Simulated 10% discount
  const finalTotal = cartTotal + deliveryFee - discount;

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="main-container section-spacing">
        <div className="empty-state card">
          <h2>Order placed successfully!</h2>
          <p>Thank you for shopping with RAVISHOP. Your order is being processed.</p>
          <Link className="btn-view-all" style={{ marginTop: '20px' }} to="/products">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="main-container section-spacing">
        <div className="empty-state card">
          <img 
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
            alt="empty cart" 
            style={{ width: '200px', marginBottom: '20px' }}
          />
          <h2>Your cart is empty!</h2>
          <p>Add items to it now.</p>
          <Link className="btn-view-all" style={{ marginTop: '20px' }} to="/products">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container section-spacing">
      <div className="cart-layout">
        <div className="cart-main">
          <div className="cart-header">
            My Cart ({cartItems.length})
          </div>
          
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item-left">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <input type="text" className="qty-input" value={item.quantity} readOnly />
                  <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              
              <div className="cart-item-right">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <div className="cart-item-price">
                  <span>₹{item.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: '14px', color: 'var(--fk-green)', marginLeft: '12px' }}>2 offers applied</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(item.id)}>REMOVE</button>
                </div>
              </div>
            </article>
          ))}

          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', boxShadow: '0 -2px 10px 0 rgba(0,0,0,.1)' }}>
            <button className="btn-buy" style={{ width: '250px' }} onClick={handleCheckout}>PLACE ORDER</button>
          </div>
        </div>

        <aside className="cart-sidebar">
          <div className="price-details">
            <div className="price-details-header">PRICE DETAILS</div>
            <div className="price-details-body">
              <div className="price-row">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span style={{ color: 'var(--fk-green)' }}>- ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span style={{ color: deliveryFee === 0 ? 'var(--fk-green)' : 'inherit' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              
              <div className="price-row price-total">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              
              <p style={{ color: 'var(--fk-green)', fontWeight: '500', fontSize: '14px', marginTop: '12px' }}>
                You will save ₹{discount} on this order
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--fk-text-light)', fontSize: '14px', fontWeight: '500' }}>
            <Zap size={20} fill="currentColor" />
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
