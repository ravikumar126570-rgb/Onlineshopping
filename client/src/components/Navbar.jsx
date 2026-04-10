import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Navbar({ auth }) {
  const [query, setQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated, logout, user } = auth;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    navigate(`/products${normalizedQuery ? `?search=${encodeURIComponent(normalizedQuery)}` : ''}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner main-container">
        <Link className="navbar__brand" to="/">
          <h2>RAVISHOP</h2>
          <div className="explore">Explore <span>Plus</span></div>
        </Link>

        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        <nav className="navbar__actions">
          {isAuthenticated ? (
            <div className="nav-link">
              <User size={20} />
              <span>{user?.name?.split(' ')[0] || 'User'}</span>
            </div>
          ) : (
            <Link className="btn-login" to="/login">Login</Link>
          )}

          {isAdmin && (
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          )}

          <NavLink className="nav-link" to="/cart">
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: '#ff0000',
                  color: '#fff',
                  fontSize: '10px',
                  padding: '2px 5px',
                  borderRadius: '50%',
                  fontWeight: '700'
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>

          {isAuthenticated && (
            <span className="nav-link" style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
