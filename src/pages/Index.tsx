import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { WordDeepDive } from '@/components/WordDeepDive';
import { LanglyLogo } from '@/components/LanglyLogo';

const DISCOVERY_CHIPS = [
  { label: 'sein', entryId: '83227903-a9aa-42a5-bc51-53650b191bcf' },
  { label: 'Hund', entryId: '82e24009-6524-4ceb-8613-7bde31dc5c63' },
  { label: 'mit', entryId: 'ee5f4b2a-dbcc-426a-8913-6861222e85d1' },
  { label: 'to have', entryId: 'ced5c26c-2abe-4d7b-83f5-dd26c875bc08' },
  { label: 'schnell', entryId: '1b016895-0aa2-40e3-8bb6-90d9d41086b8' },
  { label: 'aber', entryId: 'd20e7dac-479f-470c-ac8e-407896b316c9' },
];

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = useCallback((focused: boolean) => {
    setIsSearchFocused(focused);
  }, []);

  const handleChipClick = (entryId: string) => {
    setSelectedEntryId(entryId);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mesh gradient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[hsl(217,91%,60%)] opacity-[0.05] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[hsl(270,60%,60%)] opacity-[0.05] blur-[120px]" />
      </div>

      {selectedEntryId ? (
        <div className="container mx-auto px-4 py-10 sm:py-16 relative z-10">
          <WordDeepDive entryId={selectedEntryId} onBack={() => setSelectedEntryId(null)} />
        </div>
      ) : (
        <>
          {/* Focus mode overlay */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm"
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>('[aria-label="Search dictionary"]');
                  input?.blur();
                }}
              />
            )}
          </AnimatePresence>

          <div className="container mx-auto px-4 py-10 sm:py-16 relative z-40">
            <main className="max-w-2xl mx-auto">
              {/* Hero Branding Section */}
              <AnimatePresence mode="wait">
                {!isSearchFocused && (
                  <motion.header
                    key="hero"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-center mb-10 sm:mb-12"
                  >
                    <div className="flex justify-center">
                      <LanglyLogo size="lg" />
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 text-foreground pb-2 leading-tight">
                      Langly
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl font-medium">
                      Master German, one word at a time.
                    </p>
                  </motion.header>
                )}
              </AnimatePresence>

              {/* Pinned mini header in focus mode */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    key="mini-header"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="flex items-center gap-1 mb-4"
                  >
                    <LanglyLogo size="sm" />
                    <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,60%)] bg-clip-text text-transparent">
                      Langly
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search Section */}
              <motion.div
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <SearchBar
                  onSelectEntry={setSelectedEntryId}
                  onFocusChange={handleSearchFocus}
                />

                {/* Discovery Chips */}
                <AnimatePresence>
                  {!isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-wrap justify-center gap-2"
                    >
                      {DISCOVERY_CHIPS.map((chip) => (
                        <button
                          key={chip.entryId}
                          onClick={() => handleChipClick(chip.entryId)}
                          className="px-4 py-1.5 rounded-full text-sm font-medium bg-muted hover:bg-accent border border-border/50 transition-all duration-200 hover:scale-105 bg-gradient-to-r hover:from-[hsl(217,91%,60%)]/10 hover:to-[hsl(270,60%,60%)]/10 text-primary"
                        >
                          {chip.label}
                        </button>
                      ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
