import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { WordDeepDive } from '@/components/WordDeepDive';
import { LanglyLogo } from '@/components/LanglyLogo';

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = useCallback((focused: boolean) => {
    setIsSearchFocused(focused);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {selectedEntryId ? (
        <div className="container mx-auto px-4 py-10 sm:py-16">
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
                  // Allow clicking overlay to unfocus
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
                    <div className="flex justify-center -mb-1">
                      <LanglyLogo size="lg" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
                      Langly
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl">Your language learning companion.</p>
                    <p className="text-muted-foreground text-lg sm:text-xl mt-1">Search, learn, use.</p>
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
                    <span className="text-lg font-bold text-foreground tracking-tight">Langly</span>
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

                {/* Discovery hint */}
                <AnimatePresence>
                  {!isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-center text-muted-foreground text-sm"
                    >
                      <p>
                        Explore everything from verbs to prepositions. Try:{' '}
                        <span className="font-medium text-foreground/70">sein</span>,{' '}
                        <span className="font-medium text-foreground/70">Hund</span>,{' '}
                        <span className="font-medium text-foreground/70">mit</span>, or{' '}
                        <span className="font-medium text-foreground/70">to have</span>...
                      </p>
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
