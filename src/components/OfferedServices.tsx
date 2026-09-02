import React from 'react';
import { MessageSquare, Heart, ShieldAlert, ArrowUpRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

interface OfferedServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const servicesData: Service[] = [
  {
    id: 'konsultacja',
    title: 'Konsultacja indywidualna',
    description: 'Podjęcie psychoterapii (zarówno osób dorosłych, jak i dzieci oraz młodzieży) poprzedza kilka spotkań konsultacyjnych. Mają one charakter zbadania zakresu problemu, wstępnej diagnozy i doboru odpowiednich form pomocy.',
    duration: '50 min',
    price: '200 zł',
    tags: ['Pierwsze spotkanie', 'Wywiad kliniczny', 'Kwalifikacja']
  },
  {
    id: 'kryzys',
    title: 'Wsparcie w kryzysie',
    description: 'Krótkoterminowe wsparcie ukierunkowane na powrót do równowagi psychicznej po doświadczeniu intensywnego kryzysu życiowego (np. żałoba, nagłe zmiany, wypadki, utrata pracy). Pomoc dedykowana dla dorosłych oraz młodzieży.',
    duration: '50 min',
    price: '200 zł',
    tags: ['Interwencja', 'Krótkoterminowe', 'Emocjonalne']
  },
  {
    id: 'psychoterapia',
    title: 'Psychoterapia indywidualna',
    description: 'Terapia psychodynamiczna skierowana do dorosłych, dzieci oraz młodzieży borykających się z poczuciem cierpienia w obszarach: trudności relacyjnych, zaburzeń nastroju i lękowych, zaburzeń osobowości czy kryzysów rówieśniczych.',
    duration: '50 min',
    price: '200 zł',
    tags: [
      'Dorośli',
      'Dzieci i młodzież',
      'Zaburzenia lękowe',
      'Zaburzenia nastroju',
      'Trudności w relacjach',
      'Wypalenie zawodowe',
      'Objawy psychosomatyczne',
      'Zaburzenia osobowości'
    ]
  },
  {
    id: 'grupowa',
    title: 'Psychoterapia grupowa',
    description: 'Terapia grupowa stwarza szansę na przyjrzenie się swoim relacjom z innymi oraz głębsze zrozumienie własnego sposobu funkcjonowania w grupie sprzyjającej refleksji i wzajemnej wymianie. Odbywa się w atmosferze bezpieczeństwa oraz pełnej dyskrecji.',
    duration: 'ustalany indywidualnie',
    price: 'ustalany indywidualnie',
    tags: ['Wsparcie grupy', 'Dynamika relacji', 'Trening interpersonalny', 'Rozwój osobisty']
  }
];

export default function OfferedServices({ onSelectService }: OfferedServicesProps) {
  return (
    <section id="oferta" className="pt-4 md:pt-8 pb-12 md:pb-24 max-w-[1140px] mx-auto px-6">
      
      {/* Header of the section */}
      <div className="text-center max-w-[720px] mx-auto mb-10 md:mb-16 flex flex-col items-center gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-serif font-semibold text-brand-primary"
        >
          Oferta i obszary wsparcia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-brand-muted font-sans font-light leading-relaxed text-base sm:text-lg mt-1"
        >
          Pomoc w formie leczenia i wsparcia, które odpowiada na subiektywne poczucie cierpienia w zakresie trudności w relacjach, zaburzeń nastroju i innych.
        </motion.p>
      </div>

      {/* Grid structure */}
      <div className="flex flex-col gap-8">
        
        {/* Top pair: Consultation and Crisis support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Konsultacja (Z PRZYCISKIEM REZERWACJI) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(93, 115, 126, 0.12)' }}
            className="bg-brand-card p-8 rounded-2xl flex flex-col justify-between border border-brand-card/30 shadow-soft-lift hover:border-brand-accent/40 transition-all duration-300"
          >
            <div>
              <div className="p-3 bg-brand-bg rounded-xl inline-block text-brand-primary mb-6 shadow-sm">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-primary mb-4">
                {servicesData[0].title}
              </h3>
              <p className="text-brand-muted font-sans font-light leading-relaxed mb-6 text-sm sm:text-base">
                {servicesData[0].description}
              </p>
            </div>
            
            <div className="pt-6 border-t border-brand-bg/80 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-serif uppercase tracking-wider text-brand-muted/70">Wymiar i Koszt</span>
                <span className="font-serif text-brand-primary text-base font-semibold mt-0.5">
                  {servicesData[0].duration} / {servicesData[0].price}
                </span>
              </div>
              <button
                onClick={() => onSelectService(servicesData[0].id)}
                className="flex items-center gap-1.5 font-serif text-brand-primary hover:text-brand-secondary text-sm font-semibold group transition-all"
              >
                Rezerwuj
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Wsparcie w kryzysie (BEZ PRZYCISKU) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(93, 115, 126, 0.15)' }}
            className="bg-brand-card/75 p-8 rounded-2xl flex flex-col justify-between border border-brand-primary/10 shadow-soft-lift hover:border-brand-accent/50 transition-all duration-300"
          >
            <div>
              <div className="p-3 bg-brand-bg rounded-xl inline-block text-brand-secondary mb-6 shadow-sm">
                <ShieldAlert size={20} />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-primary mb-4">
                {servicesData[1].title}
              </h3>
              <p className="text-brand-muted font-sans font-light leading-relaxed mb-6 text-sm sm:text-base">
                {servicesData[1].description}
              </p>
            </div>
            
            <div className="pt-6 border-t border-brand-bg/80 flex items-center">
              <div className="flex flex-col">
                <span className="text-xs font-serif uppercase tracking-wider text-brand-muted/70">Wymiar i Koszt</span>
                <span className="font-serif text-brand-primary text-base font-semibold mt-0.5">
                  {servicesData[1].duration} / {servicesData[1].price}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom card: Psychoterapia indywidualna (BEZ PRZYCISKU) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -2, boxShadow: '0 15px 35px -10px rgba(93, 115, 126, 0.08)' }}
          className="bg-brand-card p-8 sm:p-10 rounded-2xl border border-brand-card/30 shadow-soft-lift hover:border-brand-accent/40 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-6 justify-between h-full">
              <div>
                <div className="p-3 bg-brand-bg rounded-xl inline-block text-brand-primary mb-6 shadow-sm">
                  <Heart size={20} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary mb-4">
                  {servicesData[2].title}
                </h3>
                <p className="text-brand-muted font-sans font-light leading-relaxed mb-6 text-sm sm:text-base">
                  {servicesData[2].description}
                </p>
                
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {servicesData[2].tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-brand-secondary bg-brand-accent/35 border border-brand-accent/50 filter backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-brand-bg/80 flex items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-serif uppercase tracking-wider text-brand-muted/70">Wymiar i Koszt</span>
                  <span className="font-serif text-brand-primary text-base font-semibold mt-0.5">
                    {servicesData[2].duration} / {servicesData[2].price}
                  </span>
                </div>
              </div>
            </div>

            {/* Image section */}
            <div className="lg:col-span-5 h-[230px] sm:h-[300px] w-full rounded-2xl overflow-hidden shadow-sm relative bg-brand-bg mt-4 lg:mt-0">
               <img
                src="/Gabinet_Psychoterapia Indywidualna.webp"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.indexOf('gabinet_indywidualna.webp') !== -1) {
                    target.src = '/gabinet-indywidualna.webp';
                  } else if (target.src.indexOf('gabinet-indywidualna.webp') !== -1) {
                    target.src = '/Gabinet_Psychoterapia Indywidualna.webp';
                  } else if (target.src.indexOf('unsplash.com') === -1) {
                    target.src = 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800';
                  }
                }}
                alt="Widok przez otwarte drewniane drzwi do przytulnego, jasnego gabinetu psychoterapeutycznego z szarą sofą, poduszkami w kwiaty, rośliną w donicy i stolikiem"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-multiply pointer-events-none" />
            </div>

          </div>
        </motion.div>

        {/* Bottom card 2: Psychoterapia grupowa (BEZ PRZYCISKU) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -2, boxShadow: '0 15px 35px -10px rgba(93, 115, 126, 0.08)' }}
          className="bg-brand-card p-8 sm:p-10 rounded-2xl border border-brand-card/30 shadow-soft-lift hover:border-brand-accent/40 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 h-[230px] sm:h-[300px] w-full rounded-2xl overflow-hidden shadow-sm relative bg-brand-bg order-2 lg:order-1 mt-4 lg:mt-0">
              <img
                src="/PsychGrupowa.webp"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.indexOf('PsychGrupowa.webp') !== -1) {
                    target.src = '/psychgrupowa.webp';
                  } else if (target.src.indexOf('unsplash.com') === -1) {
                    target.src = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800';
                  }
                }}
                alt="Grupa psychoterapeutyczna siedząca w kręgu na krzesłach - symbol wsparcia, wspólnoty i bezpiecznej przestrzeni"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-multiply pointer-events-none" />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 justify-between h-full order-1 lg:order-2">
              <div>
                <div className="p-3 bg-brand-bg rounded-xl inline-block text-brand-primary mb-6 shadow-sm">
                  <Users size={20} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary mb-4">
                  {servicesData[3].title}
                </h3>
                <p className="text-brand-muted font-sans font-light leading-relaxed mb-6 text-sm sm:text-base">
                  {servicesData[3].description}
                </p>
                
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {servicesData[3].tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-brand-secondary bg-brand-accent/35 border border-brand-accent/50 filter backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-brand-bg/80 flex items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-serif uppercase tracking-wider text-brand-muted/70">Wymiar i Koszt</span>
                  <span className="font-serif text-brand-primary text-base font-semibold mt-0.5">
                    {servicesData[3].duration} / {servicesData[3].price}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
