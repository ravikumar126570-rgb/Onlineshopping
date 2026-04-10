import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';

const initialForm = {
  name: '',
  category: '',
  price: '',
  rating: '',
  stock: '',
  image: '',
  description: '',
};

function AdminDashboardPage({ auth, onAddProduct, onDeleteProduct, onUpdateProduct, products, productsError }) {
  const { authHeaders, isAdmin, isAuthenticated } = auth;
  const [formData, setFormData] = useState(initialForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="main-container section-spacing">
        <div className="empty-state card">
          <h2>Admin access required</h2>
          <p>Only admin users can manage the product catalog.</p>
          <Link className="btn-view-all" style={{ marginTop: '20px' }} to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      rating: product.rating.toString(),
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
    });
    setErrorMessage('');
    setStatusMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setFormData(initialForm);
    setErrorMessage('');
    setStatusMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    const scrub = (val) => val.replace(/[^0-9.]/g, '');

    const data = {
      ...formData,
      price: Number(scrub(formData.price)),
      rating: Number(scrub(formData.rating)),
      stock: Number(scrub(formData.stock)),
    };

    try {
      if (editingProductId) {
        const response = await apiRequest(`/products/${editingProductId}`, {
          method: 'PATCH',
          headers: authHeaders,
          body: data,
        });
        onUpdateProduct(response.product);
        setEditingProductId(null);
        setFormData(initialForm);
        setStatusMessage(response.message);
      } else {
        const response = await apiRequest('/products', {
          method: 'POST',
          headers: authHeaders,
          body: data,
        });
        onAddProduct(response.product);
        setFormData(initialForm);
        setStatusMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    setStatusMessage('');
    setErrorMessage('');
    setPendingDeleteId(productId);

    try {
      const response = await apiRequest(`/products/${productId}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      onDeleteProduct(productId);
      setStatusMessage(response.message);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setPendingDeleteId('');
    }
  };

  return (
    <div className="main-container section-spacing">
      <div className="admin-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <section className="admin-card">
          <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '20px', borderBottom: '1px solid var(--fk-border)', paddingBottom: '10px' }}>
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Product Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="auth-input" placeholder="e.g. Samsung Galaxy S23" />
            </div>
            <div className="auth-input-group">
              <label>Category</label>
              <input name="category" value={formData.category} onChange={handleChange} required className="auth-input" placeholder="e.g. Smartphones" />
            </div>
            <div className="auth-input-group">
              <label>Price (₹)</label>
              <input name="price" type="text" value={formData.price} onChange={handleChange} required className="auth-input" placeholder="e.g. 74999" />
            </div>
            <div className="auth-input-group">
              <label>Rating (1-5)</label>
              <input name="rating" type="text" value={formData.rating} onChange={handleChange} required className="auth-input" placeholder="e.g. 4.8" />
            </div>
            <div className="auth-input-group">
              <label>Stock Quantity</label>
              <input name="stock" type="text" value={formData.stock} onChange={handleChange} required className="auth-input" placeholder="e.g. 50" />
            </div>
            <div className="auth-input-group">
              <label>Image URL</label>
              <input name="image" value={formData.image} onChange={handleChange} required className="auth-input" placeholder="Full image URL" />
            </div>
            <div className="auth-input-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="auth-input" style={{ border: '1px solid #e0e0e0', borderRadius: '2px', padding: '8px' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="submit" className="btn-buy" style={{ flex: 1 }} disabled={isSubmitting}>
                {isSubmitting ? (editingProductId ? 'Updating...' : 'Adding...') : (editingProductId ? 'Update Product' : 'Add Product')}
              </button>
              {editingProductId && (
                <button type="button" onClick={handleCancel} className="qty-btn" style={{ width: 'auto', borderRadius: '2px', padding: '0 20px', fontSize: '14px' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {statusMessage && <p style={{ color: 'var(--fk-green)', marginTop: '16px', fontWeight: '500' }}>{statusMessage}</p>}
          {errorMessage && <div className="form-message" style={{ marginTop: '16px' }}>{errorMessage}</div>}
        </section>

        <section className="admin-card">
          <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '20px', borderBottom: '1px solid var(--fk-border)', paddingBottom: '10px' }}>
            Current Catalog
          </h2>
          <div className="admin-product-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {products.map((product) => (
              <div key={product.id} className="admin-product-item" style={{ background: 'var(--fk-bg)', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{product.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--fk-text-light)' }}>{product.category} • ₹{product.price.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '12px', color: 'var(--fk-green)' }}>{product.stock} in stock</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="qty-btn"
                    style={{ width: 'auto', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', color: 'var(--fk-blue)', borderColor: 'var(--fk-blue)' }}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="qty-btn"
                    style={{ width: 'auto', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', color: '#ff0000', borderColor: '#ff0000' }}
                    onClick={() => handleDelete(product.id)}
                    disabled={pendingDeleteId === product.id}
                  >
                    {pendingDeleteId === product.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
