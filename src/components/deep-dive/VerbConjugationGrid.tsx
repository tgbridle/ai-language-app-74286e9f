interface VerbConjugation {
  ich: string;
  du: string;
  er_sie_es: string;
  wir: string;
  ihr: string;
  sie_Sie: string;
}

interface VerbConjugationGridProps {
  conjugation: VerbConjugation;
}

const PRONOUNS = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er/sie/es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie/Sie' },
] as const;

export function VerbConjugationGrid({ conjugation }: VerbConjugationGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {PRONOUNS.map(({ key, label }) => (
        <div 
          key={key}
          className="bg-muted/50 rounded-lg p-3 text-center"
        >
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-foreground">{conjugation[key]}</p>
        </div>
      ))}
    </div>
  );
}
