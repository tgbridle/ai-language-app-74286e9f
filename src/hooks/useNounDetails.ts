import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Noun } from '@/types/noun';

export function useNounDetails(nounId: string | null) {
  const [noun, setNoun] = useState<Noun | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNoun = async () => {
      if (!nounId) {
        setNoun(null);
        return;
      }

      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('nouns')
          .select('*')
          .eq('id', nounId)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setNoun(data as Noun);
        } else {
          setNoun(null);
        }
      } catch (error) {
        console.error('Fetch noun error:', error);
        setNoun(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoun();
  }, [nounId]);

  return { noun, isLoading };
}
