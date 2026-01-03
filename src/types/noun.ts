export interface Noun {
  id: string;
  lemma: string;
  gender: 'masculine' | 'feminine' | 'neuter';
  article: 'der' | 'die' | 'das';
  english_meaning: string;
  nom_sg: string;
  acc_sg: string;
  dat_sg: string;
  gen_sg: string;
  nom_pl: string | null;
  acc_pl: string | null;
  dat_pl: string | null;
  gen_pl: string | null;
  search_forms: string[];
  grammar_note: string | null;
  created_at: string;
}

export interface NounSuggestion {
  id: string;
  article: string;
  lemma: string;
  english_meaning: string;
}
