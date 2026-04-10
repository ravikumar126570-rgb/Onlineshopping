import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function ProductsPage({ products }) {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  return (
    <div className="main-container section-spacing">
      <div className="plp-layout">
        {/* Sidebar Filters */}
        <aside className="plp-sidebar">
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '20px' }}>Filters</h3>
          
          <div className="filter-group" style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', marginBottom: '12px' }}>Categories</h4>
            <div className="category-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map((category) => (
                <label 
                  key={category} 
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: selectedCategory === category ? 'var(--fk-blue)' : 'inherit',
                    fontWeight: selectedCategory === category ? '500' : '400'
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === category} 
                    readOnly 
                    style={{ cursor: 'pointer' }}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 style={{ fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', marginBottom: '12px' }}>Search</h4>
            <input
              type="text"
              placeholder="Search in results..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="auth-input"
              style={{ padding: '8px', fontSize: '14px' }}
            />
          </div>
        </aside>

        {/* Main Products Grid */}
        <main className="plp-main">
          <div className="plp-header">
            <h1 style={{ fontSize: '16px', fontWeight: '500' }}>
              {selectedCategory !== 'All' ? `${selectedCategory} Products` : 'All Products'}
              <span style={{ color: 'var(--fk-text-light)', fontSize: '12px', marginLeft: '8px' }}>
                ({filteredProducts.length} items)
              </span>
            </h1>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="plp-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductsPage;
