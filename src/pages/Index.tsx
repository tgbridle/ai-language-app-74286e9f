import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { NounDeepDive } from '@/components/NounDeepDive';

const Index = () => {
  const [selectedNounId, setSelectedNounId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
            German Vocab Deep-Dive
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Master German nouns with complete declension tables and grammar insights
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto">
          {selectedNounId ? (
            <NounDeepDive
              nounId={selectedNounId}
              onBack={() => setSelectedNounId(null)}
            />
          ) : (
            <div className="space-y-8">
              <SearchBar onSelectNoun={setSelectedNounId} />
              
              {/* Hint */}
              <div className="text-center text-muted-foreground text-sm">
                <p>Try searching: <span className="font-medium">Hund</span>, <span className="font-medium">Hunden</span>, <span className="font-medium">Katze</span>, or <span className="font-medium">Bücher</span></p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
