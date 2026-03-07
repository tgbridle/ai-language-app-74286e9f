

# Dictionary Audit - German Language Expert Review

I have reviewed all entries across all 8 word types. Here is every issue found, grouped by severity.

---

## Critical Errors (Incorrect Information)

### 1. **Kind** - Wrong grammar note
Grammar note says: *"Takes -es in genitive singular and **umlaut + -er** in plural."*
Kind -> Kinder has **no umlaut**. The plural is simply "Kinder", not "Kinder" with umlaut. Compare with Buch -> Bucher (which does take umlaut). The note is factually wrong.
**Fix**: Change to *"Takes -es in genitive singular and -er in plural."*

### 2. **Eltern** - Gender listed as "masculine"
Eltern is a plural-only noun. It has no grammatical gender. Storing "masculine" is incorrect and will mislead learners. It should be marked in a way that signals "no gender" or at minimum "neuter" would be less confusing since the word has no singular.
**Fix**: Change gender to `"neuter"` and update grammar note to *"Plural-only noun. Has no singular form. No grammatical gender."*

### 3. **Leute** - Gender listed as "feminine"
Same issue as Eltern. Leute is plural-only with no singular gender.
**Fix**: Change gender to `"neuter"` and update grammar note to *"Plural-only noun. No singular form. No grammatical gender."*

### 4. **groß** - Misleading grammar note about ß
Grammar note says: *"ß stays before consonant, changes to ss before vowel."*
Under current German orthography (post-1996 reform), **ß remains after long vowels regardless**. "groß" keeps ß because the vowel is long. The comparative "größer" keeps ß. This note describes the old Swiss/pre-reform rule and is misleading.
**Fix**: Change to *"Takes umlaut in comparison. Irregular: one of the most common adjectives."*

### 5. **ihr** (pronoun) - Mixed gender forms in declension
The declension shows: nominative "ihr", accusative "ihre" (feminine form), dative "ihrem" (masculine/neuter form). These are from different genders and will confuse learners.
**Fix**: Pick one consistent gender (masculine base): nominative "ihr", accusative "ihren", dative "ihrem". Or note that these are masculine default forms.

### 6. **sie** (pronoun) - Declension incomplete
Declension shows dative "ihr" which is only the singular "she" form. For "they" the dative is "ihnen". The search_forms correctly include "ihnen" but the declension table doesn't show it. A learner looking at the deep-dive sees incomplete information.
**Fix**: Add a note in grammar_note clarifying: *"She: sie/sie/ihr. They: sie/sie/ihnen. Formal You: Sie/Sie/Ihnen."*

---

## Missing Data

### 7. **vor** (preposition) - No example sentences
Both `example_sentence_de` and `example_sentence_en` are null. Every other entry has examples.
**Fix**: Add `"Das Auto steht vor dem Haus."` / `"The car is in front of the house."`

### 8. **Mädchen** - search_forms incomplete
Only contains `{Mädchen}`. Missing the genitive form "Mädchens".
**Fix**: Update to `{Mädchen,Mädchens}`

---

## Minor Improvements

### 9. **als** (conjunction) - Example doesn't match primary meaning
Translation is *"when (past) / as"* but the example sentence `"Er ist älter als ich"` shows the comparison use, not the subordinating conjunction use. A learner looking for "when" gets a comparison example.
**Fix**: Change example to `"Als ich jung war, spielte ich viel draußen."` / `"When I was young, I played outside a lot."`

### 10. **gehen** - Missing auxiliary verb info
Grammar note doesn't mention that gehen takes **sein** as its auxiliary (like fahren does). This is critical for building perfect tense: "Ich **bin** gegangen" not "Ich habe gegangen".
**Fix**: Change to *"Strong verb. Past stem changes completely (ging). Takes 'sein' as auxiliary."*

### 11. **schön** - Misleading grammar note
Says *"Regular comparison despite umlaut in base form."* The "ö" in schön is NOT an umlaut of "o" - it IS the base vowel. The note implies something changed when nothing did.
**Fix**: Change to *"Regular comparison. No umlaut change in comparative/superlative."*

### 12. **dürfen** - Capitalization
Grammar note: *"Modal. Vowel change (ü -> a). **u**sed for permission."* - lowercase "used".
**Fix**: Capitalize to *"Used for permission."*

### 13. **oft** - Suppletive superlative not explained
Superlative is listed as "am häufigsten" which is actually from a different word (häufig). The true superlative of "oft" is "am öftesten" but the suppletive form "am häufigsten" is more common. This should be noted.
**Fix**: Update grammar_note to *"Comparison uses suppletive forms: oft -> öfter -> am häufigsten (from 'häufig')."*

### 14. **Duplicate entries across categories**: dein, mein, sein, ihr
These words appear as both **pronouns** and **articles** with slightly different declension data (article versions include genitive, pronoun versions don't). This is linguistically defensible (possessive articles vs possessive pronouns are different in German grammar), but the pronoun declension data is incomplete compared to the article data. For consistency, the pronoun versions should also include genitive forms.

---

## Summary of Changes

| # | Word | Type | Change |
|---|------|------|--------|
| 1 | Kind | noun | Fix grammar_note (remove "umlaut") |
| 2 | Eltern | noun | Fix gender to "neuter", update grammar_note |
| 3 | Leute | noun | Fix gender to "neuter", update grammar_note |
| 4 | groß | adjective | Fix grammar_note (remove ß rule) |
| 5 | ihr | pronoun | Fix declension consistency |
| 6 | sie | pronoun | Expand grammar_note with all three uses |
| 7 | vor | preposition | Add example sentences |
| 8 | Mädchen | noun | Add "Mädchens" to search_forms |
| 9 | als | conjunction | Change example sentence |
| 10 | gehen | verb | Add "Takes 'sein'" to grammar_note |
| 11 | schön | adjective | Fix grammar_note wording |
| 12 | dürfen | verb | Fix capitalization |
| 13 | oft | adverb | Note suppletive superlative |
| 14 | dein/mein/sein/ihr | pronoun | Add genitive to declension |

All remaining entries (nouns, verbs, adjectives, adverbs, prepositions, conjunctions, articles) are linguistically accurate with correct declensions, conjugations, and appropriate grammar notes.

## Implementation

Execute 14 UPDATE statements via the database insert tool to fix each issue. No schema changes needed.

