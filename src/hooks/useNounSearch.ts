import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { NounSuggestion } from '@/types/noun';

const GERMAN_ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines'];

function extractSearchTerm(query: string): string {
  const trimmed = query.trim().toLowerCase();
  
  for (const article of GERMAN_ARTICLES) {
    if (trimmed.startsWith(article + ' ')) {
      return query.trim().slice(article.length + 1).trim();
    }
  }
  
  return query.trim();
}

export function useNounSearch(query: string) {
  const [suggestions, setSuggestions] = useState<NounSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchNouns = async () => {
      const searchTerm = extractSearchTerm(query);
      
      if (searchTerm.length < 1) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        // Search by lemma prefix OR by any inflected form in search_forms array
        const { data, error } = await supabase
          .from('nouns')
          .select('id, article, lemma, english_meaning')
          .or(`lemma.ilike.${searchTerm}%,search_forms.cs.{${searchTerm}}`)
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
