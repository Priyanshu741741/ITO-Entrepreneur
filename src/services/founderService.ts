// src/services/founderService.ts
import { supabase } from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

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

export interface FounderWithProfile extends Founder {
  profiles: {
    full_name: string;
    avatar_url: string;
    location: string;
    bio: string;
  };
}

export const founderService = {
  // Get all founders
  async getAllFounders(): Promise<FounderWithProfile[]> {
    const { data, error } = await supabase
      .from('founders')
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
      console.error('Error fetching founders:', error);
      throw error;
    }

    return data || [];
  },

  // Get founder by ID
  async getFounderById(id: string): Promise<FounderWithProfile | null> {
    const { data, error } = await supabase
      .from('founders')
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
      console.error('Error fetching founder:', error);
      throw error;
    }

    return data;
  },

  // Get founder by user ID
  async getFounderByUserId(userId: string): Promise<FounderWithProfile | null> {
    const { data, error } = await supabase
      .from('founders')
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
      console.error('Error fetching founder by user ID:', error);
      throw error;
    }

    return data;
  },

  // Create or update founder profile
  async upsertFounderProfile(founderData: Partial<Founder>): Promise<Founder> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('You must be logged in to create a founder profile');
    }

    const userId = user.data.user.id;
    const existingFounder = await this.getFounderByUserId(userId);

    const founderId = existingFounder?.id || uuidv4();
    const { data, error } = await supabase
      .from('founders')
      .upsert({
        id: founderId,
        user_id: userId,
        ...founderData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting founder profile:', error);
      throw error;
    }

    return data;
  },

  // Search founders by criteria
  async searchFounders(
    searchQuery: string = '',
    skills: string[] = [],
    interests: string[] = [],
    commitment: string = ''
  ): Promise<FounderWithProfile[]> {
    let query = supabase
      .from('founders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url,
          location,
          bio
        )
      `);

    if (skills.length > 0) {
      query = query.contains('skills', skills);
    }

    if (interests.length > 0) {
      query = query.contains('interests', interests);
    }

    if (commitment) {
      query = query.eq('commitment', commitment);
    }

    if (searchQuery) {
      query = query.or(`
        profiles.full_name.ilike.%${searchQuery}%,
        title.ilike.%${searchQuery}%,
        profiles.bio.ilike.%${searchQuery}%
      `);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching founders:', error);
      throw error;
    }

    return data || [];
  },

  // Calculate match percentage between two users
  // src/services/founderService.ts (continued)
  // Calculate match percentage between two users
  async calculateMatchPercentage(userId1: string, userId2: string): Promise<number> {
    try {
      const founder1 = await this.getFounderByUserId(userId1);
      const founder2 = await this.getFounderByUserId(userId2);
      
      if (!founder1 || !founder2) {
        return 0;
      }
      
      // Calculate match based on complementary skills, shared interests, and commitment
      let matchScore = 0;
      let totalFactors = 0;
      
      // Check if founder1's skills are in founder2's looking_for list and vice versa
      const skillsMatch1 = founder1.skills.some(skill => 
        founder2.looking_for.includes(skill)
      );
      
      const skillsMatch2 = founder2.skills.some(skill => 
        founder1.looking_for.includes(skill)
      );
      
      if (skillsMatch1) matchScore += 35;
      if (skillsMatch2) matchScore += 35;
      totalFactors += 70;
      
      // Check for shared interests
      const sharedInterests = founder1.interests.filter(interest => 
        founder2.interests.includes(interest)
      );
      
      const interestScore = Math.min(sharedInterests.length * 5, 20);
      matchScore += interestScore;
      totalFactors += 20;
      
      // Check compatibility of commitment levels
      if (founder1.commitment === founder2.commitment) {
        matchScore += 10;
      }
      totalFactors += 10;
      
      // Calculate final percentage
      return Math.round((matchScore / totalFactors) * 100);
    } catch (error) {
      console.error('Error calculating match percentage:', error);
      return 0;
    }
  }
};