import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useDictionaryDetails } from '@/hooks/useDictionaryDetails';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS, GENDER_COLORS, GENDER_TEXT_COLORS } from '@/lib/wordTypeColors';
import { 
  isNounMetadata, 
  isVerbMetadata, 
  isPrepositionMetadata,
  isPronounMetadata,
  isArticleMetadata,
  isAdjectiveMetadata,
  isAdverbMetadata,
  isConjunctionMetadata,
} from '@/types/dictionary';
import { NounDeclensionTable } from '@/components/deep-dive/NounDeclensionTable';
import { VerbConjugationTable } from '@/components/deep-dive/VerbConjugationTable';
import { AdjectiveComparisonTable } from '@/components/deep-dive/AdjectiveComparisonTable';
import { PrepositionDeepDive } from '@/components/deep-dive/PrepositionDeepDive';
import { AdverbDeepDive } from '@/components/deep-dive/AdverbDeepDive';
import { PronounDeepDive } from '@/components/deep-dive/PronounDeepDive';
import { ConjunctionDeepDive } from '@/components/deep-dive/ConjunctionDeepDive';
import { ArticleDeepDive } from '@/components/deep-dive/ArticleDeepDive';
import { LanglyLogo } from '@/components/LanglyLogo';

interface WordDeepDiveProps {
  entryId: string;
  onBack: () => void;
}

export function WordDeepDive({ entryId, onBack }: WordDeepDiveProps) {
  const { entry, isLoading } = useDictionaryDetails(entryId);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto space-y-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="w-full max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-0.5">
            <LanglyLogo size="sm" />
            <span className="font-bold text-lg text-foreground">Langly</span>
          </div>
          <div className="w-14" />
        </header>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Word not found.</p>
        </div>
      </div>
    );
  }

  const glowClass = WORD_TYPE_COLORS[entry.word_type].glow;

  // Delegated layouts for specialized word types
  const DelegatedLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header className="flex items-center justify-between mb-4">
        <Button onClick={onBack} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-0.5">
          <LanglyLogo size="sm" />
          <span className="font-bold text-lg text-foreground">Langly</span>
        </div>
        <div className="w-14" />
      </header>
      {children}
    </div>
  );

  // Preposition
  if (entry.word_type === 'preposition' && isPrepositionMetadata(entry.metadata)) {
    return (
      <DelegatedLayout>
        <PrepositionDeepDive germanWord={entry.german_word} englishTranslation={entry.english_translation}
          metadata={entry.metadata} grammarNote={entry.grammar_note}
          exampleSentenceDe={entry.example_sentence_de} exampleSentenceEn={entry.example_sentence_en} />
      </DelegatedLayout>
    );
  }
  // Adverb
  if (entry.word_type === 'adverb' && isAdverbMetadata(entry.metadata)) {
    return (
      <DelegatedLayout>
        <AdverbDeepDive germanWord={entry.german_word} englishTranslation={entry.english_translation}
          metadata={entry.metadata} grammarNote={entry.grammar_note}
          exampleSentenceDe={entry.example_sentence_de} exampleSentenceEn={entry.example_sentence_en} />
      </DelegatedLayout>
    );
  }
  // Pronoun
  if (entry.word_type === 'pronoun' && isPronounMetadata(entry.metadata)) {
    return (
      <DelegatedLayout>
        <PronounDeepDive germanWord={entry.german_word} englishTranslation={entry.english_translation}
          metadata={entry.metadata} grammarNote={entry.grammar_note}
          exampleSentenceDe={entry.example_sentence_de} exampleSentenceEn={entry.example_sentence_en} />
      </DelegatedLayout>
    );
  }
  // Conjunction
  if (entry.word_type === 'conjunction' && isConjunctionMetadata(entry.metadata)) {
    return (
      <DelegatedLayout>
        <ConjunctionDeepDive germanWord={entry.german_word} englishTranslation={entry.english_translation}
          metadata={entry.metadata} grammarNote={entry.grammar_note}
          exampleSentenceDe={entry.example_sentence_de} exampleSentenceEn={entry.example_sentence_en} />
      </DelegatedLayout>
    );
  }
  // Article
  if (entry.word_type === 'article' && isArticleMetadata(entry.metadata)) {
    return (
      <DelegatedLayout>
        <ArticleDeepDive germanWord={entry.german_word} englishTranslation={entry.english_translation}
          metadata={entry.metadata} grammarNote={entry.grammar_note}
          exampleSentenceDe={entry.example_sentence_de} exampleSentenceEn={entry.example_sentence_en} />
      </DelegatedLayout>
    );
  }

  // --- Flashcard Layout (default: noun, verb, adjective) ---

  const getHeaderDisplay = () => {
    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      const genderTextClass = GENDER_TEXT_COLORS[entry.metadata.gender];
      if (entry.metadata.declensions?.singular?.nominative) {
        const nomSingular = entry.metadata.declensions.singular.nominative;
        const [article, ...rest] = nomSingular.split(' ');
        return (
          <>
            <span className={genderTextClass}>{article}</span>{' '}
            <span className="text-foreground">{rest.join(' ')}</span>
          </>
        );
      }
      return <span className="text-foreground">{entry.german_word}</span>;
    }
    return <span className="text-foreground">{entry.german_word}</span>;
  };

  const renderMetaChips = () => {
    const chips: React.ReactNode[] = [];

    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      chips.push(
        <span key="gender" className={cn('px-3 py-1 rounded-full text-xs font-semibold capitalize', GENDER_COLORS[entry.metadata.gender])}>
          {entry.metadata.gender}
        </span>
      );
    }

    chips.push(
      <span key="type" className={cn('px-3 py-1 rounded-full text-xs font-semibold capitalize border', WORD_TYPE_COLORS[entry.word_type].badge)}>
        {entry.word_type}
      </span>
    );

    return <div className="flex items-center gap-2">{chips}</div>;
  };

  const renderTypeContent = () => {
    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      if (!entry.metadata.declensions) return null;
      return (
        <div className={cn("rounded-2xl border border-border bg-card p-4", glowClass)}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Declensions</h3>
          <NounDeclensionTable declensions={entry.metadata.declensions} gender={entry.metadata.gender} />
        </div>
      );
    }

    if (entry.word_type === 'verb' && isVerbMetadata(entry.metadata)) {
      return (
        <div className={cn("rounded-2xl border border-border bg-card p-4", glowClass)}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Present Tense</h3>
          <VerbConjugationTable conjugation={entry.metadata.conjugation} />
        </div>
      );
    }

    if (entry.word_type === 'adjective' && isAdjectiveMetadata(entry.metadata)) {
      return (
        <div className={cn("rounded-2xl border border-border bg-card p-4", glowClass)}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Comparison</h3>
          <AdjectiveComparisonTable baseWord={entry.german_word} comparative={entry.metadata.comparative} superlative={entry.metadata.superlative} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Compact Header Bar */}
      <header className="flex items-center justify-between mb-4">
        <Button onClick={onBack} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-0.5">
          <LanglyLogo size="sm" />
          <span className="font-bold text-lg text-foreground">Langly</span>
        </div>
        <div className="w-14" />
      </header>

      <div className="space-y-3">
        {/* Flashcard Hero */}
        <div className={cn(
          "rounded-2xl border border-border bg-card p-5",
          glowClass
        )}>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {getHeaderDisplay()}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">{entry.english_translation}</p>

          {/* Metadata chips row */}
          <div className="mt-3">
            {renderMetaChips()}
          </div>

          {/* Example sentence inline */}
          {entry.example_sentence_de && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="italic text-sm text-foreground/80">„{entry.example_sentence_de}"</p>
              {entry.example_sentence_en && (
                <p className="text-xs text-muted-foreground mt-0.5">"{entry.example_sentence_en}"</p>
              )}
            </div>
          )}
        </div>

        {/* Type-specific content */}
        {renderTypeContent()}

        {/* Grammar note - compact */}
        {entry.grammar_note && (
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Grammar</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{entry.grammar_note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
