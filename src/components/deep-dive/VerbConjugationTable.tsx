import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface VerbConjugation {
  ich: string;
  du: string;
  er_sie_es: string;
  wir: string;
  ihr: string;
  sie_Sie: string;
}

interface VerbConjugationTableProps {
  conjugation: VerbConjugation;
}

const CONJUGATION_ROWS = [
  { 
    label: '1st Person', 
    singularPronoun: 'ich', 
    pluralPronoun: 'wir',
    singularKey: 'ich' as const, 
    pluralKey: 'wir' as const 
  },
  { 
    label: '2nd Person', 
    singularPronoun: 'du', 
    pluralPronoun: 'ihr',
    singularKey: 'du' as const, 
    pluralKey: 'ihr' as const 
  },
  { 
    label: '3rd Person', 
    singularPronoun: 'er/sie/es', 
    pluralPronoun: 'sie/Sie',
    singularKey: 'er_sie_es' as const, 
    pluralKey: 'sie_Sie' as const 
  },
];

export function VerbConjugationTable({ conjugation }: VerbConjugationTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-border">
            <TableHead className="w-[120px] text-muted-foreground font-medium text-xs uppercase tracking-wide">
              Person
            </TableHead>
            <TableHead className="text-center text-muted-foreground font-medium text-xs uppercase tracking-wide">
              Singular
            </TableHead>
            <TableHead className="text-center text-muted-foreground font-medium text-xs uppercase tracking-wide">
              Plural
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CONJUGATION_ROWS.map((row) => (
            <TableRow key={row.label} className="border-b border-border/50">
              <TableCell className="py-4 text-sm text-muted-foreground font-medium">
                {row.label}
              </TableCell>
              <TableCell className="py-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground/70 italic">
                    {row.singularPronoun}
                  </span>
                  <span className="font-semibold text-foreground text-base">
                    {conjugation[row.singularKey]}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground/70 italic">
                    {row.pluralPronoun}
                  </span>
                  <span className="font-semibold text-foreground text-base">
                    {conjugation[row.pluralKey]}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
