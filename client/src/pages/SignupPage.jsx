import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signup(formData);
      navigate('/');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <div>
            <h2>Looks like you&apos;re new here!</h2>
            <p>Sign up with your mobile number to get started</p>
          </div>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
            alt="signup icon" 
            style={{ width: '100%', marginBottom: '40px' }}
          />
        </div>
        
        <div className="auth-right">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {error && <div className="form-message">{error}</div>}

            <div className="auth-input-group">
              <label>Enter Full Name</label>
              <input
                name="name"
                type="text"
                className="auth-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Enter Email</label>
              <input
                name="email"
                type="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Set Password</label>
              <input
                name="password"
                type="password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <p style={{ fontSize: '12px', color: 'var(--fk-text-light)', marginBottom: '20px' }}>
              By continuing, you agree to Flipkart&apos;s Terms of Use and Privacy Policy.
            </p>

            <button type="submit" className="btn-orange" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'CONTINUE'}
            </button>

            <div className="auth-switch">
              <Link to="/login">Existing User? Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
