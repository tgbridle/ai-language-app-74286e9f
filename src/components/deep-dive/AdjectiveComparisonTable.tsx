import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdjectiveComparisonTableProps {
  baseWord: string;
  comparative?: string;
  superlative?: string;
}

const COMPARISON_FORMS = [
  { key: 'positive', label: 'Positive' },
  { key: 'comparative', label: 'Comparative' },
  { key: 'superlative', label: 'Superlative' },
] as const;

export function AdjectiveComparisonTable({
  baseWord,
  comparative,
  superlative,
}: AdjectiveComparisonTableProps) {
  const forms: Record<string, string | undefined> = {
    positive: baseWord,
    comparative,
    superlative,
  };

  // Filter to only show rows that have values
  const visibleForms = COMPARISON_FORMS.filter(
    (form) => forms[form.key] !== undefined && forms[form.key] !== ''
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-border">
          <TableHead className="text-muted-foreground font-medium w-1/3">
            Form
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            German
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visibleForms.map((form) => (
          <TableRow key={form.key} className="border-border">
            <TableCell className="text-muted-foreground">
              {form.label}
            </TableCell>
            <TableCell className="font-medium text-foreground">
              {forms[form.key]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
