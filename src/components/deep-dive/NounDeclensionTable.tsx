import { useState } from 'react';
import { NounDeclensions } from '@/types/dictionary';
import { GENDER_TEXT_COLORS } from '@/lib/wordTypeColors';
import { cn } from '@/lib/utils';

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

  const [activeTab, setActiveTab] = useState<'singular' | 'plural'>('singular');
  const genderTextClass = GENDER_TEXT_COLORS[gender];

  const currentForms = activeTab === 'singular' ? declensions.singular : declensions.plural;

  return (
    <div>
      {/* Tabs */}
      {hasPluralForms && (
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => setActiveTab('singular')}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'singular'
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            Singular
          </button>
          <button
            onClick={() => setActiveTab('plural')}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'plural'
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            Plural
          </button>
        </div>
      )}

      {/* Compact case rows */}
      <div className="space-y-1">
        {CASES.map((caseItem) => {
          const form = currentForms?.[caseItem.key as CaseKey] ?? null;
          const parsed = parseArticulatedForm(form);

          return (
            <div
              key={caseItem.key}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/40"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground w-16">
                {caseItem.abbr}
              </span>
              <span className="font-medium text-right">
                {parsed ? (
                  <>
                    <span className={genderTextClass}>{parsed.article}</span>{' '}
                    <span className="text-foreground">{parsed.noun}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground italic">-</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
