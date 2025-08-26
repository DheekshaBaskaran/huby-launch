import { useState, useEffect } from 'react';

export interface Bot {
  _id: string;
  name: string;
  prompt: string;
  personality: string;
  category: string;
  weirdness: number;
  views: number;
  likes: number;
  description: string;
  creator: string;
  responses: string[];
  isExample: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MetaPrompt {
  _id: string;
  prompt: string;
  category: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}

export function useWeirdExamples() {
  const [examples, setExamples] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bots/examples');
        if (!response.ok) {
          throw new Error('Failed to fetch examples');
        }
        const data = await response.json();
        setExamples(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  return { examples, loading, error };
}

export function useMetaPrompts() {
  const [metaPrompts, setMetaPrompts] = useState<MetaPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetaPrompts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bots/meta-prompts');
        if (!response.ok) {
          throw new Error('Failed to fetch meta prompts');
        }
        const data = await response.json();
        setMetaPrompts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMetaPrompts();
  }, []);

  return { metaPrompts, loading, error };
}

export function useCreateBot() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBot = async (botData: {
    name: string;
    prompt: string;
    personality: string;
    category: string;
    weirdness: number;
    description: string;
    creator: string;
  }) => {
    try {
      console.log('useCreateBot: Starting bot creation...', botData);
      setCreating(true);
      setError(null);
      
      const response = await fetch('/api/bots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(botData),
      });

      console.log('useCreateBot: Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('useCreateBot: API error:', errorData);
        throw new Error(errorData.error || 'Failed to create bot');
      }

      const newBot = await response.json();
      console.log('useCreateBot: Bot created successfully:', newBot);
      return newBot;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('useCreateBot: Error:', err);
      setError(errorMessage);
      throw err;
    } finally {
      setCreating(false);
    }
  };

  return { createBot, creating, error };
}
