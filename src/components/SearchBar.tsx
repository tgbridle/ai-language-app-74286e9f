import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDictionarySearch } from '@/hooks/useDictionarySearch';
import type { DictionarySuggestion } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { WORD_TYPE_COLORS } from '@/lib/wordTypeColors';
import { isNounMetadata } from '@/types/dictionary';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  onSelectEntry: (entryId: string) => void;
  onFocusChange?: (focused: boolean) => void;
  externalQuery?: string | null;
  onExternalQueryConsumed?: () => void;
}

export function SearchBar({ onSelectEntry, onFocusChange, externalQuery, onExternalQueryConsumed }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { suggestions, isLoading } = useDictionarySearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const prevSuggestionsLength = useRef(suggestions.length);

  useEffect(() => {
    const hasResults = suggestions.length > 0 && query.length > 0;
    setIsOpen(hasResults);

    if (suggestions.length !== prevSuggestionsLength.current) {
      setHighlightedIndex(-1);
      prevSuggestionsLength.current = suggestions.length;
    }
  }, [suggestions.length, query.length]);

  // Handle external query from discovery chips
  useEffect(() => {
    if (externalQuery) {
      setQuery(externalQuery);
      inputRef.current?.focus();
      onExternalQueryConsumed?.();
    }
  }, [externalQuery, onExternalQueryConsumed]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
    if (query.length > 0 && suggestions.length > 0) setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Don't blur if clicking within the search container
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    // Delay to allow click events on suggestions
    setTimeout(() => {
      setIsFocused(false);
      onFocusChange?.(false);
      setIsOpen(false);
    }, 150);
  };

  const handleSelect = (suggestion: DictionarySuggestion) => {
    onSelectEntry(suggestion.id);
    setQuery('');
    setIsOpen(false);
    setIsFocused(false);
    onFocusChange?.(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isNavKey = e.key === 'ArrowDown' || e.key === 'ArrowUp';
    if (!isOpen && isNavKey && suggestions.length > 0) {
      setIsOpen(true);
    }

    if (!isOpen && !isNavKey) return;

    const goNext = e.key === 'ArrowDown';
    const goPrev = e.key === 'ArrowUp';

    switch (true) {
      case goNext:
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case goPrev:
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case e.key === 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case e.key === 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const formatSuggestion = (suggestion: DictionarySuggestion) => {
    let article = '';
    if (suggestion.word_type === 'noun' && isNounMetadata(suggestion.metadata)) {
      const nomSingular = suggestion.metadata.declensions?.singular?.nominative;
      if (nomSingular) {
        const parts = nomSingular.split(' ');
        if (parts.length >= 2) {
          article = parts[0] + ' ';
        }
      }
    }
    const germanPart = `${article}${suggestion.german_word}`;
    const englishPart = suggestion.english_translation;
    const typePart = suggestion.word_type;

    return (
      <span className="flex items-center justify-between w-full">
        <span className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-foreground truncate">{germanPart}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-medium select-none">DE</span>
          <span className="text-muted-foreground/30 mx-0.5">·</span>
          <span className="text-muted-foreground truncate">{englishPart}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-medium select-none">EN</span>
        </span>
        <span className={cn("text-xs ml-3 shrink-0 font-mono uppercase tracking-wider", WORD_TYPE_COLORS[typePart].text)}>
          {typePart}
        </span>
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto" onBlur={handleBlur}>
      <div className="relative">
        <Search className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for a German or English word"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDownCapture={handleKeyDown}
          onFocus={handleFocus}
          className={cn(
            "pl-11 pr-12 h-14 text-lg placeholder:text-muted-foreground/50 placeholder:text-base placeholder:font-normal transition-all duration-300",
            "bg-card/80 backdrop-blur-[10px] border border-border/60",
            "shadow-[0_2px_20px_-4px_hsl(217,91%,60%,0.15),0_1px_4px_-1px_hsl(0,0%,0%,0.06)]",
            isFocused
              ? "border-primary/50 ring-2 ring-primary/20 shadow-[0_4px_30px_-4px_hsl(217,91%,60%,0.25)]"
              : "hover:shadow-[0_4px_24px_-4px_hsl(217,91%,60%,0.2)] hover:border-border"
          )}
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
          className={cn(
            "absolute z-50 w-full rounded-xl overflow-hidden max-h-72 overflow-y-auto",
            // Glassmorphism container
            "bg-card/95 dark:bg-card/90",
            "backdrop-blur-xl",
            "border border-white/20 dark:border-white/10",
            "shadow-xl shadow-primary/5",
            "mt-2"
          )}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelect(suggestion)}
              onMouseMove={() => {
                // Only update on mouse move to avoid fighting with keyboard nav
                if (highlightedIndex !== index) setHighlightedIndex(index);
              }}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors duration-75",
                "border-b border-border/50 last:border-b-0",
                highlightedIndex === index
                  ? "bg-accent"
                  : ""
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
