// src/pages/Login/Login.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';
import type { AuthError } from '@supabase/supabase-js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  
  // Clear error when user starts typing again
  useEffect(() => {
    if (error) setError(null);
  }, [error]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Show success animation before redirecting
      setLoginSuccess(true);
      
      // Redirect after short delay to show animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      setError((error as AuthError).message || 'An error occurred during sign in');
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError((error as AuthError).message || `An error occurred during ${provider} sign in`);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginPage}>
      <div className={`${styles.loginContainer} ${loginSuccess ? styles.loginSuccess : ''}`}>
        {loginSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Login Successful!</h2>
            <p>Redirecting you to dashboard...</p>
          </div>
        ) : (
          <>
            <div className={styles.loginHeader}>
              <h1 className={styles.loginTitle}>Sign In to ITO</h1>
              <p className={styles.loginSubtitle}>
                Connect with mentors, founders, and investors
              </p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <span className={styles.errorIcon}>!</span>
                {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className={styles.loginForm}>
              <div className={`${styles.formGroup} ${isEmailFocused || email ? styles.focused : ''}`}>
                <label htmlFor="email" className={styles.formLabel}>
                  <FaEnvelope className={styles.inputIcon} />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}
                  placeholder="Enter your email"
                  required
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </div>

              <div className={`${styles.formGroup} ${isPasswordFocused || password ? styles.focused : ''}`}>
                <label htmlFor="password" className={styles.formLabel}>
                  <FaLock className={styles.inputIcon} />
                  Password
                </label>
                <div className={styles.passwordInputWrapper}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.formInput}
                    placeholder="Enter your password"
                    required
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <button 
                    type="button"
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className={styles.forgotPassword}>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className={`${styles.loginButton} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinnerContainer}>
                    <span className={styles.spinner} />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <div className={styles.socialLogin}>
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                className={`${styles.socialButton} ${styles.googleButton}`}
                disabled={loading}
              >
                <FaGoogle className={styles.socialIcon} />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                className={`${styles.socialButton} ${styles.githubButton}`}
                disabled={loading}
              >
                <FaGithub className={styles.socialIcon} />
                Continue with GitHub
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('linkedin')}
                className={`${styles.socialButton} ${styles.linkedinButton}`}
                disabled={loading}
              >
                <FaLinkedin className={styles.socialIcon} />
                Continue with LinkedIn
              </button>
            </div>

            <div className={styles.signupPrompt}>
              Don't have an account?{' '}
              <Link to="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;