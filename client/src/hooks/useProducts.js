import { useEffect, useState } from 'react';
import fallbackProducts from '../data/products.json';
import { apiRequest } from '../lib/api';

export function useProducts() {
  const [products, setProducts] = useState(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await apiRequest('/products');

        if (!isMounted) {
          return;
        }

        setProducts(Array.isArray(response.products) ? response.products : fallbackProducts);

        setError('');
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setProducts(fallbackProducts);
        setError(loadError.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const addProduct = (product) => {
    setProducts((current) => [product, ...current]);
  };

  const removeProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId));
  };

  const updateProduct = (updatedProduct) => {
    setProducts((current) =>
      current.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    );
  };

  return {
    addProduct,
    error,
    isLoading,
    products,
    removeProduct,
    updateProduct,
  };
}
