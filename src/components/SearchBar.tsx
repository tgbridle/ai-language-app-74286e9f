import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDictionarySearch } from '@/hooks/useDictionarySearch';
import type { DictionarySuggestion } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS } from '@/lib/wordTypeColors';
import { isNounMetadata } from '@/types/dictionary';

interface SearchBarProps {
  onSelectEntry: (entryId: string) => void;
}

export function SearchBar({ onSelectEntry }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { suggestions, isLoading, searchTerm, isGerman } = useDictionarySearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Track previous suggestion count to only reset highlight when results change
  const prevSuggestionsLength = useRef(suggestions.length);
  
  useEffect(() => {
    const hasResults = suggestions.length > 0 && query.length > 0;
    setIsOpen(hasResults);
    
    // Only reset highlight when switching from no results to results, or vice versa
    if (suggestions.length !== prevSuggestionsLength.current) {
      setHighlightedIndex(-1);
      prevSuggestionsLength.current = suggestions.length;
    }
  }, [suggestions.length, query.length]);

  const handleSelect = (suggestion: DictionarySuggestion) => {
    onSelectEntry(suggestion.id);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If results exist, allow ArrowDown/ArrowUp to open the list and start navigation
    const isNavKey = e.key === 'ArrowDown' || e.key === 'ArrowUp';
    if (!isOpen && isNavKey && suggestions.length > 0) {
      setIsOpen(true);
    }

    if (!isOpen && !isNavKey) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Format suggestion based on search language
  const formatSuggestion = (suggestion: DictionarySuggestion) => {
    const article = suggestion.word_type === 'noun' && isNounMetadata(suggestion.metadata) 
      ? suggestion.metadata.article + ' ' 
      : '';
    const germanPart = `${article}${suggestion.german_word}`;
    const englishPart = suggestion.english_translation;
    const typePart = suggestion.word_type;

    if (isGerman) {
      // German input: bold German, muted English
      return (
        <>
          <span className="font-semibold text-foreground">{germanPart}</span>
          <span className={cn("text-xs ml-1", WORD_TYPE_COLORS[typePart].text)}>({typePart})</span>
          <span className="text-muted-foreground ml-2">— {englishPart}</span>
        </>
      );
    } else {
      // English input: bold English, muted German
      return (
        <>
          <span className="font-semibold text-foreground">{englishPart}</span>
          <span className="text-muted-foreground ml-2">— {germanPart}</span>
          <span className={cn("text-xs ml-1", WORD_TYPE_COLORS[typePart].text)}>({typePart})</span>
        </>
      );
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search German or English..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDownCapture={handleKeyDown}
          onFocus={() => query.length > 0 && suggestions.length > 0 && setIsOpen(true)}
          className="pl-12 pr-12 h-14 text-lg border-2 border-border bg-card shadow-sm focus-visible:ring-primary placeholder:text-muted-foreground/50"
          aria-label="Search dictionary"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="search-suggestions"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-card border-2 border-border rounded-lg shadow-lg overflow-hidden"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors border-b border-border last:border-b-0",
                highlightedIndex === index
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              )}
            >
              {formatSuggestion(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
