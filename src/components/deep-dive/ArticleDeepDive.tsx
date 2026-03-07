import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS } from '@/lib/wordTypeColors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArticleMetadata } from '@/types/dictionary';

interface ArticleDeepDiveProps {
  germanWord: string;
  englishTranslation: string;
  metadata: ArticleMetadata;
  grammarNote: string | null;
  exampleSentenceDe: string | null;
  exampleSentenceEn: string | null;
}

const CASES = [
  { key: 'nominative', label: 'Nominative', abbr: 'NOM' },
  { key: 'accusative', label: 'Accusative', abbr: 'ACC' },
  { key: 'dative', label: 'Dative', abbr: 'DAT' },
  { key: 'genitive', label: 'Genitive', abbr: 'GEN' },
] as const;

type CaseKey = typeof CASES[number]['key'];

export function ArticleDeepDive({ 
  germanWord, 
  englishTranslation, 
  metadata,
  grammarNote,
  exampleSentenceDe,
  exampleSentenceEn,
}: ArticleDeepDiveProps) {
  const getArticleType = () => {
    if (metadata.type === 'negative') return 'Negative Article';
    if (metadata.type === 'possessive') return 'Possessive Article';
    if (metadata.gender) return `Definite Article (${metadata.gender})`;
    return 'Article';
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
            <span 
              className={cn('px-3 py-1 rounded-full text-sm font-medium capitalize border', WORD_TYPE_COLORS.article.badge)}
            >
              {getArticleType()}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Declension Table */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Case Declension
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-1/2 font-semibold text-muted-foreground">Case</TableHead>
                  <TableHead className="w-1/2 font-semibold text-muted-foreground">Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CASES.map((caseItem) => (
                  <TableRow key={caseItem.key} className="border-border">
                    <TableCell className="font-medium text-muted-foreground">
                      <span className="hidden sm:inline">{caseItem.label}</span>
                      <span className="sm:hidden">{caseItem.abbr}</span>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {metadata.declension[caseItem.key as CaseKey]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Grammar Insight */}
      {grammarNote && (
        <Card 
          className="border border-border shadow-sm border-l-4"
          style={{ borderLeftColor: 'hsl(var(--wordtype-article))' }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
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
