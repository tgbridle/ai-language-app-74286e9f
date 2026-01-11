import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS } from '@/lib/wordTypeColors';
import { AdverbMetadata } from '@/types/dictionary';

interface AdverbDeepDiveProps {
  germanWord: string;
  englishTranslation: string;
  metadata: AdverbMetadata;
  grammarNote: string | null;
}

export function AdverbDeepDive({
  germanWord,
  englishTranslation,
  metadata,
  grammarNote,
}: AdverbDeepDiveProps) {
  const hasComparison = metadata.comparative || metadata.superlative;

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
                WORD_TYPE_COLORS.adverb.badge
              )}
            >
              Adverb
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Comparison Table */}
      {hasComparison && (
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Comparison (Steigerung)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Form</TableHead>
                  <TableHead className="w-1/3">German</TableHead>
                  <TableHead className="w-1/3">English</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-muted-foreground">Positive</TableCell>
                  <TableCell className="font-medium text-foreground">{germanWord}</TableCell>
                  <TableCell className="text-muted-foreground">{englishTranslation}</TableCell>
                </TableRow>
                {metadata.comparative && (
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Comparative</TableCell>
                    <TableCell className="font-medium text-foreground">{metadata.comparative}</TableCell>
                    <TableCell className="text-muted-foreground">more {englishTranslation}</TableCell>
                  </TableRow>
                )}
                {metadata.superlative && (
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Superlative</TableCell>
                    <TableCell className="font-medium text-foreground">{metadata.superlative}</TableCell>
                    <TableCell className="text-muted-foreground">most {englishTranslation}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Grammar Insight Card - Teal left border */}
      {grammarNote && (
        <Card className="border border-border shadow-sm border-l-4 border-l-teal-600 bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
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
