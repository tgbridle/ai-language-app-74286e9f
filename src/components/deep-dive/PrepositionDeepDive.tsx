import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS } from '@/lib/wordTypeColors';
import { PrepositionMetadata } from '@/types/dictionary';

interface PrepositionDeepDiveProps {
  germanWord: string;
  englishTranslation: string;
  metadata: PrepositionMetadata;
  grammarNote: string | null;
}

export function PrepositionDeepDive({
  germanWord,
  englishTranslation,
  metadata,
  grammarNote,
}: PrepositionDeepDiveProps) {
  // Build the case label based on the case type
  const getCaseLabel = () => {
    if (metadata.case === 'two-way') {
      return 'TWO-WAY (WECHSEL)';
    }
    return `ALWAYS ${metadata.case.toUpperCase()}`;
  };

  // Parse contractions from the note field (format: "im (in + dem), ins (in + das)")
  const parseContractions = (): string[] => {
    if (!metadata.note) return [];
    
    // Look for patterns like "word (prep + article)"
    const contractionPattern = /(\w+)\s*\(([^)]+)\)/g;
    const matches = metadata.note.matchAll(contractionPattern);
    const contractions: string[] = [];
    
    for (const match of matches) {
      contractions.push(`${match[1]} (${match[2]})`);
    }
    
    return contractions;
  };

  const contractions = parseContractions();

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
            </div>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium capitalize border',
                WORD_TYPE_COLORS.preposition.badge
              )}
            >
              Preposition
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Case Requirement Card - Centered & Bold */}
      <Card className="border border-border shadow-sm">
        <CardContent className="py-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Case Requirement
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">
              {getCaseLabel()}
            </span>
            {metadata.case === 'two-way' && (
              <p className="text-sm text-muted-foreground mt-3 max-w-sm">
                Uses Accusative for motion/direction, Dative for location/state.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contractions Section */}
      {contractions.length > 0 && (
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Common Contractions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {contractions.map((contraction, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-2 text-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-medium">{contraction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Grammar Insight Card - Indigo left border */}
      {grammarNote && (
        <Card className="border border-border shadow-sm border-l-4 border-l-indigo-700 bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
              Grammar Insight
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
