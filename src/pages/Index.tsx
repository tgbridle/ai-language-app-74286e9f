import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WordDeepDive } from '@/components/WordDeepDive';
import { LanglyLogo } from '@/components/LanglyLogo';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Index = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('export-dictionary');
      if (error) throw error;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'langly-dictionary-export.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Dictionary exported successfully');
    } catch (err) {
      console.error('Export error:', err);
      toast.error('Failed to export dictionary');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        {selectedEntryId ? (
          <WordDeepDive entryId={selectedEntryId} onBack={() => setSelectedEntryId(null)} />
        ) : (
          <main className="max-w-2xl mx-auto">
            {/* Hero Branding Section */}
            <header className="text-center mb-10 sm:mb-12">
              {/* Large Logo */}
              <div className="flex justify-center -mb-1">
                <LanglyLogo size="lg" />
              </div>
              
              {/* Brand Name */}
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
                Langly
              </h1>
              
              {/* Tagline */}
              <p className="text-muted-foreground text-lg sm:text-xl">Your language learning companion.</p>
              <p className="text-muted-foreground text-lg sm:text-xl mt-1">Search, learn, use.</p>
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
              {/* Export */}
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="text-muted-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Exporting…' : 'Export Dictionary (JSON)'}
                </Button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Index;
