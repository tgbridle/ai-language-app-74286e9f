import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { DictionarySuggestion, WordType, DictionaryMetadata } from '@/types/dictionary';
import { normalizeGerman } from '@/lib/normalizeGerman';
const GERMAN_ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines'];
const ENGLISH_ARTICLES = ['the', 'a', 'an'];

function extractSearchTerm(query: string): string {
  const trimmed = query.trim().toLowerCase();
  
  // Strip German articles
  for (const article of GERMAN_ARTICLES) {
    if (trimmed.startsWith(article + ' ')) {
      return query.trim().slice(article.length + 1).trim();
    }
  }
  
  // Strip English articles
  for (const article of ENGLISH_ARTICLES) {
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
        const normalizedQuery = normalizeGerman(searchTerm);
        
        // Fetch a broad set - we filter client-side with normalization
        const { data, error } = await supabase
          .from('dictionary')
          .select('id, german_word, english_translation, word_type, metadata, search_forms')
          .limit(500);

        if (error) throw error;

        // Universal match: normalize everything, check german_word, english_translation, and search_forms
        const matched = (data || []).filter(item => {
          const germanNorm = normalizeGerman(item.german_word);
          const englishNorm = normalizeGerman(item.english_translation);
          const formsMatch = (item.search_forms || []).some(
            form => normalizeGerman(form).includes(normalizedQuery)
          );
          return germanNorm.includes(normalizedQuery) ||
                 englishNorm.includes(normalizedQuery) ||
                 formsMatch;
        });

        // Score and sort results by relevance
        const scoredData = matched.map(item => {
          const germanNorm = normalizeGerman(item.german_word);
          const englishNorm = normalizeGerman(item.english_translation);
          
          let score = 0;
          
          if (germanNorm === normalizedQuery) score = 100;
          else if (englishNorm === normalizedQuery) score = 90;
          else if (germanNorm.startsWith(normalizedQuery)) score = 70;
          else if (englishNorm.startsWith(normalizedQuery)) score = 60;
          else if (englishNorm.includes(normalizedQuery)) score = 40;
          else score = 30; // search_forms match
          
          return { ...item, score };
        });
        
        scoredData.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.german_word.localeCompare(b.german_word);
        });

        // Deduplicate by id (same entry can match german + english)
        const seen = new Set<string>();
        const unique = scoredData.filter(item => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        const typedData: DictionarySuggestion[] = unique.slice(0, 10).map(item => ({
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
