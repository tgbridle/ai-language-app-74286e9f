import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WordDeepDive } from '@/components/WordDeepDive';

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">Langly</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">Lookup, understand, apply. Your companion for learning a language.</p>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto">
          {selectedEntryId ? (
            <WordDeepDive entryId={selectedEntryId} onBack={() => setSelectedEntryId(null)} />
          ) : (
            <div className="space-y-8">
              <SearchBar onSelectEntry={setSelectedEntryId} />
              
              {/* Hint */}
              <div className="text-center text-muted-foreground text-sm">
                <p>Try searching: <span className="font-medium">sein</span>, <span className="font-medium">gut</span>, <span className="font-medium">mit</span>, or <span className="font-medium">to have</span></p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
