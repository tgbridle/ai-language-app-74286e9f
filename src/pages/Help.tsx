import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Languages, Lightbulb, GraduationCap, Info } from 'lucide-react';
import { LanglyLogo } from '@/components/LanglyLogo';
import { ContactFormDialog } from '@/components/ContactFormDialog';

const WORD_TYPE_LABELS: { type: string; label: string; colorClass: string }[] = [
  { type: 'noun', label: 'Nouns', colorClass: 'bg-wordtype-noun' },
  { type: 'verb', label: 'Verbs', colorClass: 'bg-wordtype-verb' },
  { type: 'adjective', label: 'Adjectives', colorClass: 'bg-wordtype-adjective' },
  { type: 'adverb', label: 'Adverbs', colorClass: 'bg-wordtype-adverb' },
  { type: 'pronoun', label: 'Pronouns', colorClass: 'bg-wordtype-pronoun' },
  { type: 'preposition', label: 'Prepositions', colorClass: 'bg-wordtype-preposition' },
  { type: 'conjunction', label: 'Conjunctions', colorClass: 'bg-wordtype-conjunction' },
  { type: 'article', label: 'Articles', colorClass: 'bg-wordtype-article' },
];

const HELP_SECTIONS = [
  {
    icon: Search,
    title: 'Search',
    description:
      'Type any German or English word into the search bar. Suggested words appear instantly as you type. Tap one to dive deeper.',
  },
  {
    icon: BookOpen,
    title: 'Deep Dive',
    description:
      'Each word opens a detailed card with translations, grammar notes, example sentences, and full conjugation or declension tables.',
  },
  {
    icon: Languages,
    title: 'Word Types',
    description:
      'Words are colour-coded by type so you can spot patterns at a glance.',
    showWordTypes: true,
  },
  {
    icon: Lightbulb,
    title: 'Discovery Chips',
    description:
      'Not sure where to start? Tap a suggestion chip on the home screen to explore a curated word instantly.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex-1" />
            <LanglyLogo size="sm" />
            <span className="text-lg font-bold tracking-tight text-[#2d3748]">Langly</span>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1e293b]">
              How to use Langly
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg">
              Everything you need to master German vocabulary.
            </p>
          </motion.div>

          {/* What is Langly - intro card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-primary/20 bg-primary/[0.04] backdrop-blur-lg shadow-sm p-5 sm:p-6 flex gap-4 items-start mb-6"
          >
            <div className="shrink-0 mt-0.5 rounded-lg bg-primary/10 p-2.5">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1e293b]">What is Langly?</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Langly is a high-speed German dictionary for learners. Look up a word and instantly see its gender, grammar, and translation.
              </p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4"
          >
            {HELP_SECTIONS.map((section) => (
              <motion.div
                key={section.title}
                variants={item}
                className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-lg shadow-sm p-5 sm:p-6 flex gap-4 items-start"
              >
                <div className="shrink-0 mt-0.5 rounded-lg bg-primary/10 p-2.5">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#1e293b]">{section.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  {section.showWordTypes && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {WORD_TYPE_LABELS.map((wt) => (
                        <span
                          key={wt.type}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${wt.colorClass}`} />
                          {wt.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center">
            <ContactFormDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
