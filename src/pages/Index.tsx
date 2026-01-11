import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WordDeepDive } from '@/components/WordDeepDive';
import { LanglyLogo } from '@/components/LanglyLogo';

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {selectedEntryId ? (
          <WordDeepDive entryId={selectedEntryId} onBack={() => setSelectedEntryId(null)} />
        ) : (
          <main className="max-w-2xl mx-auto">
            {/* Branding Section */}
            <header className="text-center mb-8 sm:mb-10">
              {/* Logo + Brand Name */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <LanglyLogo size="lg" />
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  Langly
                </h1>
              </div>
              
              {/* Tagline - swapped order, both grey */}
              <p className="text-muted-foreground text-lg">Your language learning companion.</p>
              <p className="text-muted-foreground text-lg mt-1">Search, learn, use.</p>
            </header>

            {/* Search Section */}
            <div className="space-y-6">
              <SearchBar onSelectEntry={setSelectedEntryId} />
              
              {/* Discovery hint */}
              <div className="text-center text-muted-foreground text-sm">
                <p>
                  Explore everything from verbs to prepositions. Try:{' '}
                  <span className="font-medium text-foreground/70">sein</span>,{' '}
                  <span className="font-medium text-foreground/70">Hund</span>,{' '}
                  <span className="font-medium text-foreground/70">mit</span>, or{' '}
                  <span className="font-medium text-foreground/70">to have</span>...
                </p>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Index;
