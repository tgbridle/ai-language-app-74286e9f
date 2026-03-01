import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Languages, Lightbulb, GraduationCap } from 'lucide-react';
import { LanglyLogo } from '@/components/LanglyLogo';

const HELP_SECTIONS = [
  {
    icon: Search,
    title: 'Search',
    description:
      'Type any German or English word into the search bar. Results appear instantly as you type. Tap one to dive deeper.',
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
      'Words are colour-coded by type: nouns, verbs, adjectives, and more, so you can spot patterns at a glance.',
  },
  {
    icon: Lightbulb,
    title: 'Discovery Chips',
    description:
      'Not sure where to start? Tap a suggestion chip on the home screen to explore a curated word instantly.',
  },
  {
    icon: GraduationCap,
    title: 'Grammar Tables',
    description:
      'Verbs show full conjugation grids across all tenses. Nouns and articles display declension tables by case and gender.',
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
            <span className="text-lg font-bold tracking-tight text-foreground">Langly</span>
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

          {/* Cards */}
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;
