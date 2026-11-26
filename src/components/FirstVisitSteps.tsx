import React from 'react';
import { Calendar, MessageCircleHeart, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface FirstVisitStepsProps {
  onOpenBooking: () => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Bez przygotowania i bez presji',
    description:
      'Na pierwszą wizytę nie trzeba się specjalnie przygotowywać ani układać planu wypowiedzi. Jeśli nie wiesz, od czego zacząć, spokojnie poprowadzę rozmowę pomocniczymi pytaniami.',
    icon: MessageCircleHeart,
  },
  {
    number: '02',
    title: 'Pełna dyskrecja i tajemnica zawodowa',
    description:
      'Rozmowa odbywa się w kameralnym, wyciszonym gabinecie przy ul. Kartuskiej 356a w Gdańsku Jasieniu. Wszystko, czym się dzielisz, objęte jest bezwzględną tajemnicą zawodową.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Spokojne omówienie trudności',
    description:
      'Pierwsze 3–5 spotkań ma charakter konsultacji wstępnych. Pozwalają one lepiej zrozumieć Twoją sytuację, historię oraz potrzeby bez pośpiechu i oceniania.',
    icon: Compass,
  },
  {
    number: '04',
    title: 'Wspólny wybór najlepszej formy pomocy',
    description:
      'Konsultacje nie zobowiązują do podjęcia terapii. Na ich zakończenie wspólnie omawiamy wnioski i decydujemy o dalszych krokach — psychoterapii indywidualnej, wsparciu w kryzysie lub innej formie pomocy.',
    icon: Calendar,
  },
];

export default function FirstVisitSteps({ onOpenBooking }: FirstVisitStepsProps) {
  return (
    <section
      id="pierwsza-wizyta"
      className="py-10 md:py-12 lg:py-14 bg-brand-card/35 border-y border-brand-card/60 scroll-mt-20"
    >
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center max-w-[720px] mx-auto mb-8 md:mb-10 flex flex-col items-center gap-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase bg-brand-accent/35 text-brand-secondary border border-brand-accent/50">
            Krok po kroku
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-primary tracking-tight">
            Jak wygląda pierwsza wizyta?
          </h2>
          <p className="text-brand-muted font-sans font-light leading-relaxed text-base sm:text-lg">
            Decyzja o pierwszym spotkaniu z psychoterapeutą bywa trudna i wiąże się z naturalnym stresem. Poniżej w kilku prostych krokach opisuję, czego możesz się spodziewać w gabinecie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-brand-bg p-6 sm:p-7 rounded-2xl border border-brand-card/80 shadow-soft-lift flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-brand-secondary bg-brand-accent/35 px-2.5 py-1 rounded-lg">
                    Krok {step.number}
                  </span>
                  <div className="p-2 rounded-xl bg-brand-card text-brand-primary">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-lg text-brand-primary leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-muted font-sans font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white font-serif px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold shadow-soft-lift transition-all cursor-pointer"
          >
            <Calendar size={17} />
            Umów pierwszą konsultację (50 min / 200 zł)
          </button>
          <span className="text-xs sm:text-sm text-brand-muted font-light">
            Gabinet czynny pn–pt w godz. 08:00–20:00 • ul. Kartuska 356a, Gdańsk Jasień
          </span>
        </div>
      </div>
    </section>
  );
}
