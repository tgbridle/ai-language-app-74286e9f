-- Create word_type enum
CREATE TYPE public.word_type AS ENUM (
  'noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'article'
);

-- Create unified dictionary table
CREATE TABLE public.dictionary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  german_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  word_type public.word_type NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  search_forms TEXT[] NOT NULL DEFAULT '{}',
  grammar_note TEXT
);

-- Enable Row Level Security
ALTER TABLE public.dictionary ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can read dictionary" 
ON public.dictionary 
FOR SELECT 
USING (true);

-- Create indexes for efficient searching
CREATE INDEX idx_dictionary_german_word ON public.dictionary (german_word);
CREATE INDEX idx_dictionary_english_translation ON public.dictionary (english_translation);
CREATE INDEX idx_dictionary_search_forms ON public.dictionary USING GIN (search_forms);
CREATE INDEX idx_dictionary_word_type ON public.dictionary (word_type);

-- Migrate existing nouns data to dictionary
INSERT INTO public.dictionary (
  id,
  created_at,
  german_word,
  english_translation,
  word_type,
  metadata,
  search_forms,
  grammar_note
)
SELECT 
  id,
  created_at,
  lemma AS german_word,
  english_meaning AS english_translation,
  'noun'::public.word_type AS word_type,
  jsonb_build_object(
    'gender', gender,
    'article', article,
    'declension', jsonb_build_object(
      'nom_sg', nom_sg,
      'acc_sg', acc_sg,
      'dat_sg', dat_sg,
      'gen_sg', gen_sg,
      'nom_pl', nom_pl,
      'acc_pl', acc_pl,
      'dat_pl', dat_pl,
      'gen_pl', gen_pl
    )
  ) AS metadata,
  search_forms,
  grammar_note
FROM public.nouns;

-- Drop the old nouns table
DROP TABLE public.nouns;