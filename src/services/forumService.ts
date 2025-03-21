// src/services/forumService.ts
import { supabase } from '../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { PostgrestError } from '@supabase/supabase-js';

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  is_pinned: boolean;
  is_answered: boolean;
  created_at: string;
  last_activity: string;
  author?: {
    id: string;
    full_name: string;
    avatar_url: string;
    role?: string;
  };
  is_liked?: boolean;
}

export interface ForumComment {
  id: string;
  topic_id: string;
  content: string;
  author_id: string;
  likes: number;
  is_answer: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string;
    avatar_url: string;
    role?: string;
  };
  is_liked?: boolean;
}

export const forumService = {
  // Get all forum topics
  async getAllTopics(): Promise<{ topics: ForumTopic[]; error: PostgrestError | null }> {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `);

    if (userId) {
      query = supabase
        .from('forum_topics')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_topic_likes(user_id)
        `);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching forum topics:', error);
      return { topics: [], error };
    }

    return {
      topics: (data || []).map(topic => ({
        ...topic,
        is_liked: userId ? topic.liked?.some((l: { user_id: string }) => l.user_id === userId) || false : false
      })),
      error: null
    };
  },

  // Get pinned forum topics
  async getPinnedTopics(): Promise<{ topics: ForumTopic[]; error: PostgrestError | null }> {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .eq('is_pinned', true);

    if (userId) {
      query = supabase
        .from('forum_topics')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_topic_likes(user_id)
        `)
        .eq('is_pinned', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pinned forum topics:', error);
      return { topics: [], error };
    }

    return {
      topics: (data || []).map(topic => ({
        ...topic,
        is_liked: userId ? topic.liked?.some((l: { user_id: string }) => l.user_id === userId) || false : false
      })),
      error: null
    };
  },

  // Get topic by ID
  async getTopicById(id: string): Promise<ForumTopic | null> {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .eq('id', id);

    if (userId) {
      query = supabase
        .from('forum_topics')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_topic_likes(user_id)
        `)
        .eq('id', id);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching forum topic:', error);
      throw error;
    }

    if (!data) return null;

    await this.incrementTopicViews(id);

    return {
      ...data,
      is_liked: userId ? data.liked?.some((l: { user_id: string }) => l.user_id === userId) || false : false
    };
  },

  // Increment view count for a topic
  async incrementTopicViews(id: string): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.rpc('increment_topic_views', { topic_id: id });

    if (error) {
      console.error('Error incrementing views:', error);
      return { error };
    }
    
    return { error: null };
  },

  // Create a new forum topic
  async createTopic(topicData: { 
    title: string; 
    content: string; 
    category: string; 
    tags: string[] 
  }): Promise<{ topic: ForumTopic | null; error: PostgrestError | Error | null }> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { topic: null, error: new Error('You must be logged in to create a topic') };
    }

    const topicId = uuidv4();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('forum_topics')
      .insert({
        id: topicId,
        title: topicData.title,
        content: topicData.content,
        author_id: user.data.user.id,
        category: topicData.category,
        tags: topicData.tags,
        views: 0,
        likes: 0,
        comments: 0,
        is_pinned: false,
        is_answered: false,
        created_at: now,
        last_activity: now
      })
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .single();

    if (error) {
      console.error('Error creating forum topic:', error);
      return { topic: null, error };
    }

    return {
      topic: {
        ...data,
        is_liked: false
      },
      error: null
    };
  },

  // Get comments for a topic
  async getCommentsByTopicId(topicId: string): Promise<{ comments: ForumComment[]; error: PostgrestError | null }> {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    let query = supabase
      .from('forum_comments')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .eq('topic_id', topicId);

    if (userId) {
      query = supabase
        .from('forum_comments')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_comment_likes(user_id)
        `)
        .eq('topic_id', topicId);
    }

    const { data, error } = await query.order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching forum comments:', error);
      return { comments: [], error };
    }

    return {
      comments: (data || []).map(comment => ({
      ...comment,
      is_liked: userId ? comment.liked?.some((l: { user_id: string }) => l.user_id === userId) || false : false
    })),
      error: null
    };
  },

  // Create a comment on a topic
  async createComment(topicId: string, content: string): Promise<{ comment: ForumComment | null; error: PostgrestError | Error | null }> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { comment: null, error: new Error('You must be logged in to comment') };
    }

    const commentId = uuidv4();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('forum_comments')
      .insert({
        id: commentId,
        topic_id: topicId,
        content,
        author_id: user.data.user.id,
        likes: 0,
        is_answer: false,
        created_at: now,
        updated_at: now
      })
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return { comment: null, error };
    }

    const { error: updateError } = await supabase
      .from('forum_topics')
      .update({
        comments: supabase.rpc('increment_comment_count', { topic_id: topicId }),
        last_activity: now
      })
      .eq('id', topicId);

    if (updateError) {
      console.error('Error updating topic after comment:', updateError);
    }

    return {
      comment: {
        ...data,
        is_liked: false
      },
      error: null
    };
  },

  // Toggle like on a topic
  async toggleTopicLike(topicId: string): Promise<{ isLiked: boolean; error: PostgrestError | Error | null }> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { isLiked: false, error: new Error('You must be logged in to like topics') };
    }

    const userId = user.data.user.id;

    const { data: existingLike } = await supabase
      .from('forum_topic_likes')
      .select('id')
      .eq('topic_id', topicId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('forum_topic_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        console.error('Error removing topic like:', deleteError);
        return { isLiked: false, error: deleteError };
      }

      const { error: updateError } = await supabase.rpc('decrement_topic_likes', { topic_id: topicId });
      if (updateError) {
        console.error('Error decrementing topic likes:', updateError);
        return { isLiked: false, error: updateError };
      }

      return { isLiked: false, error: null };
    }

    const { error: insertError } = await supabase
      .from('forum_topic_likes')
      .insert({
        id: uuidv4(),
        topic_id: topicId,
        user_id: userId
      });

    if (insertError) {
      console.error('Error liking topic:', insertError);
      return { isLiked: false, error: insertError };
    }

    const { error: updateError } = await supabase.rpc('increment_topic_likes', { topic_id: topicId });
    if (updateError) {
      console.error('Error incrementing topic likes:', updateError);
      return { isLiked: false, error: updateError };
    }

    return { isLiked: true, error: null };
  },

  // Toggle like on a comment
  async toggleCommentLike(commentId: string): Promise<{ isLiked: boolean; error: PostgrestError | Error | null }> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { isLiked: false, error: new Error('You must be logged in to like comments') };
    }

    const userId = user.data.user.id;

    const { data: existingLike } = await supabase
      .from('forum_comment_likes')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('forum_comment_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        console.error('Error removing comment like:', deleteError);
        return { isLiked: false, error: deleteError };
      }

      const { error: updateError } = await supabase.rpc('decrement_comment_likes', { comment_id: commentId });
      if (updateError) {
        console.error('Error decrementing comment likes:', updateError);
        return { isLiked: false, error: updateError };
      }

      return { isLiked: false, error: null };
    }

    const { error: insertError } = await supabase
      .from('forum_comment_likes')
      .insert({
        id: uuidv4(),
        comment_id: commentId,
        user_id: userId
      });

    if (insertError) {
      console.error('Error liking comment:', insertError);
      return { isLiked: false, error: insertError };
    }

    const { error: updateError } = await supabase.rpc('increment_comment_likes', { comment_id: commentId });
    if (updateError) {
      console.error('Error incrementing comment likes:', updateError);
      return { isLiked: false, error: updateError };
    }

    return { isLiked: true, error: null };
  },

  // Mark a comment as the answer
  async markAsAnswer(commentId: string, topicId: string): Promise<{ success: boolean; error: PostgrestError | Error | null }> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { success: false, error: new Error('You must be logged in to mark an answer') };
    }

    const { data: topic } = await supabase
      .from('forum_topics')
      .select('author_id')
      .eq('id', topicId)
      .single();

    if (!topic) {
      return { success: false, error: new Error('Topic not found') };
    }

    if (topic.author_id !== user.data.user.id) {
      return { success: false, error: new Error('Only the topic author can mark an answer') };
    }

    const { error: commentError } = await supabase
      .from('forum_comments')
      .update({ is_answer: true })
      .eq('id', commentId);

    if (commentError) {
      console.error('Error marking comment as answer:', commentError);
      return { success: false, error: commentError };
    }

    const { error: topicError } = await supabase
      .from('forum_topics')
      .update({ is_answered: true })
      .eq('id', topicId);

    if (topicError) {
      console.error('Error marking topic as answered:', topicError);
      return { success: false, error: topicError };
    }

    return { success: true, error: null };
  },

  // Search and filter topics
  async searchTopics(
    searchQuery: string = '',
    category: string = '',
    tag: string = '',
    sortBy: 'recent' | 'popular' | 'active' | 'unanswered' = 'recent'
  ): Promise<{ topics: ForumTopic[]; error: PostgrestError | null }> {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `);

    if (userId) {
      query = supabase
        .from('forum_topics')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_topic_likes(user_id)
        `);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (tag) {
      query = query.contains('tags', [tag]);
    }

    if (searchQuery) {
      query = query.or(`
        title.ilike.%${searchQuery}%,
        content.ilike.%${searchQuery}%
      `);
    }

    switch (sortBy) {
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popular':
        query = query.order('likes', { ascending: false });
        break;
      case 'active':
        query = query.order('last_activity', { ascending: false });
        break;
      case 'unanswered':
        query = query.eq('is_answered', false).order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching forum topics:', error);
      return { topics: [], error };
    }

    return {
      topics: (data || []).map(topic => ({
        ...topic,
        is_liked: userId ? topic.liked?.some((l: { user_id: string }) => l.user_id === userId) || false : false
      })),
      error: null
    };
  },

  // Get topics by user
  async getTopicsByUser(userId: string): Promise<{ topics: ForumTopic[]; error: PostgrestError | null }> {
    const currentUser = await supabase.auth.getUser();
    const currentUserId = currentUser.data.user?.id;

    let query = supabase
      .from('forum_topics')
      .select(`
        *,
        author:author_id(
          id,
          full_name,
          avatar_url,
          role
        )
      `)
      .eq('author_id', userId);

    if (currentUserId) {
      query = supabase
        .from('forum_topics')
        .select(`
          *,
          author:author_id(
            id,
            full_name,
            avatar_url,
            role
          ),
          liked:forum_topic_likes(user_id)
        `)
        .eq('author_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user topics:', error);
      return { topics: [], error };
    }

    return {
      topics: (data || []).map(topic => ({
        ...topic,
        is_liked: currentUserId ? topic.liked?.some((l: { user_id: string }) => l.user_id === currentUserId) || false : false
      })),
      error: null
    };
  }
};
