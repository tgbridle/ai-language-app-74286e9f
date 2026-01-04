import type { WordType } from '@/types/dictionary';

// Word type color classes - designed to not clash with gender colors (Red/Blue/Green)
export const WORD_TYPE_COLORS: Record<WordType, { badge: string; text: string }> = {
  noun: {
    badge: 'bg-wordtype-noun/10 text-wordtype-noun border-wordtype-noun/30',
    text: 'text-wordtype-noun',
  },
  verb: {
    badge: 'bg-wordtype-verb/10 text-wordtype-verb border-wordtype-verb/30',
    text: 'text-wordtype-verb',
  },
  adjective: {
    badge: 'bg-wordtype-adjective/10 text-wordtype-adjective border-wordtype-adjective/30',
    text: 'text-wordtype-adjective',
  },
  adverb: {
    badge: 'bg-wordtype-adverb/10 text-wordtype-adverb border-wordtype-adverb/30',
    text: 'text-wordtype-adverb',
  },
  pronoun: {
    badge: 'bg-wordtype-pronoun/10 text-wordtype-pronoun border-wordtype-pronoun/30',
    text: 'text-wordtype-pronoun',
  },
  preposition: {
    badge: 'bg-wordtype-preposition/10 text-wordtype-preposition border-wordtype-preposition/30',
    text: 'text-wordtype-preposition',
  },
  conjunction: {
    badge: 'bg-wordtype-conjunction/10 text-wordtype-conjunction border-wordtype-conjunction/30',
    text: 'text-wordtype-conjunction',
  },
  article: {
    badge: 'bg-wordtype-article/10 text-wordtype-article border-wordtype-article/30',
    text: 'text-wordtype-article',
  },
};

// Gender colors for nouns
export const GENDER_COLORS = {
  masculine: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  feminine: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  neuter: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
} as const;

export const CASE_COLORS = {
  accusative: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  dative: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  genitive: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'two-way': 'bg-gradient-to-r from-amber-100 to-cyan-100 text-slate-800 dark:from-amber-900/30 dark:to-cyan-900/30 dark:text-slate-300',
} as const;
