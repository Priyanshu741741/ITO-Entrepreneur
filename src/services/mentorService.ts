// src/services/mentorService.ts
import { supabase } from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

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

export interface MentorWithProfile extends Mentor {
  profiles: {
    full_name: string;
    avatar_url: string;
    location: string;
    bio: string;
  };
}

export const mentorService = {
  // Get all mentors
  async getAllMentors(): Promise<MentorWithProfile[]> {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mentors:', error);
      throw error;
    }

    return data || [];
  },

  // Get featured mentors
  async getFeaturedMentors(): Promise<MentorWithProfile[]> {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured mentors:', error);
      throw error;
    }

    return data || [];
  },

  // Get mentor by ID
  async getMentorById(id: string): Promise<MentorWithProfile | null> {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching mentor:', error);
      throw error;
    }

    return data;
  },

  // Get mentor by user ID
  async getMentorByUserId(userId: string): Promise<MentorWithProfile | null> {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching mentor by user ID:', error);
      throw error;
    }

    return data;
  },

  // Create or update mentor profile
  async upsertMentorProfile(mentorData: Partial<Mentor>): Promise<Mentor> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('You must be logged in to create a mentor profile');
    }

    const userId = user.data.user.id;
    const existingMentor = await this.getMentorByUserId(userId);

    const mentorId = existingMentor?.id || uuidv4();
    const { data, error } = await supabase
      .from('mentors')
      .upsert({
        id: mentorId,
        user_id: userId,
        ...mentorData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting mentor profile:', error);
      throw error;
    }

    return data;
  },

  // Search mentors by criteria
  async searchMentors(
    searchQuery: string = '',
    expertise: string[] = [],
    industries: string[] = [],
    minRating: number = 0
  ): Promise<MentorWithProfile[]> {
    let query = supabase
      .from('mentors')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `)
      .gte('rating', minRating);

    if (expertise.length > 0) {
      query = query.contains('expertise', expertise);
    }

    if (industries.length > 0) {
      query = query.contains('industries', industries);
    }

    if (searchQuery) {
      query = query.or(`
        profiles.full_name.ilike.%${searchQuery}%,
        title.ilike.%${searchQuery}%,
        company.ilike.%${searchQuery}%,
        profiles.bio.ilike.%${searchQuery}%
      `);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) {
      console.error('Error searching mentors:', error);
      throw error;
    }

    return data || [];
  }
};