// src/pages/Signup/Signup.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Signup.module.css';
import { AuthError } from '@supabase/supabase-js';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Insert into profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            created_at: new Date().toISOString(),
          });

        if (profileError) throw profileError;

        setSuccess(true);
        // If email confirmation is disabled, redirect to dashboard
        if (!data.user.identities?.[0].identity_data?.email_verified) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setError((error as AuthError).message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'github' | 'linkedin') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/complete-profile`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError((error as AuthError).message || `An error occurred during ${provider} sign up`);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <div className={styles.successMessage}>
            <h2>Registration Successful!</h2>
            <p>
              Please check your email to confirm your account. Once confirmed, you can sign in.
            </p>
            <Link to="/login" className={styles.signupButton}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupHeader}>
          <h1 className={styles.signupTitle}>
            Join ITO to connect with mentors, founders, and investors
          </h1>
          <p className={styles.signupSubtitle}>
            Join ITO to connect with mentors, founders, and investors
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        <form onSubmit={handleEmailSignup} className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.formLabel}>
              <FaUser className={styles.inputIcon} />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={styles.formGroup}>
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
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              <FaLock className={styles.inputIcon} />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Create a password"
              required
              minLength={8}
            />
            <p className={styles.passwordHint}>
              Password must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            className={styles.signupButton}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.socialSignup}>
          <button
            onClick={() => handleOAuthSignup('google')}
            className={`${styles.socialButton} ${styles.googleButton}`}
            disabled={loading}
          >
            <FaGoogle className={styles.socialIcon} />
            Sign up with Google
          </button>
          <button
            onClick={() => handleOAuthSignup('github')}
            className={`${styles.socialButton} ${styles.githubButton}`}
            disabled={loading}
          >
            <FaGithub className={styles.socialIcon} />
            Sign up with GitHub
          </button>
          <button
            onClick={() => handleOAuthSignup('linkedin')}
            className={`${styles.socialButton} ${styles.linkedinButton}`}
            disabled={loading}
          >
            <FaLinkedin className={styles.socialIcon} />
            Sign up with LinkedIn
          </button>
        </div>

        <div className={styles.loginPrompt}>
          Already have an account?{' '}
          <Link to="/login" className={styles.loginLink}>
            Sign in
          </Link>
        </div>

        <p className={styles.termsText}>
          By signing up, you agree to our{' '}
          <Link to="/terms">Terms of Service</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;