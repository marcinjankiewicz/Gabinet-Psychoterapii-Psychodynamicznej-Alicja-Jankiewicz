import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Navigation, Info, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`Wiadomość ze strony gabinetu od: ${formData.name}`);
      const body = encodeURIComponent(
        `Wiadomość wysłana przez: ${formData.name}\n` +
        `Adres e-mail nadawcy: ${formData.email}\n\n` +
        `Treść wiadomości:\n${formData.message}`
      );
      
      // OPTYMALIZACJA GA4: Śledzenie konwersji (wysłanie formularza kontaktowego)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          'event_category': 'Contact',
          'event_label': 'Contact Form'
        });
      }
      
      window.location.href = `mailto:psycholog.jankiewicz@gmail.com?subject=${subject}&body=${body}`;

      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    // OPTYMALIZACJA SEO: Dodanie głównego kontenera Schema.org dla biznesu lokalnego
    <section 
      id="kontakt" 
      className="py-10 md:py-20 max-w-[1140px] mx-auto px-6"
      itemScope 
      itemType="https://schema.org/MedicalBusiness"
    >
      {/* Ukryte znaczniki Schema dla bota Google */}
      <meta itemProp="name" content="Alicja Jankiewicz — Psychoterapia Psychodynamiczna Gdańsk" />
      <meta itemProp="image" content="https://www.gabinetpsychologagdansk.pl/alicjajankiewicz1.webp" />
      
      <div className="bg-brand-primary text-white rounded-3xl overflow-hidden shadow-2xl border border-brand-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left info column: Contact links and details */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent/80">Kontakt</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold leading-tight">
                Zrób pierwszy krok
              </h2>
              <p className="text-white/80 font-sans font-light leading-relaxed max-w-[480px] text-sm sm:text-base">
                Początek terapii to wyraz odwagi i troski o siebie. Napisz lub zadzwoń bezpośrednio, by umówić się na pierwszą konsultację. Możesz także skorzystać z dostępnego formularza.
              </p>
            </div>

            {/* Direct contact info chips */}
            <div className="flex flex-col gap-5">
              
              {/* E-mail */}
              <a 
                href="mailto:psycholog.jankiewicz@gmail.com"
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-brand-secondary/30 transition-all text-brand-accent">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/70">Napisz do mnie</span>
                  <span itemProp="email" className="text-sm sm:text-base font-semibold border-b border-transparent group-hover:border-white/50 transition-all">
                    psycholog.jankiewicz@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+48514309526"
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-brand-secondary/30 transition-all text-brand-accent">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/70">Zadzwoń</span>
                  <span itemProp="telephone" className="text-sm sm:text-base font-semibold border-b border-transparent group-hover:border-white/50 transition-all">
                    +48 514 309 526
                  </span>
                </div>
              </a>

              {/* Address */}
              <a 
                href="https://maps.app.goo.gl/oGZwrNsrZKj6jPQQ9" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 group cursor-pointer w-fit"
                itemProp="address" 
                itemScope 
                itemType="https://schema.org/PostalAddress"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-brand-secondary/30 transition-all text-brand-accent">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/70">Gabinet</span>
                  <span itemProp="streetAddress" className="text-sm sm:text-base font-semibold border-b border-transparent group-hover:border-white/50 transition-all">
                    ul. Kartuska 356a, <span itemProp="postalCode">80-125</span> <span itemProp="addressLocality">Gdańsk</span>
                  </span>
                </div>
              </a>

            </div>

            <div className="text-[11px] text-white/50 font-light italic mt-4 max-w-[400px]">
              * W trakcie prowadzenia sesji nie odbieram telefonów. Zostaw wiadomość SMS lub napisz e-mail – oddzwonię najszybciej, jak to możliwe.
            </div>
          </div>

          {/* Right column: Interactive Directions & Mini-contact-form Card */}
          <div className="lg:col-span-5 bg-brand-secondary p-8 sm:p-12 flex flex-col justify-center relative">
            
            {/* VIEW 1: FORM & GENERAL INFO BOX */}
            <div className={`${!showDirections ? 'flex' : 'hidden'} flex-col gap-6`}>
              <div className="bg-brand-bg text-brand-charcoal p-6 rounded-2xl shadow-lg border border-brand-bg/50">
                <h3 className="text-lg font-serif font-semibold text-brand-primary flex items-center gap-2">
                  Gabinet Gdańsk – Jasień
                </h3>
                <p className="text-xs sm:text-sm font-light text-brand-muted leading-relaxed mt-1.5">
                  Lokalizacja na gdańskim <strong className="text-brand-primary font-semibold">Jasieniu</strong> (przy ul. Kartuskiej) zapewnia komfortowy dojazd zarówno z bliskich dzielnic: <strong className="text-brand-primary font-semibold">Kokoszki</strong>, <strong className="text-brand-primary font-semibold">Ujeścisko-Łostowice</strong>, jak i <strong className="text-brand-primary font-semibold">Piecki-Migowo (Morena)</strong>.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDirections(true)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white font-serif py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-soft-lift transition-all cursor-pointer"
                >
                  <Navigation size={14} />
                  Prowadź do celu / Dojazd
                </motion.button>
              </div>

              <div className="mt-2 border-t border-white/10 pt-5">
                <h4 className="text-sm font-serif font-semibold text-brand-accent tracking-wide mb-3">
                  Szybki kontakt e-mail:
                </h4>
                
                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 p-4 rounded-xl flex items-center gap-3 text-brand-accent text-sm font-medium border border-white/10"
                  >
                    <CheckCircle size={18} className="text-brand-accent shrink-0" />
                    Wiadomość została wysłana! Odpowiem wkrótce.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* OPTYMALIZACJA Accessibility: aria-label */}
                      <input
                        type="text"
                        required
                        aria-label="Twoje imię"
                        placeholder="Imię"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/10 border border-white/10 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-white/30 text-white transition-all font-medium"
                      />
                      <input
                        type="email"
                        required
                        aria-label="Twój adres e-mail"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/10 border border-white/10 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-white/30 text-white transition-all font-medium"
                      />
                    </div>
                    <textarea
                      placeholder="Treść Twojej wiadomości..."
                      required
                      aria-label="Treść wiadomości kontaktowej"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/10 border border-white/10 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-white/30 text-white transition-all resize-none font-light"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1.5 bg-brand-accent text-brand-secondary text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-brand-accent/90 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Wyślij wiadomość <Send size={12} />
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* VIEW 2: DETAILED DIRECTIONS */}
            <div className={`${showDirections ? 'flex' : 'hidden'} flex-col gap-5 bg-brand-bg text-brand-charcoal p-6 sm:p-8 rounded-3xl shadow-xl border border-brand-card/40`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-semibold text-brand-primary flex items-center gap-2">
                  Dojazd do gabinetu (Gdańsk Jasień)
                </h3>
                <button
                  onClick={() => setShowDirections(false)}
                  className="text-xs text-brand-secondary hover:text-brand-primary underline transition-all font-semibold cursor-pointer"
                >
                  Powrót
                </button>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Gabinet mieści się przy ul. Kartuskiej 356a na gdańskim <strong className="text-brand-secondary font-semibold">Jasieniu</strong>. Dzięki doskonałemu położeniu dojazd z sąsiednich dzielnic: <strong className="text-brand-primary font-semibold">Kokoszki, Ujeścisko-Łostowice oraz Piecki-Migowo</strong> jest wyjątkowo sprawny i bezproblemowy.
              </p>
              
              <div className="bg-brand-card rounded-2xl p-4 border border-brand-card/60 flex flex-col gap-3.5">
                <div>
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider flex items-center gap-1">
                    <Info size={12} /> Komunikacja miejska:
                  </span>
                  <p className="text-xs font-light text-brand-muted mt-1 leading-relaxed">
                    Tramwaj (przystanek <strong>Zabornia</strong>) lub autobus (przystanek <strong>Damroki</strong>).
                  </p>
                </div>

                <div className="border-t border-brand-card/75 pt-3">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">
                    Dla zmotoryzowanych:
                  </span>
                  <p className="text-xs font-light text-brand-muted mt-1 leading-relaxed">
                    Zmotoryzowani pacjenci mają do dyspozycji <strong>darmowe, ogólnodostępne miejsca parkingowe</strong> bezpośrednio przed samym wejściem do budynku gabinetu.
                  </p>
                </div>

                <div className="border-t border-brand-card/75 pt-3">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">
                    Lokalizacja w budynku:
                  </span>
                  <p className="text-xs font-light text-brand-muted mt-1 leading-relaxed">
                    Lokal znajduje się na pierwszym piętrze budynku.
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/oGZwrNsrZKj6jPQQ9"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white font-serif py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-soft-lift transition-all"
              >
                Otwórz nawigację Google Maps
                <ExternalLink size={14} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
