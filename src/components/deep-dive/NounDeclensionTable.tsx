import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface NounDeclension {
  nom_sg: string;
  acc_sg: string;
  dat_sg: string;
  gen_sg: string;
  nom_pl: string | null;
  acc_pl: string | null;
  dat_pl: string | null;
  gen_pl: string | null;
}

interface NounDeclensionTableProps {
  declension: NounDeclension;
  article: string;
}

const CASES = [
  { key: 'nom', label: 'Nominative', abbr: 'NOM' },
  { key: 'acc', label: 'Accusative', abbr: 'ACC' },
  { key: 'dat', label: 'Dative', abbr: 'DAT' },
  { key: 'gen', label: 'Genitive', abbr: 'GEN' },
] as const;

export function NounDeclensionTable({ declension, article }: NounDeclensionTableProps) {
  const hasPluralForms = declension.nom_pl || declension.acc_pl || declension.dat_pl || declension.gen_pl;

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
            const sgKey = `${caseItem.key}_sg` as keyof NounDeclension;
            const plKey = `${caseItem.key}_pl` as keyof NounDeclension;
            const singularForm = declension[sgKey] as string;
            const pluralForm = declension[plKey] as string | null;

            return (
              <TableRow key={caseItem.key} className="border-border">
                <TableCell className="font-medium text-muted-foreground">
                  <span className="hidden sm:inline">{caseItem.label}</span>
                  <span className="sm:hidden">{caseItem.abbr}</span>
                </TableCell>
                <TableCell className="font-medium">
                  <span className="text-primary">{article}</span>{' '}
                  <span className="text-foreground">{singularForm}</span>
                </TableCell>
                {hasPluralForms && (
                  <TableCell className="font-medium">
                    {pluralForm ? (
                      <>
                        <span className="text-primary">die</span>{' '}
                        <span className="text-foreground">{pluralForm}</span>
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
