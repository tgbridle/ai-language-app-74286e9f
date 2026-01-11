import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDictionaryDetails } from '@/hooks/useDictionaryDetails';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS, GENDER_COLORS, GENDER_TEXT_COLORS, CASE_COLORS } from '@/lib/wordTypeColors';
import { 
  isNounMetadata, 
  isVerbMetadata, 
  isPrepositionMetadata,
  isPronounMetadata,
  isArticleMetadata,
  isAdjectiveMetadata,
} from '@/types/dictionary';
import { NounDeclensionTable } from '@/components/deep-dive/NounDeclensionTable';
import { VerbConjugationTable } from '@/components/deep-dive/VerbConjugationTable';
import { PronounDeclensionTable } from '@/components/deep-dive/PronounDeclensionTable';
import { ArticleDeclensionTable } from '@/components/deep-dive/ArticleDeclensionTable';
import { AdjectiveComparisonTable } from '@/components/deep-dive/AdjectiveComparisonTable';
import { PrepositionCaseCard } from '@/components/deep-dive/PrepositionCaseCard';
import { LanglyLogo } from '@/components/LanglyLogo';

interface WordDeepDiveProps {
  entryId: string;
  onBack: () => void;
}

export function WordDeepDive({ entryId, onBack }: WordDeepDiveProps) {
  const { entry, isLoading } = useDictionaryDetails(entryId);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Header Bar */}
        <header className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        <div className="flex items-center gap-0.5">
          <LanglyLogo size="sm" />
          <span className="font-bold text-foreground text-lg">Langly</span>
        </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </header>
        
        <div className="text-center py-12">
          <p className="text-muted-foreground">Word not found.</p>
        </div>
      </div>
    );
  }

  const renderTypeSpecificContent = () => {
    switch (entry.word_type) {
      case 'noun':
        if (isNounMetadata(entry.metadata)) {
          // Graceful fallback if declensions not yet migrated
          if (!entry.metadata.declensions) {
            return (
              <Card className="border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Declension Table
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                  <p className="text-muted-foreground text-sm mt-2">Loading declension data...</p>
                </CardContent>
              </Card>
            );
          }
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Declension Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NounDeclensionTable 
                  declensions={entry.metadata.declensions} 
                  gender={entry.metadata.gender}
                />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'verb':
        if (isVerbMetadata(entry.metadata)) {
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Present Tense Conjugation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <VerbConjugationTable conjugation={entry.metadata.conjugation} />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'preposition':
        if (isPrepositionMetadata(entry.metadata)) {
          // Extract contractions from note if present (format: "Contractions: an + dem = am, ...")
          const contractions = (entry.metadata as { contractions?: string[] }).contractions;
          
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Case Requirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PrepositionCaseCard
                  caseType={entry.metadata.case}
                  note={entry.metadata.note}
                  contractions={contractions}
                />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'pronoun':
        if (isPronounMetadata(entry.metadata)) {
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Case Declension
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PronounDeclensionTable declension={entry.metadata.declension} />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'article':
        if (isArticleMetadata(entry.metadata)) {
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Case Declension
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ArticleDeclensionTable declension={entry.metadata.declension} />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'adjective':
        if (isAdjectiveMetadata(entry.metadata)) {
          return (
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Comparison (Steigerung)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdjectiveComparisonTable
                  baseWord={entry.german_word}
                  comparative={entry.metadata.comparative}
                  superlative={entry.metadata.superlative}
                />
              </CardContent>
            </Card>
          );
        }
        break;
    }

    return null;
  };

  // Build the header display
  const getHeaderDisplay = () => {
    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      const genderTextClass = GENDER_TEXT_COLORS[entry.metadata.gender];
      // Use nominative singular from declensions if available
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
      // Fallback to german_word
      return <span className="text-foreground">{entry.german_word}</span>;
    }
    return <span className="text-foreground">{entry.german_word}</span>;
  };

  const getTypeBadge = () => {
    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      return (
        <div className="flex gap-2 flex-wrap">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium capitalize',
              GENDER_COLORS[entry.metadata.gender]
            )}
          >
            {entry.metadata.gender}
          </span>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium capitalize border',
              WORD_TYPE_COLORS[entry.word_type].badge
            )}
          >
            {entry.word_type}
          </span>
        </div>
      );
    }

    return (
      <span
        className={cn(
          'px-3 py-1 rounded-full text-sm font-medium capitalize border',
          WORD_TYPE_COLORS[entry.word_type].badge
        )}
      >
        {entry.word_type}
      </span>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between mb-8">
        <Button onClick={onBack} variant="ghost" className="text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <LanglyLogo size="sm" />
          <span className="font-bold text-foreground">Langly</span>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Content */}
      <div className="space-y-6">
        {/* Header Card */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {getHeaderDisplay()}
                </CardTitle>
                <p className="text-xl text-muted-foreground mt-2">
                  {entry.english_translation}
                </p>
              </div>
              {getTypeBadge()}
            </div>
          </CardHeader>
        </Card>

        {/* Type-Specific Content */}
        {renderTypeSpecificContent()}

        {/* Grammar Insight Card */}
        {entry.grammar_note && (
          <Card className="border border-border shadow-sm bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Grammar Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {entry.grammar_note}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
