export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'article';

export interface NounDeclensions {
  singular: {
    nominative: string;
    accusative: string;
    dative: string;
    genitive: string;
  };
  plural: {
    nominative: string | null;
    accusative: string | null;
    dative: string | null;
    genitive: string | null;
  } | null;
}

export interface NounMetadata {
  gender: 'masculine' | 'feminine' | 'neuter';
  declensions: NounDeclensions;
}

export interface VerbMetadata {
  conjugation: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
}

export interface AdjectiveMetadata {
  comparative?: string;
  superlative?: string;
}

export interface AdverbMetadata {
  comparative?: string;
  superlative?: string;
}

export interface PronounMetadata {
  declension: {
    nominative: string;
    accusative: string;
    dative: string;
    genitive?: string;
  };
}

export interface PrepositionMetadata {
  case: 'accusative' | 'dative' | 'genitive' | 'two-way';
  note?: string;
}

export interface ConjunctionMetadata {
  type: 'coordinating' | 'subordinating';
  note?: string;
}

export interface ArticleMetadata {
  gender?: string;
  type?: 'negative' | 'possessive';
  declension: {
    nominative: string;
    accusative: string;
    dative: string;
    genitive: string;
  };
}

export type DictionaryMetadata = 
  | NounMetadata 
  | VerbMetadata 
  | AdjectiveMetadata 
  | AdverbMetadata 
  | PronounMetadata 
  | PrepositionMetadata 
  | ConjunctionMetadata 
  | ArticleMetadata
  | Record<string, unknown>;

export interface DictionaryEntry {
  id: string;
  german_word: string;
  english_translation: string;
  word_type: WordType;
  metadata: DictionaryMetadata;
  search_forms: string[];
  grammar_note: string | null;
  example_sentence_de: string | null;
  example_sentence_en: string | null;
  created_at: string;
}

export interface DictionarySuggestion {
  id: string;
  german_word: string;
  english_translation: string;
  word_type: WordType;
  metadata: DictionaryMetadata;
}

// Type guards for metadata
export function isNounMetadata(metadata: DictionaryMetadata): metadata is NounMetadata {
  return 'gender' in metadata && 'declensions' in metadata;
}

export function isVerbMetadata(metadata: DictionaryMetadata): metadata is VerbMetadata {
  return 'conjugation' in metadata;
}

export function isPronounMetadata(metadata: DictionaryMetadata): metadata is PronounMetadata {
  return 'declension' in metadata && !('gender' in metadata) && !('genitive' in (metadata as ArticleMetadata).declension);
}

export function isPrepositionMetadata(metadata: DictionaryMetadata): metadata is PrepositionMetadata {
  return 'case' in metadata;
}

export function isConjunctionMetadata(metadata: DictionaryMetadata): metadata is ConjunctionMetadata {
  return 'type' in metadata && ((metadata as ConjunctionMetadata).type === 'coordinating' || (metadata as ConjunctionMetadata).type === 'subordinating');
}

export function isArticleMetadata(metadata: DictionaryMetadata): metadata is ArticleMetadata {
  return 'declension' in metadata && 'genitive' in ((metadata as ArticleMetadata).declension || {});
}

export function isAdjectiveMetadata(metadata: DictionaryMetadata): metadata is AdjectiveMetadata {
  return 'comparative' in metadata || 'superlative' in metadata;
}

export function isAdverbMetadata(metadata: DictionaryMetadata): metadata is AdverbMetadata {
  // Adverb metadata has same structure as adjective, but we check word_type in component
  return 'comparative' in metadata || 'superlative' in metadata;
}
