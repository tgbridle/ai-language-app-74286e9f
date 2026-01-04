import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDictionaryDetails } from '@/hooks/useDictionaryDetails';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS, GENDER_COLORS, CASE_COLORS } from '@/lib/wordTypeColors';
import { 
  isNounMetadata, 
  isVerbMetadata, 
  isPrepositionMetadata,
  isPronounMetadata,
  isArticleMetadata,
  isAdjectiveMetadata,
} from '@/types/dictionary';
import { NounDeclensionTable } from '@/components/deep-dive/NounDeclensionTable';
import { VerbConjugationGrid } from '@/components/deep-dive/VerbConjugationGrid';
import { PronounDeclensionTable } from '@/components/deep-dive/PronounDeclensionTable';
import { ArticleDeclensionTable } from '@/components/deep-dive/ArticleDeclensionTable';

interface WordDeepDiveProps {
  entryId: string;
  onBack: () => void;
}

export function WordDeepDive({ entryId, onBack }: WordDeepDiveProps) {
  const { entry, isLoading } = useDictionaryDetails(entryId);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Word not found.</p>
        <Button onClick={onBack} variant="ghost" className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search
        </Button>
      </div>
    );
  }

  const renderTypeSpecificContent = () => {
    switch (entry.word_type) {
      case 'noun':
        if (isNounMetadata(entry.metadata)) {
          return (
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Declension Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NounDeclensionTable 
                  declension={entry.metadata.declension} 
                  article={entry.metadata.article}
                />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'verb':
        if (isVerbMetadata(entry.metadata)) {
          return (
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Present Tense Conjugation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VerbConjugationGrid conjugation={entry.metadata.conjugation} />
              </CardContent>
            </Card>
          );
        }
        break;

      case 'preposition':
        if (isPrepositionMetadata(entry.metadata)) {
          return (
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Case Requirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-semibold capitalize border',
                      CASE_COLORS[entry.metadata.case]
                    )}
                  >
                    Requires {entry.metadata.case === 'two-way' ? 'Accusative/Dative' : entry.metadata.case}
                  </span>
                </div>
                {entry.metadata.note && (
                  <p className="mt-3 text-muted-foreground text-sm">
                    {entry.metadata.note}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        }
        break;

      case 'pronoun':
        if (isPronounMetadata(entry.metadata)) {
          return (
            <Card className="border-2 border-border">
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
            <Card className="border-2 border-border">
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
          const { comparative, superlative } = entry.metadata;
          if (comparative || superlative) {
            return (
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Positive</p>
                      <p className="font-medium">{entry.german_word}</p>
                    </div>
                    {comparative && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Comparative</p>
                        <p className="font-medium">{comparative}</p>
                      </div>
                    )}
                    {superlative && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Superlative</p>
                        <p className="font-medium">{superlative}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          }
        }
        break;
    }

    return null;
  };

  // Build the header display
  const getHeaderDisplay = () => {
    if (entry.word_type === 'noun' && isNounMetadata(entry.metadata)) {
      return (
        <>
          <span className="text-primary">{entry.metadata.article}</span>{' '}
          <span className="text-foreground">{entry.german_word}</span>
        </>
      );
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
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Button onClick={onBack} variant="ghost" className="text-muted-foreground hover:text-foreground -ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to search
      </Button>

      {/* Header Card */}
      <Card className="border-2 border-border">
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
        <Card className="border-2 border-accent bg-accent/20">
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
  );
}
