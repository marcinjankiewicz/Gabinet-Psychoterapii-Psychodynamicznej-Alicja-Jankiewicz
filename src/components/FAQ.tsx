import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Sparkles,
  Clock,
  Users,
  ShieldAlert,
  MapPin,
  Heart,
} from 'lucide-react';
import { SHARED_FAQ_ITEMS, SharedFAQItem } from '../data/faqData';

const ICON_MAP: Record<SharedFAQItem['iconKey'], React.ComponentType<{ className?: string }>> = {
  help: HelpCircle,
  sparkles: Sparkles,
  heart: Heart,
  lock: Lock,
  clock: Clock,
  mappin: MapPin,
  shield: ShieldAlert,
  users: Users,
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Wszystkie');

  const categories = ['Wszystkie', 'Ogólne', 'Nurt psychodynamiczny', 'Poufność i zasady', 'Dzieci i grupa'];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 md:py-14 lg:py-16 bg-brand-card/45 border-y border-brand-card/70 scroll-mt-20">
      <div className="max-w-[840px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 flex flex-col items-center gap-3.5">
          <span className="font-sans font-semibold text-xs tracking-widest text-brand-secondary uppercase bg-brand-accent/30 px-3 py-1.5 rounded-full">
            Odpowiedzi na Twoje pytania
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight">
            Często Zadawane Pytania (FAQ)
          </h2>
          <p className="text-brand-muted font-sans text-sm sm:text-base leading-relaxed max-w-[620px]">
            Rozpoczęcie psychoterapii to ważny krok, który może budzić wiele pytań.
            Poznaj kluczowe informacje o przebiegu spotkań, zasadach poufności, kosztach oraz nurcie psychodynamicznym.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-brand-primary text-white shadow-soft-lift scale-[1.02]'
                  : 'bg-brand-bg/60 text-brand-muted hover:text-brand-primary hover:bg-brand-card'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {SHARED_FAQ_ITEMS.map((item, index) => {
            const Icon = ICON_MAP[item.iconKey];
            const isOpen = openIndex === index;
            const isInCategory = activeCategory === 'Wszystkie' || item.category === activeCategory;

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-2xl border transition-all duration-300 bg-brand-bg ${
                  isInCategory ? 'block' : 'hidden'
                } ${
                  isOpen
                    ? 'border-brand-secondary/35 shadow-soft-lift'
                    : 'border-brand-card/60 hover:border-brand-primary/20'
                }`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-4 justify-between focus:outline-hidden cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${item.id}`}
                  >
                    <span className="flex items-start gap-3.5">
                      <span
                        className={`p-2 rounded-xl shrink-0 transition-colors ${
                          isOpen ? 'bg-brand-accent/40 text-brand-secondary' : 'bg-brand-card text-brand-primary/80'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                      <span className="font-serif font-bold text-brand-primary text-base sm:text-lg leading-snug pt-1">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`p-1.5 rounded-full shrink-0 mt-0.5 transition-colors ${
                        isOpen ? 'bg-brand-secondary text-white' : 'text-brand-muted bg-brand-card'
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>

                {/* CSS Grid umożliwia pełne indeksowanie treści w DOM przy płynnym rozwijaniu */}
                <div
                  id={`faq-content-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-brand-muted font-sans text-sm sm:text-base leading-relaxed border-t border-brand-card/50">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEO Bottom Accent */}
        <div className="mt-8 md:mt-10 text-center p-6 bg-brand-bg/40 rounded-2xl border border-brand-card/50">
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
            Masz inne pytania dotyczące przebiegu psychoterapii w Gdańsku?
            Zapraszam do bezpośredniego kontaktu telefonicznego (+48 514 309 526) lub mailowego – chętnie rozwieję wszelkie wątpliwości przed umówieniem pierwszej konsultacji.
          </p>
        </div>
      </div>
    </section>
  );
}
