import { supabase } from '../utils/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface PitchEvent {
  id: string;
  title: string;
  date: string;
  duration: string;
  organizer: string;
  organizer_id: string;
  organizer_logo: string;
  category: string;
  description: string;
  max_attendees: number;
  is_featured: boolean;
  registration_open: boolean;
  created_at: string;
  updated_at: string;
}

export const pitchingServices = {
  // Get pitch event by ID
  async getPitchEventById(eventId: string): Promise<{ event: PitchEvent | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('pitch_events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) {
      console.error('Error getting pitch event:', error);
      return { event: null, error };
    }

    return { event: data as PitchEvent, error: null };
  },

  // Update pitch event
  async updatePitchEvent(eventId: string, eventData: Partial<PitchEvent>): Promise<{ event: PitchEvent | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('pitch_events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', eventId)
      .select()
      .single();

    if (error) {
      console.error('Error updating pitch event:', error);
      return { event: null, error };
    }

    return { event: data as PitchEvent, error: null };
  },
};