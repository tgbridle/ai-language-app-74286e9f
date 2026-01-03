import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNounSearch } from '@/hooks/useNounSearch';
import type { NounSuggestion } from '@/types/noun';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSelectNoun: (nounId: string) => void;
}

export function SearchBar({ onSelectNoun }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { suggestions, isLoading } = useNounSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsOpen(suggestions.length > 0 && query.length > 0);
    setHighlightedIndex(-1);
  }, [suggestions, query]);

  const handleSelect = (suggestion: NounSuggestion) => {
    onSelectNoun(suggestion.id);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

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

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search German nouns..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && suggestions.length > 0 && setIsOpen(true)}
          className="pl-12 pr-12 h-14 text-lg border-2 border-border bg-card shadow-sm focus-visible:ring-primary"
          aria-label="Search German nouns"
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
              <span className="font-semibold text-primary">
                {suggestion.article}
              </span>{' '}
              <span className="font-medium text-foreground">
                {suggestion.lemma}
              </span>
              <span className="text-muted-foreground ml-2">
                — {suggestion.english_meaning}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
