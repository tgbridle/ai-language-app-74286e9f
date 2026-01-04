import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PronounDeclension {
  nominative: string;
  accusative: string;
  dative: string;
}

interface PronounDeclensionTableProps {
  declension: PronounDeclension;
}

const CASES = [
  { key: 'nominative', label: 'Nominative', abbr: 'NOM' },
  { key: 'accusative', label: 'Accusative', abbr: 'ACC' },
  { key: 'dative', label: 'Dative', abbr: 'DAT' },
] as const;

export function PronounDeclensionTable({ declension }: PronounDeclensionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="w-32 font-semibold text-muted-foreground">Case</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Form</TableHead>
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
                {declension[caseItem.key]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
