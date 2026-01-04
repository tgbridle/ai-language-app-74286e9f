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
      if (searchTerm.length < 1) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const searchLower = searchTerm.toLowerCase();
        
        // Search both German and English columns, plus inflected forms in search_forms
        const { data, error } = await supabase
          .from('dictionary')
          .select('id, german_word, english_translation, word_type, metadata')
          .or(`german_word.ilike.${searchLower}%,english_translation.ilike.%${searchLower}%,search_forms.cs.{${searchLower}}`)
          .limit(10);

        if (error) throw error;

        // Cast the data to match our types
        const typedData: DictionarySuggestion[] = (data || []).map(item => ({
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
