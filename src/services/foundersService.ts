import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface Founder {
  id: string;
  user_id: string;
  title: string;
  looking_for: string[];
  skills: string[];
  interests: string[];
  education: string;
  experience: string;
  availability: string;
  commitment: string;
  created_at: string;
  updated_at: string;
}

export const foundersService = {
  // Get founder by user ID
  async getFounderByUserId(userId: string): Promise<{ founder: Founder | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('founders')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error getting founder:', error);
      return { founder: null, error };
    }

    return { founder: data as Founder, error: null };
  },

  // Update founder profile
  async updateFounderProfile(founderId: string, founderData: Partial<Founder>): Promise<{ founder: Founder | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('founders')
      .update({
        ...founderData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', founderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating founder profile:', error);
      return { founder: null, error };
    }

    return { founder: data as Founder, error: null };
  },
};