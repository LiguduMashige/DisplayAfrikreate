import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import BackgroundAnimations from '../components/BackgroundAnimations';
import authService from '../services/authService';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const { actions } = useAppContext();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricMessage, setBiometricMessage] = useState('');
  const [useBiometric, setUseBiometric] = useState(true); // Auto-enable for all devices
  
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const result = await authService.checkBiometricSupport();
    setBiometricAvailable(result.supported);
    setBiometricMessage(result.message);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    try {
      const result = await authService.authenticateWithBiometric();
      
      if (result.success) {
        const user = {
          id: Date.now(),
          firstName: result.username.split('@')[0],
          lastName: 'User',
          email: result.username,
          name: result.username.split('@')[0] + ' User',
          username: result.username.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.username}`,
          bio: 'Art enthusiast and creative supporter',
          biometricEnabled: true
        };
        
        actions.setUser(user);
        actions.setAuthenticated(true);
        
        if (onLogin) {
          onLogin();
        }
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const user = {
        id: Date.now(),
        firstName: formData.firstName || formData.email.split('@')[0],
        lastName: formData.lastName || 'User',
        email: formData.email,
        name: `${formData.firstName || formData.email.split('@')[0]} ${formData.lastName || 'User'}`,
        username: formData.email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        bio: 'Art enthusiast and creative supporter'
      };

      // Try secure authentication (optional, won't block if it fails)
      try {
        await authService.secureLogin(formData.email, formData.password);
      } catch (secureError) {
        console.log('Secure storage unavailable, using basic auth:', secureError.message);
      }

      // For NEW accounts, ALWAYS prompt for fingerprint registration if available
      if (!isLogin && biometricAvailable) {
        setIsLoading(false); // Stop loading to show prompt
        
        // Show alert explaining fingerprint registration
        const shouldRegisterBiometric = window.confirm(
          '🔐 Secure Your Account\n\n' +
          'Would you like to enable fingerprint login?\n\n' +
          'This allows you to login quickly and securely using your fingerprint instead of typing your password.\n\n' +
          'Click OK to register your fingerprint now.'
        );

        if (shouldRegisterBiometric) {
          setIsLoading(true);
          try {
            await authService.registerBiometric(
              formData.email,
              `${formData.firstName} ${formData.lastName}`
            );
            console.log('✅ Biometric authentication registered successfully!');
            alert('✅ Fingerprint registered!\n\nYou can now login with your fingerprint or password.');
          } catch (bioError) {
            console.log('Biometric registration failed:', bioError.message);
            alert('⚠️ Fingerprint registration failed.\n\nDon\'t worry - you can still login with your password.');
          }
        } else {
          alert('ℹ️ Fingerprint skipped\n\nYou can login with your password. You can enable fingerprint login later in settings.');
        }
      }

      // Set user and authenticate
      actions.setUser(user);
      actions.setAuthenticated(true);
      
      if (onLogin) {
        onLogin();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <BackgroundAnimations intensity="medium" theme="purple" />
      <div className="logo-section-outside">
        <img 
          src={`${process.env.PUBLIC_URL}/images/logo-new/Afrikreate Logo Transparant.png`}
          alt="AfriKreate Logo" 
          className="logo-outside"
          onError={(e) => {
            console.log('Logo failed to load from:', e.target.src);
            e.target.src = "/images/logo-new/Afrikreate Logo Transparant.png";
          }}
        />
      </div>
      <div className="login-card">
        <div className="form-section">
          <h2 className="form-title">
            {isLogin ? 'Welcome Back' : 'Create New Account'}
          </h2>
          <p className="form-subtitle">
            {isLogin 
              ? 'Sign in to continue your creative journey' 
              : 'Join AfriKreate and support South African artists'
            }
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            {biometricAvailable && !isLogin && (
              <div className="biometric-info">
                <p style={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  margin: '1rem 0',
                  padding: '0.8rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  🔐 Fingerprint login will be set up after you create your account
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            {biometricAvailable && isLogin && (
              <>
                <div className="divider">
                  <span>OR</span>
                </div>
                <button 
                  type="button"
                  onClick={handleBiometricLogin}
                  className="biometric-button"
                  disabled={isLoading}
                >
                  <span className="fingerprint-icon">👆</span>
                  Sign in with Biometric
                </button>
              </>
            )}
          </form>

          <div className="toggle-form">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ firstName: '', lastName: '', email: '', password: '' });
                  setErrors({});
                }}
              >
                {isLogin ? 'Create Account' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
