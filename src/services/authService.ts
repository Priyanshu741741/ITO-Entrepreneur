import { supabase } from '../utils/supabaseClient';
import { AuthError, User } from '@supabase/supabase-js';

export interface UserCredentials {
  email: string;
  password: string;
}

export const authService = {
  // Register a new user
  async register(credentials: UserCredentials): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('Error registering user:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  },

  // Login user
  async login(credentials: UserCredentials): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('Error logging in:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  },

  // Logout user
  async logout(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error);
      return { error };
    }

    return { error: null };
  },

  // Get current user
  async getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting current user:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  },
};