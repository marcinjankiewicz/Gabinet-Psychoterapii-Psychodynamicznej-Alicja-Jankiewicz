import React from 'react';
import { Calendar, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="home" className="py-12 md:py-24 max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      {/* Text column */}
      <div className="md:col-span-7 flex flex-col items-start gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-brand-accent/40 text-brand-secondary border border-brand-accent/60"
        >
          Alicja Jankiewicz — Psychoterapia Psychodynamiczna Gdańsk
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-semibold text-brand-primary leading-[1.15] tracking-tight"
        >
          Odzyskaj spokój w <span className="italic font-light">bezpiecznej</span> przestrzeni.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-brand-muted text-lg sm:text-xl font-sans font-light leading-relaxed max-w-[540px]"
        >
          Wspieram w procesie zmiany, pomagając odnaleźć równowagę i zrozumienie własnych potrzeb. Zapraszam na profesjonalną psychoterapię indywidualną (dorosłych, dzieci i młodzieży) oraz grupową w Gdańsku (dzielnica Jasień, blisko Kokoszki, Ujeścisko-Łostowice oraz Piecki-Migowo).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenBooking}
            className="flex items-center justify-center gap-2 bg-brand-primary text-white font-serif px-7 py-3.5 rounded-xl text-base font-semibold shadow-soft-lift hover:bg-brand-primary/95 transition-all duration-200"
          >
            <Calendar size={18} />
            Umów wizytę
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#oferta"
            className="flex items-center justify-center gap-2 bg-brand-card hover:bg-brand-card/85 text-brand-primary font-medium px-7 py-3.5 rounded-xl text-base border border-brand-card/60 transition-all duration-200"
          >
            Poznaj moją ofertę
            <ArrowDown size={16} className="text-brand-primary/70 animate-bounce" />
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative typewriter image */}
      <div className="md:col-span-5 relative w-full flex justify-start md:justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md aspect-[4/5] md:aspect-square md:max-w-none rounded-2xl md:rounded-3xl overflow-hidden shadow-soft-lift bg-brand-card"
        >
          {/* Mobile Image (shown only on mobile phones) */}
          <img
            src="/gabinet_2.webp"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              const target = e.currentTarget;
              const attempts = ['/gabinet_2.webp', '/gabinet.webp'];
              const currentSrcAttr = target.getAttribute('data-attempt-index') || '0';
              const nextIndex = parseInt(currentSrcAttr, 10) + 1;
              if (nextIndex < attempts.length) {
                target.setAttribute('data-attempt-index', nextIndex.toString());
                target.src = attempts[nextIndex];
              } else {
                target.src = 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800';
              }
            }}
            alt="Przytulny, nowoczesny gabinet terapeutyczny Alicji Jankiewicz - bezpieczna przestrzeń do rozmów"
            className="block md:hidden w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />

          {/* Tablet & Desktop Image (hidden on mobile phones) */}
          <img
            src="/gabinet.webp"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              const target = e.currentTarget;
              const attempts = ['/gabinet.webp', '/gabinet_2.webp'];
              const currentSrcAttr = target.getAttribute('data-attempt-index') || '0';
              const nextIndex = parseInt(currentSrcAttr, 10) + 1;
              if (nextIndex < attempts.length) {
                target.setAttribute('data-attempt-index', nextIndex.toString());
                target.src = attempts[nextIndex];
              } else {
                target.src = 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800';
              }
            }}
            alt="Przytulny, nowoczesny gabinet terapeutyczny Alicji Jankiewicz - bezpieczna przestrzeń do rozmów"
            className="hidden md:block w-full h-full object-cover object-left lg:object-center hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-brand-primary/5 mix-blend-multiply pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
