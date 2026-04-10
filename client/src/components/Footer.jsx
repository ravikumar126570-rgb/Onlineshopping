import { Link } from 'react-router-dom';
import { Briefcase, HelpCircle, ShieldCheck, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h3>ABOUT</h3>
          <ul>
            <li><Link to="/about">Contact Us</Link></li>
            <li><Link to="/about-me">About Us</Link></li>
            <li><Link to="/about-website">Flipkart Stories</Link></li>
            <li><Link to="/about">Press</Link></li>
          </ul>
        </div>
        
        <div className="footer__col">
          <h3>HELP</h3>
          <ul>
            <li><Link to="/">Payments</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/">Cancellation & Returns</Link></li>
            <li><Link to="/">FAQ</Link></li>
          </ul>
        </div>
        
        <div className="footer__col">
          <h3>POLICY</h3>
          <ul>
            <li><Link to="/">Return Policy</Link></li>
            <li><Link to="/">Terms Of Use</Link></li>
            <li><Link to="/">Security</Link></li>
            <li><Link to="/">Privacy</Link></li>
          </ul>
        </div>
        
        <div className="footer__col">
          <h3>SOCIAL</h3>
          <ul>
            <li><a href="https://github.com/ravikumar126570-rgb" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/ravi-kumar-7a0542340/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/mr_ravigupta_07/" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__bottom-links">
          <div className="footer__bottom-link">
            <Briefcase size={16} />
            <span>Become a Seller</span>
          </div>
          <div className="footer__bottom-link">
            <HelpCircle size={16} />
            <span>Help Center</span>
          </div>
          <div className="footer__bottom-link">
            <ShieldCheck size={16} />
            <span>Security</span>
          </div>
        </div>
        
        <div style={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          © 2026 RAVISHOP. Made with <Heart size={14} fill="#ff4d4d" color="#ff4d4d" /> for the community.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
