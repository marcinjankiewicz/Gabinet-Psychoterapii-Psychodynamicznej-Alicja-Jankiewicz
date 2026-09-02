import React from 'react';
import { motion } from 'motion/react';

export default function TestimonialQuote() {
  return (
    // POPRAWKA: Usunięto select-none z sekcji, aby umożliwić zaznaczanie tekstu pacjentom
    <section className="py-14 md:py-28 relative overflow-hidden bg-brand-bg">
      {/* Huge subtle quote decoration in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[230px] font-serif italic font-extrabold text-[#5d737e]/4 select-none pointer-events-none">
        &ldquo;&rdquo;
      </div>

      {/* POPRAWKA: Zamiana div na semantyczny element <figure> */}
      <figure className="max-w-[840px] mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
        {/* POPRAWKA: Zamiana motion.p na motion.blockquote pod kątem SEO */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-[22px] md:text-[24px] font-serif italic text-brand-primary font-medium leading-[1.6] tracking-tight text-center max-w-[760px]"
        >
          &bdquo;Drzwi można w jednej chwili z impetem otworzyć, a potem strzelić nimi i zamknąć z powrotem. Otwarcie egzystencjalne wymaga czasu i powolnego dojrzewania. Jest procesem. Narasta. Przygotowujemy się, przebudowujemy stopniowo, część po części, komórka po komórce, aż stajemy się gotowi do zrywu otwarcia. Czyn ostateczny poprzedzony jest długotrwałą pracą organiczną w miąższu bytowania.&rdquo;
        </motion.blockquote>
        
        {/* POPRAWKA: Zamiana motion.div na motion.figcaption dla idealnej struktury danych */}
        <motion.figcaption
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-2 w-full justify-center"
        >
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-[1px] w-12 bg-brand-accent rounded" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-brand-secondary">
              Jolanta Brach-Czaina
            </span>
            <div className="h-[1px] w-12 bg-brand-accent rounded" />
          </div>
          <span className="text-xs text-brand-muted italic font-serif mt-1">
            fragment książki „Szczeliny istnienia”
          </span>
        </motion.figcaption>
      </figure>
    </section>
  );
}
