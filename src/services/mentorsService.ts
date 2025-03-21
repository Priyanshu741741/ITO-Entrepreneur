import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface Mentor {
  id: string;
  user_id: string;
  title: string;
  company: string;
  hourly_rate: number;
  expertise: string[];
  industries: string[];
  education: string;
  experience: string;
  availability: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export const mentorsService = {
  // Get mentor by user ID
  async getMentorByUserId(userId: string): Promise<{ mentor: Mentor | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error getting mentor:', error);
      return { mentor: null, error };
    }

    return { mentor: data as Mentor, error: null };
  },

  // Update mentor profile
  async updateMentorProfile(mentorId: string, mentorData: Partial<Mentor>): Promise<{ mentor: Mentor | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('mentors')
      .update({
        ...mentorData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', mentorId)
      .select()
      .single();

    if (error) {
      console.error('Error updating mentor profile:', error);
      return { mentor: null, error };
    }

    return { mentor: data as Mentor, error: null };
  },
};