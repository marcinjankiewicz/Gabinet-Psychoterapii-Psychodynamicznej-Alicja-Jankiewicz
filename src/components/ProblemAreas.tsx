import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wind,
  CloudRain,
  HeartHandshake,
  Compass,
  Briefcase,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceRouteSlug } from './ServiceLandingPage';

interface ProblemAreasProps {
  onOpenBooking: () => void;
}

interface ProblemAreaItem {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  targetSlug?: ServiceRouteSlug;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PROBLEM_AREAS: ProblemAreaItem[] = [
  {
    id: 'lek-panika',
    title: 'Przewlekły lęk i ataki paniki',
    description:
      'Uporczywe zamartwianie się, nagłe fale niepokoju, napięcie z ciała lub lęk społeczny, które odbierają poczucie bezpieczeństwa i utrudniają codzienne funkcjonowanie.',
    ctaLabel: 'Psychoterapia indywidualna',
    targetSlug: 'psychoterapia-indywidualna-gdansk',
    icon: Wind,
  },
  {
    id: 'obnizony-nastroj',
    title: 'Obniżony nastrój i brak energii',
    description:
      'Długotrwały smutek, utrata radości życia, poczucie wewnętrznej pustki, obniżone poczucie własnej wartości lub przewlekłe zmęczenie emocjonalne i stany depresyjne.',
    ctaLabel: 'Psychoterapia indywidualna',
    targetSlug: 'psychoterapia-indywidualna-gdansk',
    icon: CloudRain,
  },
  {
    id: 'relacje-granice',
    title: 'Trudności w relacjach i stawianiu granic',
    description:
      'Powtarzające się bolesne schematy w związkach, lęk przed bliskością lub odrzuceniem, poczucie bycia nierozumianym oraz trudność w wyrażaniu własnych potrzeb.',
    ctaLabel: 'Umów konsultację wstępną',
    icon: HeartHandshake,
  },
  {
    id: 'kryzys-stres',
    title: 'Kryzys życiowy i przewlekły stres',
    description:
      'Rozstanie, rozwód, doświadczenie żałoby lub straty, nagła zmiana sytuacji życiowej oraz poczucie przytłoczenia, gdy dotychczasowe sposoby radzenia sobie nie wystarczają.',
    ctaLabel: 'Pomoc w kryzysie',
    targetSlug: 'pomoc-w-kryzysie-gdansk',
    icon: Compass,
  },
  {
    id: 'wypalenie-zawodowe',
    title: 'Wypalenie zawodowe i perfekcjonizm',
    description:
      'Przeciążenie odpowiedzialnością, surowy wewnętrzny krytyk, niemożność odpoczynku, bezsenność lub dolegliwości psychosomatyczne związane z długotrwałym napięciem.',
    ctaLabel: 'Umów konsultację wstępną',
    icon: Briefcase,
  },
  {
    id: 'dzieci-mlodziez',
    title: 'Trudności emocjonalne dzieci i młodzieży',
    description:
      'Lęki szkolne i rówieśnicze, wycofanie, obniżony nastrój, trudności w regulacji złości, kryzysy dorastania oraz wsparcie rodziców w rozumieniu potrzeb dziecka.',
    ctaLabel: 'Psycholog dzieci i młodzieży',
    targetSlug: 'psycholog-dzieciecy-gdansk',
    icon: Users,
  },
];

export default function ProblemAreas({ onOpenBooking }: ProblemAreasProps) {
  const navigate = useNavigate();

  const handleCardAction = (item: ProblemAreaItem) => {
    if (item.targetSlug) {
      navigate(`/${item.targetSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onOpenBooking();
    }
  };

  return (
    <section
      id="z-czym-sie-zglosic"
      className="py-10 md:py-12 lg:py-14 max-w-[1140px] mx-auto px-6 scroll-mt-20"
    >
      <div className="text-center max-w-[740px] mx-auto mb-8 md:mb-10 flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase bg-brand-accent/35 text-brand-secondary border border-brand-accent/50">
          <Sparkles size={12} />
          Obszary pracy terapeutycznej
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-primary tracking-tight">
          Z czym możesz się zgłosić?
        </h2>
        <p className="text-brand-muted font-sans font-light leading-relaxed text-base sm:text-lg">
          Nie musisz mieć gotowej diagnozy ani wiedzieć, jak dokładnie nazwać swoje doświadczenia. W nurcie psychodynamicznym wspólnie przyglądamy się źródłom cierpienia, aby stopniowo odzyskać wewnętrzną równowagę.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROBLEM_AREAS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="bg-brand-card/75 hover:bg-brand-card p-7 rounded-2xl border border-brand-card/60 hover:border-brand-accent/50 shadow-soft-lift transition-all duration-300 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="p-2.5 bg-brand-bg rounded-xl inline-flex items-center justify-center text-brand-secondary mb-4 shadow-2xs border border-brand-card/60">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-serif font-semibold text-brand-primary mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-muted font-sans font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-bg/90">
                {item.targetSlug ? (
                  <a
                    href={`/${item.targetSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardAction(item);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-brand-secondary hover:text-brand-primary group transition-colors cursor-pointer"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCardAction(item)}
                    className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-brand-secondary hover:text-brand-primary group transition-colors cursor-pointer"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
