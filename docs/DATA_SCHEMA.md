# Langly Dictionary Data Schema

This document describes the database schema for the `dictionary` table, which serves as the single source of truth for all German vocabulary entries in Langly.

---

## Table Overview

| Property | Value |
|----------|-------|
| **Table Name** | `dictionary` |
| **Schema** | `public` |
| **Purpose** | Stores German vocabulary entries with translations, grammatical metadata, and search optimization |

---

## Core Fields

### `id`
- **Type**: `UUID`
- **Nullable**: No
- **Default**: `gen_random_uuid()`
- **Description**: Unique identifier for each dictionary entry.

### `german_word`
- **Type**: `text`
- **Nullable**: No
- **Description**: The German word or phrase (e.g., `"Hund"`, `"laufen"`, `"schnell"`).

### `english_translation`
- **Type**: `text`
- **Nullable**: No
- **Description**: The English meaning of the word (e.g., `"dog"`, `"to run"`, `"fast"`).

### `word_type`
- **Type**: `enum (word_type)`
- **Nullable**: No
- **Description**: Part of speech classification. See [Word Type Enum](#word-type-enum) for valid values.

### `metadata`
- **Type**: `JSONB`
- **Nullable**: No
- **Default**: `'{}'::jsonb`
- **Description**: Type-specific grammatical data. Structure varies by `word_type`. See [Metadata Structures](#metadata-structures).

### `search_forms`
- **Type**: `text[]`
- **Nullable**: No
- **Default**: `'{}'::text[]`
- **Description**: Array of alternative word forms for fuzzy matching (e.g., conjugations, declensions, common misspellings).

### `grammar_note`
- **Type**: `text`
- **Nullable**: Yes
- **Description**: Optional usage hints, explanations, or grammatical context displayed in the UI.

### `created_at`
- **Type**: `timestamp with time zone`
- **Nullable**: No
- **Default**: `now()`
- **Description**: Timestamp of entry creation.

---

## Word Type Enum

The `word_type` enum defines the following valid values:

| Value | Description |
|-------|-------------|
| `noun` | Nouns (Substantive) |
| `verb` | Verbs (Verben) |
| `adjective` | Adjectives (Adjektive) |
| `adverb` | Adverbs (Adverbien) |
| `pronoun` | Pronouns (Pronomen) |
| `preposition` | Prepositions (Präpositionen) |
| `conjunction` | Conjunctions (Konjunktionen) |
| `article` | Articles (Artikel) |

---

## Metadata Structures

The `metadata` JSONB field structure varies based on `word_type`. Below are the expected schemas for each type.

### Noun Metadata

Nouns store gender and full declension forms (article + noun) for all four cases in singular and plural.

```json
{
  "gender": "masculine" | "feminine" | "neuter",
  "declensions": {
    "singular": {
      "nominative": "der Hund",
      "accusative": "den Hund",
      "dative": "dem Hund",
      "genitive": "des Hundes"
    },
    "plural": {
      "nominative": "die Hunde",
      "accusative": "die Hunde",
      "dative": "den Hunden",
      "genitive": "der Hunde"
    }
  }
}
```

**Notes:**
- `plural` can be `null` for nouns without a plural form (e.g., abstract nouns).
- Each declension value is the complete form (article + noun), not just the stem.

---

### Verb Metadata

Verbs store present tense conjugations for all six persons.

```json
{
  "conjugation": {
    "ich": "laufe",
    "du": "läufst",
    "er_sie_es": "läuft",
    "wir": "laufen",
    "ihr": "lauft",
    "sie_Sie": "laufen"
  }
}
```

**Notes:**
- Keys use underscores for compound pronouns (e.g., `er_sie_es`, `sie_Sie`).
- Future expansion may include additional tenses (past, subjunctive, imperative).

---

### Adjective Metadata

Adjectives store comparative and superlative forms.

```json
{
  "comparative": "schneller",
  "superlative": "am schnellsten"
}
```

**Notes:**
- Both fields are optional (some adjectives don't have comparison forms).
- The superlative includes the `"am"` prefix where applicable.

---

### Adverb Metadata

Adverbs share the same structure as adjectives for comparison forms.

```json
{
  "comparative": "öfter",
  "superlative": "am öftesten"
}
```

**Notes:**
- Both fields are optional.

---

### Pronoun Metadata

Pronouns store declension forms for nominative, accusative, and dative cases.

```json
{
  "declension": {
    "nominative": "ich",
    "accusative": "mich",
    "dative": "mir"
  }
}
```

**Notes:**
- Genitive is not included as personal pronouns rarely use it in modern German.

---

### Preposition Metadata

Prepositions store the grammatical case they govern.

```json
{
  "case": "accusative" | "dative" | "genitive" | "two-way",
  "note": "Optional usage explanation"
}
```

**Notes:**
- `"two-way"` indicates Wechselpräpositionen that take accusative (motion) or dative (location).
- The `note` field is optional for additional context.

---

### Conjunction Metadata

Conjunctions store their type and optional usage notes.

```json
{
  "type": "coordinating" | "subordinating",
  "note": "Optional word order explanation"
}
```

**Notes:**
- `"coordinating"` conjunctions maintain standard word order.
- `"subordinating"` conjunctions send the verb to the end of the clause.

---

### Article Metadata

Articles store full declension grids and optional type classification.

```json
{
  "gender": "masculine" | "feminine" | "neuter",
  "type": "negative" | "possessive",
  "declension": {
    "nominative": "der",
    "accusative": "den",
    "dative": "dem",
    "genitive": "des"
  }
}
```

**Notes:**
- `gender` and `type` are optional (used for negative articles like "kein" or possessives like "mein").
- The declension shows the article forms across all four cases.

---

## Search Forms Usage

The `search_forms` array enables fuzzy matching by storing alternative word forms:

```json
["hund", "hunde", "hundes", "hunden", "der hund"]
```

**Typical contents:**
- Lowercase base form
- All declension/conjugation variants
- Common compound words containing the entry
- Phrases or expressions using the word

**How it works:**
- User searches are matched against this array using `ILIKE` or full-text search.
- Enables finding entries even when searching for inflected forms.

---

## Row-Level Security

The table has RLS enabled with the following policy:

| Policy Name | Command | Expression |
|-------------|---------|------------|
| Anyone can read dictionary | SELECT | `true` |

**Current restrictions:**
- ❌ INSERT not allowed
- ❌ UPDATE not allowed
- ❌ DELETE not allowed

---

## TypeScript Types

The corresponding TypeScript types are defined in `src/types/dictionary.ts`:

```typescript
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 
                       'pronoun' | 'preposition' | 'conjunction' | 'article';

export interface DictionaryEntry {
  id: string;
  german_word: string;
  english_translation: string;
  word_type: WordType;
  metadata: DictionaryMetadata;
  search_forms: string[];
  grammar_note: string | null;
  created_at: string;
}
```

See the full type definitions for metadata interfaces and type guards.
