import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { DictionarySuggestion, WordType, DictionaryMetadata } from '@/types/dictionary';

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

function isGermanInput(query: string): boolean {
  // Common German-specific characters
  const germanChars = /[äöüßÄÖÜ]/;
  if (germanChars.test(query)) return true;
  
  // Check if it starts with a German article
  const lower = query.toLowerCase().trim();
  for (const article of GERMAN_ARTICLES) {
    if (lower.startsWith(article + ' ') || lower === article) return true;
  }
  
  // Heuristic: if starts with capital letter (German nouns), assume German
  // unless it looks like English common words
  const englishIndicators = ['the ', 'a ', 'an ', 'to '];
  for (const indicator of englishIndicators) {
    if (lower.startsWith(indicator)) return false;
  }
  
  return true;
}

export function useDictionarySearch(query: string) {
  const [suggestions, setSuggestions] = useState<DictionarySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = useMemo(() => extractSearchTerm(query), [query]);
  const isGerman = useMemo(() => isGermanInput(query), [query]);

  useEffect(() => {
    const searchDictionary = async () => {
      // Require at least 1 character for search
      if (searchTerm.length < 1) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const searchLower = searchTerm.toLowerCase();
        
        // Search German word prefix, English translation contains, and search_forms prefix match
        const { data, error } = await supabase
          .from('dictionary')
          .select('id, german_word, english_translation, word_type, metadata, search_forms')
          .or(`german_word.ilike.${searchLower}%,english_translation.ilike.%${searchLower}%`)
          .limit(20);

        if (error) throw error;

        // Score and sort results by relevance
        const scoredData = (data || []).map(item => {
          const germanLower = item.german_word.toLowerCase();
          const englishLower = item.english_translation.toLowerCase();
          
          let score = 0;
          
          // Exact match on german_word = highest priority
          if (germanLower === searchLower) score = 100;
          // Exact match on english_translation
          else if (englishLower === searchLower) score = 90;
          // German word starts with search term
          else if (germanLower.startsWith(searchLower)) score = 70;
          // English starts with search term
          else if (englishLower.startsWith(searchLower)) score = 60;
          // English contains search term
          else if (englishLower.includes(searchLower)) score = 40;
          // search_forms match
          else score = 20;
          
          return { ...item, score };
        });
        
        // Sort by score descending, then alphabetically
        scoredData.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.german_word.localeCompare(b.german_word);
        });

        // Cast the data to match our types
        const typedData: DictionarySuggestion[] = scoredData.slice(0, 10).map(item => ({
          id: item.id,
          german_word: item.german_word,
          english_translation: item.english_translation,
          word_type: item.word_type as WordType,
          metadata: item.metadata as DictionaryMetadata,
        }));

        setSuggestions(typedData);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchDictionary, 150);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { suggestions, isLoading, searchTerm, isGerman };
}
