import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Lock, Sparkles, Clock, Users, ShieldAlert } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Ogólne' | 'Nurt psychodynamiczny' | 'Poufność i zasady' | 'Dzieci i grupa';
  icon: React.ComponentType<{ className?: string }>;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Wszystkie');

  const faqData: FAQItem[] = [
    {
      question: "Czym jest psychoterapia psychodynamiczna i jak działa?",
      answer: "Psychoterapia psychodynamiczna zakłada, że ludzkim zachowaniem kierują w dużej mierze nieświadome motywy, wewnętrzne konflikty i ukształtowane już od wczesnego dzieciństwa wzorce relacji. Zadaniem psychoterapii jest rozpoznanie tych schematów oraz ich pochodzenia poprzez analizę przeniesienia. Terapeuta bada sposoby przeżywania, rozumienia i reagowania zgłaszającej się osoby w jej życiu codziennym w odniesieniu do tego, co dzieje się w relacji terapeutycznej. W ten sposób pacjenci mogą doświadczyć w bezpiecznych warunkach obserwacji oraz zmiany swojego funkcjonowania - co prowadzi do trwałej zmiany emocjonalnej i redukcji objawów.",
      category: "Nurt psychodynamiczny",
      icon: Sparkles
    },
    {
      question: "Jak wygląda pierwsza wizyta (konsultacja psychologiczna)?",
      answer: "Pierwsze 3-5 spotkań ma charakter konsultacji wstępnych. Służą one lepszemu poznaniu Twojej sytuacji życiowej, czyli zebraniu szczegółowego wywiadu, zgłaszanych trudności oraz oczekiwań. To także czas na ustalenie celów, które będą wyznaczać pracę terapeutyczną. Czas konsultacji to także okres stawiania diagnozy psychodynamicznej, kiedy to terapeuta próbuje rozpoznać strukturę osobowości pacjenta oraz jego mechanizmy funkcjonowania - pomaga to także przy stawianiu celów terapeutycznych. Proces konsultacji nie zobowiązuje do podjęcia psychoterapii, ale jeśli  podejmiesz taką decyzję, to zwieńczeniem spotkań jest ustalenie kontraktu terapeutycznego.",
      category: "Ogólne",
      icon: HelpCircle
    },
    {
      question: "Jak często odbywają się sesje i ile trwa jedno spotkanie?",
      answer: "Sesje psychoterapii indywidualnej odbywają się regularnie, zazwyczaj raz lub dwa razy w tygodniu, o stałych, ustalonych wspólnie porach. Każde spotkanie indywidualne trwa dokładnie 50 minut. Regularność i stałość czasu stanowią kluczowe ramy terapeutyczne (tzw. setting), które sprzyjają poczuciu bezpieczeństwa i ciągłości pracy.",
      category: "Ogólne",
      icon: Clock
    },
    {
      question: "Czy obowiązuje Panią tajemnica zawodowa i poufność?",
      answer: "Tak, jako psycholog i psychoterapeuta jestem bezwzględnie zobowiązana do zachowania tajemnicy zawodowej. Wszystkie informacje przekazane podczas sesji są całkowicie poufne. Jedynym wyjątkiem od tej zasady jest sytuacja bezpośredniego zagrożenia życia lub zdrowia pacjenta bądź innych osób, co regulują polskie przepisy prawa.",
      category: "Poufność i zasady",
      icon: Lock
    },
    {
      question: "Jak wygląda psychoterapia dziecięca oraz praca z młodzieżą?",
      answer: "Psychoterapia dzieci i młodzieży uwzględnia specyfikę rozwojową młodego człowieka. W przypadku najmłodszych dzieci kluczowym elementem jest obserwacja swobodnej zabawy oraz ścisła współpraca z rodzicami/opiekunami prawnymi (regularne konsultacje). Praca z nastolatkami skupia się na budowaniu zaufania, wsparciu w kryzysach tożsamościowych i rówieśniczych, z zachowaniem poufności dostosowanej do wieku małoletniego. Mój gabinet działa w pełnej zgodności ze Standardami Ochrony Małoletnich przed Krzywdzeniem.",
      category: "Dzieci i grupa",
      icon: ShieldAlert
    },
    {
      question: "Dla kogo przeznaczona jest psychoterapia grupowa i jak działa?",
      answer: "Psychoterapia grupowa to wysoce skuteczna metoda leczenia, w której proces terapeutyczny opiera się na interakcjach zachodzących między uczestnikami grupy w obecności terapeuty. Jest idealnym rozwiązaniem dla osób zmagających się z trudnościami w relacjach interpersonalnych, poczuciem wycofania społecznego, zaburzeniami osobowości czy lękiem społecznym. Grupa stanowi bezpieczną mikro-społeczność, w której można doświadczyć wsparcia, odbić swoje zachowania w oczach innych i przećwiczyć nowe, zdrowsze sposoby komunikacji.",
      category: "Dzieci i grupa",
      icon: Users
    },
    {
      question: "Jak długo trwa cały proces psychoterapeutyczny?",
      answer: "Czas trwania terapii jest kwestią indywidualną i zależy od zgłaszanych problemów oraz celów pacjenta. Może mieć formę pomocy krótkoterminowej (od kilku do kilkunastu spotkań nastawionych na konkretny kryzys) lub psychoterapii długoterminowej (trwającej rok, dwa lata lub dłużej), która pozwala na głębszą przebudowę struktur osobowości i przepracowanie utrwalonych mechanizmów obronnych.",
      category: "Ogólne",
      icon: Clock
    }
  ];

  const categories = ['Wszystkie', 'Ogólne', 'Nurt psychodynamiczny', 'Poufność i zasady', 'Dzieci i grupa'];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-brand-card/45 border-y border-brand-card/70 scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[840px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-4">
          <span className="font-sans font-semibold text-xs tracking-widest text-brand-secondary uppercase bg-brand-accent/30 px-3 py-1.5 rounded-full">
            Odpowiedzi na Twoje pytania
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight">
            Często Zadawane Pytania (FAQ)
          </h2>
          <p className="text-brand-muted font-sans text-sm sm:text-base leading-relaxed max-w-[620px]">
            Rozpoczęcie psychoterapii to ważny krok, który może budzić wiele pytań. 
            Poznaj kluczowe informacje o przebiegu spotkań, zasadach poufności i nurcie psychodynamicznym.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
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
        <div className="space-y-4">
          <div className="space-y-3.5">
            {faqData.map((item, index) => {
              const Icon = item.icon;
              const isOpen = openIndex === index;
              const isInCategory = activeCategory === 'Wszystkie' || item.category === activeCategory;

              return (
                <div
                  key={item.question}
                  id={`faq-item-${index}`}
                  className={`rounded-2xl border transition-all duration-300 bg-brand-bg ${
                    isInCategory ? 'block' : 'hidden'
                  } ${
                    isOpen
                      ? 'border-brand-secondary/35 shadow-soft-lift'
                      : 'border-brand-card/60 hover:border-brand-primary/20'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-4 justify-between focus:outline-hidden cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen ? 'bg-brand-accent/40 text-brand-secondary' : 'bg-brand-card text-brand-primary/80'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-brand-primary text-base sm:text-lg leading-snug pt-1">
                        {item.question}
                      </h3>
                    </div>
                    <span className={`p-1.5 rounded-full shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'bg-brand-secondary text-white' : 'text-brand-muted bg-brand-card'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {/* ZMIANA: Struktura CSS Grid umożliwiająca 100% indeksowania przy jednoczesnej płynnej animacji rozwijania */}
                  <div
                    id={`faq-content-${index}`}
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
        </div>

        {/* SEO Bottom Accent */}
        <div className="mt-12 text-center p-6 bg-brand-bg/40 rounded-2xl border border-brand-card/50">
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
            Masz inne pytania dotyczące przebiegu psychoterapii w Gdańsku? 
            Zapraszam do bezpośredniego kontaktu telefonicznego lub mailowego – chętnie rozwieję wszelkie wątpliwości przed umówieniem pierwszej konsultacji.
          </p>
        </div>

      </div>
    </section>
  );
}
