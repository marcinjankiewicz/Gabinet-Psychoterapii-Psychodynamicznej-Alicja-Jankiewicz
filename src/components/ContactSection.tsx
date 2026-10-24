import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Navigation,
  Info,
  CheckCircle,
  ExternalLink,
  Clock,
  ShieldCheck,
  Copy
} from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from './OfferedServices';

interface ContactSectionProps {
  onOpenBooking?: (serviceId?: string | null) => void;
}

export default function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const [showDirections, setShowDirections] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const consultationService =
    servicesData.find((s) => s.id === 'konsultacja') || servicesData[0];

  const handleDirectBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // OPTYMALIZACJA GA4: Śledzenie konwersji (przejście do bezpośredniej rezerwacji Medfile z sekcji Kontakt)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        'event_category': 'Contact',
        'event_label': 'Direct Medfile Booking CTA'
      });
    }

    if (onOpenBooking) {
      onOpenBooking(consultationService?.id || 'konsultacja');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('psycholog.jankiewicz@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // Fallback ignored
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
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent/80">Kontakt i Rejestracja Online</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold leading-tight">
                Zrób pierwszy krok
              </h2>
              <p className="text-white/80 font-sans font-light leading-relaxed max-w-[480px] text-sm sm:text-base">
                Początek terapii to wyraz odwagi i troski o siebie. Zarezerwuj dogodny termin bezpośrednio przez certyfikowany kalendarz online <strong className="text-white font-medium">Medfile</strong> lub skontaktuj się telefonicznie.
              </p>
            </div>

            {/* Direct contact info chips */}
            <div className="flex flex-col gap-5">
              
              {/* Phone */}
              <a 
                href="tel:+48514309526"
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-brand-secondary/30 transition-all text-brand-accent">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/70">Zadzwoń lub napisz SMS</span>
                  <span itemProp="telephone" className="text-sm sm:text-base font-semibold border-b border-transparent group-hover:border-white/50 transition-all">
                    +48 514 309 526
                  </span>
                </div>
              </a>

              {/* E-mail with copy-only action (no mailto client trigger) */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-4 group cursor-pointer w-fit text-left"
                  title="Kliknij, aby skopiować adres e-mail"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-brand-secondary/30 transition-all text-brand-accent">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/70">Adres e-mail (kliknij, aby skopiować)</span>
                    <span itemProp="email" className="text-sm sm:text-base font-semibold border-b border-transparent group-hover:border-white/50 transition-all">
                      psycholog.jankiewicz@gmail.com
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 hover:bg-white/20 text-brand-accent px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer border border-white/10"
                  title="Skopiuj adres e-mail do schowka"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle size={12} />
                      <span>Skopiowano</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Kopiuj e-mail</span>
                    </>
                  )}
                </button>
              </div>

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

            <div className="text-[11px] text-white/50 font-light italic mt-4 max-w-[420px]">
              * W trakcie prowadzenia sesji nie odbieram telefonów. Najwygodniejszym sposobem umówienia wizyty jest bezpośrednia rezerwacja w kalendarzu Medfile lub wiadomość SMS.
            </div>
          </div>

          {/* Right column: Interactive Directions & Direct Medfile Booking Card */}
          <div className="lg:col-span-5 bg-brand-secondary p-8 sm:p-12 flex flex-col justify-center relative">
            
            {/* VIEW 1: DIRECT MEDFILE BOOKING & GENERAL INFO BOX */}
            <div className={`${!showDirections ? 'flex' : 'hidden'} flex-col gap-6`}>
              <div className="bg-brand-bg text-brand-charcoal p-6 rounded-2xl shadow-lg border border-brand-bg/50">
                <h3 className="text-lg font-serif font-semibold text-brand-primary flex items-center gap-2">
                  Gabinet Gdańsk – Jasień
                </h3>
                <p className="text-xs sm:text-sm font-light text-brand-muted leading-relaxed mt-1.5">
                  Dogodny dojazd z dzielnic: <strong className="text-brand-primary font-semibold">Gdańsk Jasień, Ujeścisko, Morena, Karczemki oraz z obwodnicy Trójmiasta (S6)</strong>.
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

              <div className="mt-1 border-t border-white/15 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-serif font-semibold text-brand-accent tracking-wide">
                    Bezpośrednia rezerwacja terminu (Medfile):
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={11} className="text-brand-accent" />
                    24/7 Online
                  </span>
                </div>
                <p className="text-xs text-white/80 font-light leading-relaxed mb-3.5">
                  Umów pierwsze spotkanie konsultacyjne bezpośrednio przez kalendarz online bez opuszczania strony:
                </p>

                <form onSubmit={handleDirectBooking} className="flex flex-col gap-3">
                  <div className="bg-white/15 border border-white/20 px-4 py-3 rounded-xl flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {consultationService?.title || 'Konsultacja indywidualna'}
                      </span>
                      <span className="text-xs font-bold text-brand-accent">
                        {consultationService?.price || '200 zł'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/85">
                      <Clock size={12} className="text-brand-accent" />
                      <span>
                        Czas trwania: <strong>{consultationService?.duration || '50 min'}</strong>
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/75 font-light leading-relaxed bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    Pozostałe opcje i formy wsparcia (psychoterapia indywidualna, pomoc w kryzysie, terapia grupowa) są dostępne po wcześniejszej rozmowie telefonicznej.
                  </p>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-brand-accent text-brand-secondary text-xs sm:text-sm font-bold py-3 px-4 rounded-xl hover:bg-brand-accent/90 transition-all cursor-pointer shadow-md"
                  >
                    <Calendar size={15} />
                    Wybierz dogodny termin wizyty
                  </motion.button>
                </form>
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
