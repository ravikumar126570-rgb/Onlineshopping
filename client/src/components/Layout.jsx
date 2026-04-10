import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ products, isDarkMode, onToggleDarkMode, auth }) {
  return (
    <div className="app-shell">
      <Navbar auth={auth} />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
