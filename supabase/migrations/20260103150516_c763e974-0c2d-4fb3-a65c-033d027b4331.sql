-- Create the nouns table for German vocabulary
CREATE TABLE public.nouns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lemma TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('masculine', 'feminine', 'neuter')),
  article TEXT NOT NULL CHECK (article IN ('der', 'die', 'das')),
  english_meaning TEXT NOT NULL,
  
  -- Singular declensions
  nom_sg TEXT NOT NULL,
  acc_sg TEXT NOT NULL,
  dat_sg TEXT NOT NULL,
  gen_sg TEXT NOT NULL,
  
  -- Plural declensions
  nom_pl TEXT,
  acc_pl TEXT,
  dat_pl TEXT,
  gen_pl TEXT,
  
  -- Searchable inflected forms array for fuzzy matching
  search_forms TEXT[] NOT NULL DEFAULT '{}',
  
  -- Grammar insight
  grammar_note TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read access for vocabulary lookup)
ALTER TABLE public.nouns ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth required for vocab lookup)
CREATE POLICY "Anyone can read nouns"
ON public.nouns
FOR SELECT
USING (true);

-- Create GIN index on search_forms for efficient array searches
CREATE INDEX idx_nouns_search_forms ON public.nouns USING GIN(search_forms);

-- Create index on lemma for direct lookups
CREATE INDEX idx_nouns_lemma ON public.nouns(lemma);

-- Insert sample German nouns with full declension data
INSERT INTO public.nouns (lemma, gender, article, english_meaning, nom_sg, acc_sg, dat_sg, gen_sg, nom_pl, acc_pl, dat_pl, gen_pl, search_forms, grammar_note) VALUES
('Hund', 'masculine', 'der', 'dog', 'Hund', 'Hund', 'Hund', 'Hundes', 'Hunde', 'Hunde', 'Hunden', 'Hunde', ARRAY['Hund', 'Hundes', 'Hunde', 'Hunden'], 'Strong masculine noun. Takes -es in genitive singular and -e/-en in plural.'),
('Katze', 'feminine', 'die', 'cat', 'Katze', 'Katze', 'Katze', 'Katze', 'Katzen', 'Katzen', 'Katzen', 'Katzen', ARRAY['Katze', 'Katzen'], 'Weak feminine noun. Unchanged in singular, adds -n in all plural cases.'),
('Kind', 'neuter', 'das', 'child', 'Kind', 'Kind', 'Kind', 'Kindes', 'Kinder', 'Kinder', 'Kindern', 'Kinder', ARRAY['Kind', 'Kindes', 'Kinder', 'Kindern'], 'Strong neuter noun. Takes -es in genitive singular and umlaut + -er in plural.'),
('Haus', 'neuter', 'das', 'house', 'Haus', 'Haus', 'Haus', 'Hauses', 'Häuser', 'Häuser', 'Häusern', 'Häuser', ARRAY['Haus', 'Hauses', 'Häuser', 'Häusern'], 'Strong neuter noun with umlaut in plural. Common pattern for monosyllabic neuters.'),
('Frau', 'feminine', 'die', 'woman, wife', 'Frau', 'Frau', 'Frau', 'Frau', 'Frauen', 'Frauen', 'Frauen', 'Frauen', ARRAY['Frau', 'Frauen'], 'Weak feminine noun. No change in singular cases.'),
('Mann', 'masculine', 'der', 'man, husband', 'Mann', 'Mann', 'Mann', 'Mannes', 'Männer', 'Männer', 'Männern', 'Männer', ARRAY['Mann', 'Mannes', 'Männer', 'Männern'], 'Strong masculine noun with umlaut in plural.'),
('Buch', 'neuter', 'das', 'book', 'Buch', 'Buch', 'Buch', 'Buches', 'Bücher', 'Bücher', 'Büchern', 'Bücher', ARRAY['Buch', 'Buches', 'Bücher', 'Büchern'], 'Strong neuter noun. Takes umlaut and -er ending in plural.'),
('Tisch', 'masculine', 'der', 'table', 'Tisch', 'Tisch', 'Tisch', 'Tisches', 'Tische', 'Tische', 'Tischen', 'Tische', ARRAY['Tisch', 'Tisches', 'Tische', 'Tischen'], 'Strong masculine noun. Regular -e plural pattern.'),
('Schule', 'feminine', 'die', 'school', 'Schule', 'Schule', 'Schule', 'Schule', 'Schulen', 'Schulen', 'Schulen', 'Schulen', ARRAY['Schule', 'Schulen'], 'Weak feminine noun ending in -e. Adds -n in plural.'),
('Auto', 'neuter', 'das', 'car', 'Auto', 'Auto', 'Auto', 'Autos', 'Autos', 'Autos', 'Autos', 'Autos', ARRAY['Auto', 'Autos'], 'Foreign-origin neuter noun. Takes -s in genitive and plural (unusual for German).');