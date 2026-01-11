import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { NounDeclensions } from '@/types/dictionary';
import { GENDER_TEXT_COLORS } from '@/lib/wordTypeColors';

interface NounDeclensionTableProps {
  declensions: NounDeclensions;
  gender: 'masculine' | 'feminine' | 'neuter';
}

const CASES = [
  { key: 'nominative', label: 'Nominative', abbr: 'NOM' },
  { key: 'accusative', label: 'Accusative', abbr: 'ACC' },
  { key: 'dative', label: 'Dative', abbr: 'DAT' },
  { key: 'genitive', label: 'Genitive', abbr: 'GEN' },
] as const;

type CaseKey = typeof CASES[number]['key'];

// Parse "der Hund" into { article: "der", noun: "Hund" }
function parseArticulatedForm(form: string | null): { article: string; noun: string } | null {
  if (!form) return null;
  const parts = form.split(' ');
  if (parts.length < 2) return { article: '', noun: form };
  const [article, ...rest] = parts;
  return { article, noun: rest.join(' ') };
}

export function NounDeclensionTable({ declensions, gender }: NounDeclensionTableProps) {
  const hasPluralForms = declensions.plural && (
    declensions.plural.nominative || 
    declensions.plural.accusative || 
    declensions.plural.dative || 
    declensions.plural.genitive
  );

  const genderTextClass = GENDER_TEXT_COLORS[gender];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="w-32 font-semibold text-muted-foreground">Case</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Singular</TableHead>
            {hasPluralForms && (
              <TableHead className="font-semibold text-muted-foreground">Plural</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {CASES.map((caseItem) => {
            const singularForm = declensions.singular[caseItem.key as CaseKey];
            const pluralForm = declensions.plural?.[caseItem.key as CaseKey] ?? null;

            const parsedSingular = parseArticulatedForm(singularForm);
            const parsedPlural = parseArticulatedForm(pluralForm);

            return (
              <TableRow key={caseItem.key} className="border-border">
                <TableCell className="font-medium text-muted-foreground">
                  <span className="hidden sm:inline">{caseItem.label}</span>
                  <span className="sm:hidden">{caseItem.abbr}</span>
                </TableCell>
                <TableCell className="font-medium">
                  {parsedSingular ? (
                    <>
                      <span className={genderTextClass}>{parsedSingular.article}</span>{' '}
                      <span className="text-foreground">{parsedSingular.noun}</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground italic">—</span>
                  )}
                </TableCell>
                {hasPluralForms && (
                  <TableCell className="font-medium">
                    {parsedPlural ? (
                      <>
                        <span className={genderTextClass}>{parsedPlural.article}</span>{' '}
                        <span className="text-foreground">{parsedPlural.noun}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground italic">—</span>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
