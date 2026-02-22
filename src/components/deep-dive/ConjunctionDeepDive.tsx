import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConjunctionMetadata } from '@/types/dictionary';

interface ConjunctionDeepDiveProps {
  germanWord: string;
  englishTranslation: string;
  metadata: ConjunctionMetadata;
  grammarNote: string | null;
  exampleSentenceDe: string | null;
  exampleSentenceEn: string | null;
}

export function ConjunctionDeepDive({ 
  germanWord, 
  englishTranslation, 
  metadata,
  grammarNote,
  exampleSentenceDe,
  exampleSentenceEn,
}: ConjunctionDeepDiveProps) {
  const getTypeLabel = () => {
    if (metadata.type === 'subordinating') {
      return 'Subordinating (verb goes to end)';
    }
    return 'Coordinating (standard word order)';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {germanWord}
              </CardTitle>
              <p className="text-xl text-muted-foreground mt-2">
                {englishTranslation}
              </p>
              {exampleSentenceDe && (
                <div className="mt-4 space-y-1">
                  <p className="italic text-foreground/90">„{exampleSentenceDe}"</p>
                  {exampleSentenceEn && (
                    <p className="text-sm text-muted-foreground">"{exampleSentenceEn}"</p>
                  )}
                </div>
              )}
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium capitalize bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              Conjunction
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Word Order Rule Card */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Word Order Rule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-lg font-medium text-yellow-700 dark:text-yellow-400">
            {getTypeLabel()}
          </span>
        </CardContent>
      </Card>

      {/* How to use it */}
      {grammarNote && (
        <Card className="border border-border shadow-sm border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              How to use it:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {grammarNote}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
