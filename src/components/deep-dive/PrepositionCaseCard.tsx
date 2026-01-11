import { cn } from '@/lib/utils';
import { CASE_COLORS } from '@/lib/wordTypeColors';

interface PrepositionCaseCardProps {
  caseType: 'accusative' | 'dative' | 'genitive' | 'two-way';
  note?: string;
  contractions?: string[];
}

const CASE_LABELS: Record<string, { label: string; prefix: string }> = {
  accusative: { label: 'ACCUSATIVE', prefix: 'ALWAYS' },
  dative: { label: 'DATIVE', prefix: 'ALWAYS' },
  genitive: { label: 'GENITIVE', prefix: 'ALWAYS' },
  'two-way': { label: 'WECHSEL', prefix: '' },
};

export function PrepositionCaseCard({
  caseType,
  note,
  contractions,
}: PrepositionCaseCardProps) {
  const caseInfo = CASE_LABELS[caseType];
  const isTwoWay = caseType === 'two-way';

  return (
    <div className="space-y-6">
      {/* Case Requirement Display */}
      <div
        className={cn(
          'rounded-xl p-6 text-center border',
          CASE_COLORS[caseType]
        )}
      >
        {isTwoWay ? (
          <>
            <p className="text-sm font-medium uppercase tracking-wider opacity-75 mb-1">
              Two-Way Preposition
            </p>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              {caseInfo.label}
            </p>
            <p className="text-sm mt-2 opacity-80">
              Accusative (Wohin?) or Dative (Wo?)
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium uppercase tracking-wider opacity-75 mb-1">
              {caseInfo.prefix}
            </p>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              {caseInfo.label}
            </p>
          </>
        )}
      </div>

      {/* Contractions Section */}
      {contractions && contractions.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Common Contractions
          </h4>
          <div className="flex flex-wrap gap-2">
            {contractions.map((contraction, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground font-medium text-sm"
              >
                {contraction}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Note Section */}
      {note && (
        <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-r-lg">
          <p className="text-foreground text-sm leading-relaxed">{note}</p>
        </div>
      )}
    </div>
  );
}
