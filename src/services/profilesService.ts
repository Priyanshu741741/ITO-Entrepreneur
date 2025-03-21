import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export const profilesService = {
  // Get user profile
  async getUserProfile(userId: string): Promise<{ profile: UserProfile | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting user profile:', error);
      return { profile: null, error };
    }

    return { profile: data as UserProfile, error: null };
  },

  // Update user profile
  async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<{ profile: UserProfile | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return { profile: null, error };
    }

    return { profile: data as UserProfile, error: null };
  },
};