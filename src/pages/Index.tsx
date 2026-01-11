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
            <header className="text-center mb-10 sm:mb-14">
              {/* Logo Icon */}
              <div className="flex justify-center mb-5">
                <LanglyLogo size="lg" />
              </div>
              
              {/* Brand Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
                Langly
              </h1>
              
              {/* Tagline */}
              <p className="text-foreground text-lg font-medium">Search, learn, use.</p>
              <p className="text-muted-foreground text-lg mt-1">Your language companion.</p>
            </header>

            {/* Search Section */}
            <div className="space-y-8">
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
