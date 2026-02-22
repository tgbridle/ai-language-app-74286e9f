import type { WordType } from '@/types/dictionary';

// Word type color classes - designed to not clash with gender colors (Red/Blue/Green)
export const WORD_TYPE_COLORS: Record<WordType, { badge: string; text: string; glow: string }> = {
  noun: {
    badge: 'bg-wordtype-noun/10 text-wordtype-noun border-wordtype-noun/30',
    text: 'text-wordtype-noun',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-noun)/0.4)]',
  },
  verb: {
    badge: 'bg-wordtype-verb/10 text-wordtype-verb border-wordtype-verb/30',
    text: 'text-wordtype-verb',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-verb)/0.4)]',
  },
  adjective: {
    badge: 'bg-wordtype-adjective/10 text-wordtype-adjective border-wordtype-adjective/30',
    text: 'text-wordtype-adjective',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-adjective)/0.4)]',
  },
  adverb: {
    badge: 'bg-wordtype-adverb/10 text-wordtype-adverb border-wordtype-adverb/30',
    text: 'text-wordtype-adverb',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-adverb)/0.4)]',
  },
  pronoun: {
    badge: 'bg-wordtype-pronoun/10 text-wordtype-pronoun border-wordtype-pronoun/30',
    text: 'text-wordtype-pronoun',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-pronoun)/0.4)]',
  },
  preposition: {
    badge: 'bg-wordtype-preposition/10 text-wordtype-preposition border-wordtype-preposition/30',
    text: 'text-wordtype-preposition',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-preposition)/0.4)]',
  },
  conjunction: {
    badge: 'bg-wordtype-conjunction/10 text-wordtype-conjunction border-wordtype-conjunction/30',
    text: 'text-wordtype-conjunction',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-conjunction)/0.4)]',
  },
  article: {
    badge: 'bg-wordtype-article/10 text-wordtype-article border-wordtype-article/30',
    text: 'text-wordtype-article',
    glow: 'shadow-[0_0_30px_-5px_hsl(var(--wordtype-article)/0.4)]',
  },
};

// Gender colors for nouns - Blue (masc), Red (fem), Amber/Orange (neuter)
export const GENDER_COLORS = {
  masculine: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  feminine: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  neuter: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
} as const;

// Text-only gender colors for inline usage (e.g., article in header)
export const GENDER_TEXT_COLORS = {
  masculine: 'text-blue-600 dark:text-blue-400',
  feminine: 'text-rose-600 dark:text-rose-400',
  neuter: 'text-amber-600 dark:text-amber-400',
} as const;

export const CASE_COLORS = {
  accusative: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  dative: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  genitive: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'two-way': 'bg-gradient-to-r from-amber-100 to-cyan-100 text-slate-800 dark:from-amber-900/30 dark:to-cyan-900/30 dark:text-slate-300',
} as const;
