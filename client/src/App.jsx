import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import { useAuth } from './context/AuthContext';
import { useProducts } from './hooks/useProducts';
import AboutPage from './pages/AboutPage';
import AboutMePage from './pages/AboutMePage';
import AboutWebsitePage from './pages/AboutWebsitePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/SignupPage';

const DARK_MODE_KEY = 'microflip-dark-mode';

function App() {
  const auth = useAuth();
  const { addProduct, error: productsError, isLoading: isProductsLoading, products, removeProduct, updateProduct } =
    useProducts();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem(DARK_MODE_KEY);
    if (storedTheme) {
      return storedTheme === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  if (isBooting || auth.isLoading || isProductsLoading) {
    return <Spinner fullScreen label="Launching MicroFlip Shop..." />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            auth={auth}
            products={products}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode((current) => !current)}
          />
        }
      >
        <Route index element={<HomePage products={products} />} />
        <Route path="products" element={<ProductsPage products={products} />} />
        <Route path="products/:productId" element={<ProductDetailsPage products={products} />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="about-me" element={<AboutMePage />} />
        <Route path="about-website" element={<AboutWebsitePage />} />
        <Route
          path="admin"
          element={
            <AdminDashboardPage
              auth={auth}
              onAddProduct={addProduct}
              onDeleteProduct={removeProduct}
              onUpdateProduct={updateProduct}
              products={products}
              productsError={productsError}
            />
          }
        />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
