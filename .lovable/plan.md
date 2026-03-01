

## Remove Em-Dashes

Four files contain em-dashes (`—`):

1. **`src/pages/Help.tsx`** — Two instances in help card descriptions. Replace with regular dashes or commas:
   - `"instantly as you type — tap one"` → `"instantly as you type. Tap one"`
   - `"by type — nouns, verbs, adjectives, and more — so you"` → `"by type: nouns, verbs, adjectives, and more, so you"`

2. **`src/components/deep-dive/PronounDeepDive.tsx`** — Used as a placeholder cell value (`'—'`). Replace with a regular dash (`'-'`).

3. **`src/components/deep-dive/NounDeclensionTable.tsx`** — Used as an empty-state placeholder (`—`). Replace with a regular dash (`-`).

4. **`src/hooks/useDictionarySearch.ts`** — In a code comment. Replace with a regular dash.

All changes are simple find-and-replace operations with no logic changes.

