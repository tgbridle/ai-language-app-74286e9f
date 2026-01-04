import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { DictionaryEntry, WordType, DictionaryMetadata } from '@/types/dictionary';

export function useDictionaryDetails(entryId: string | null) {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!entryId) {
        setEntry(null);
        return;
      }

      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from('dictionary')
          .select('*')
          .eq('id', entryId)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setEntry({
            id: data.id,
            german_word: data.german_word,
            english_translation: data.english_translation,
            word_type: data.word_type as WordType,
            metadata: data.metadata as DictionaryMetadata,
            search_forms: data.search_forms,
            grammar_note: data.grammar_note,
            created_at: data.created_at,
          });
        } else {
          setEntry(null);
        }
      } catch (error) {
        console.error('Fetch entry error:', error);
        setEntry(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [entryId]);

  return { entry, isLoading };
}
