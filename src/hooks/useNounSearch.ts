import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { NounSuggestion } from '@/types/noun';

export function useNounSearch(query: string) {
  const [suggestions, setSuggestions] = useState<NounSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchNouns = async () => {
      if (query.trim().length < 1) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        // Search by lemma prefix OR by any inflected form in search_forms array
        const { data, error } = await supabase
          .from('nouns')
          .select('id, article, lemma, english_meaning')
          .or(`lemma.ilike.${query}%,search_forms.cs.{${query}}`)
          .limit(10);

        if (error) throw error;

        setSuggestions(data || []);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchNouns, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { suggestions, isLoading };
}
