# Langly Architecture

A German language learning dictionary using a state-based SPA architecture.

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Vite | ^5.x | Build tool & dev server |
| Framework | React | ^18.3.1 | UI component library |
| Language | TypeScript | ^5.x | Type-safe JavaScript |
| Routing | React Router | ^6.30.1 | Client-side navigation |
| Styling | Tailwind CSS | ^3.x | Utility-first CSS |
| Components | shadcn/ui | - | Radix-based UI primitives |
| Icons | Lucide React | ^0.462.0 | Icon library |
| Backend | Lovable Cloud | - | Managed PostgreSQL |
| API | PostgREST | - | Auto-generated REST API |
| Client | Supabase JS | ^2.89.0 | Database client SDK |

## Application Structure

| Type | Name | Role |
|------|------|------|
| **Page** | `Index` | Main landing page with view state management |
| **Page** | `NotFound` | 404 error page |
| **View** | Search View | Default state: logo + SearchBar |
| **View** | Deep-Dive View | Detail state: WordDeepDive component |
| **Controller** | `WordDeepDive` | Routes to correct renderer based on `word_type` |
| **Renderer** | `NounDeclensionTable` | Noun grammar visualization |
| **Renderer** | `VerbConjugationTable` | Verb conjugation display |
| **Renderer** | `AdjectiveComparisonTable` | Adjective comparison forms |
| **Renderer** | `AdverbDeepDive` | Adverb comparison display |
| **Renderer** | `PronounDeepDive` | Pronoun declension grid |
| **Renderer** | `ArticleDeepDive` | Article declension grid |
| **Renderer** | `PrepositionDeepDive` | Case requirements display |
| **Renderer** | `ConjunctionDeepDive` | Conjunction type display |
| **Hook** | `useDictionarySearch` | Debounced search (150ms) |
| **Hook** | `useDictionaryDetails` | Entry detail fetching |
| **Utility** | `wordTypeColors.ts` | Color mapping for word types |
