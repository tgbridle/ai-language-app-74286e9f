import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DeclensionTable } from '@/components/DeclensionTable';
import { useNounDetails } from '@/hooks/useNounDetails';
import { cn } from '@/lib/utils';

interface NounDeepDiveProps {
  nounId: string;
  onBack: () => void;
}

const GENDER_COLORS = {
  masculine: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  feminine: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  neuter: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
} as const;

export function NounDeepDive({ nounId, onBack }: NounDeepDiveProps) {
  const { noun, isLoading } = useNounDetails(nounId);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!noun) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Noun not found.</p>
        <Button onClick={onBack} variant="ghost" className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search
        </Button>
      </div>
    );
  }

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
                <span className="text-primary">{noun.article}</span>{' '}
                <span className="text-foreground">{noun.lemma}</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground mt-2">
                {noun.english_meaning}
              </p>
            </div>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium capitalize',
                GENDER_COLORS[noun.gender]
              )}
            >
              {noun.gender}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Declension Table Card */}
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Declension Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DeclensionTable noun={noun} />
        </CardContent>
      </Card>

      {/* Grammar Insight Card */}
      {noun.grammar_note && (
        <Card className="border-2 border-accent bg-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Grammar Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {noun.grammar_note}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
