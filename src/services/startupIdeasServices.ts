import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface StartupIdea {
  id: string;
  title: string;
  description: string;
  industry: string[];
  investment_level: string;
  time_to_market: string;
  team_size: string;
  potential_revenue: string;
  trend_score: number;
  upvotes: number;
  resources: object;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export const startupIdeasServices = {
  // Get startup idea by ID
  async getStartupIdeaById(ideaId: string): Promise<{ idea: StartupIdea | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('startup_ideas')
      .select('*')
      .eq('id', ideaId)
      .single();

    if (error) {
      console.error('Error getting startup idea:', error);
      return { idea: null, error };
    }

    return { idea: data as StartupIdea, error: null };
  },

  // Update startup idea
  async updateStartupIdea(ideaId: string, ideaData: Partial<StartupIdea>): Promise<{ idea: StartupIdea | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('startup_ideas')
      .update({
        ...ideaData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', ideaId)
      .select()
      .single();

    if (error) {
      console.error('Error updating startup idea:', error);
      return { idea: null, error };
    }

    return { idea: data as StartupIdea, error: null };
  },
};