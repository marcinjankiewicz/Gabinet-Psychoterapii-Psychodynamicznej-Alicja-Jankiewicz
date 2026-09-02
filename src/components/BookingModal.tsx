import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ExternalLink, 
  Lock,
  Clock,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';
import { servicesData } from './OfferedServices';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId: string | null;
}

const BOOKING_CALENDAR_URL = "https://rejestracja.medfile.pl/register/user/uuid/b107d945-06c3-2051-c3cf-baee3378f612/facility/b070b416-eaf1-0127-5e5c-c4a513e4d213/type/non_remote";

export default function BookingModal({ isOpen, onClose, preSelectedServiceId }: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  // Ustalenie kontekstu wybranej usługi
  useEffect(() => {
    if (isOpen) {
      setIsIframeLoading(true);
      if (preSelectedServiceId) {
        const s = servicesData.find(service => service.id === preSelectedServiceId);
        setSelectedService(s || null);
      } else {
        setSelectedService(null);
      }
    }
  }, [preSelectedServiceId, isOpen]);

  // Obsługa klawisza Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          
          {/* Tło przyciemniające */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1b1c1c]/60 backdrop-blur-sm"
          />

          {/* Kontener Modala - jedno, spójne okno bez zagnieżdżonych ramek i podwójnego przewijania */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="bg-white relative w-full max-w-[1040px] h-[94vh] sm:h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-brand-card/70 z-10 font-sans flex flex-col"
          >
            {/* Kompaktowy nagłówek z kluczowymi informacjami i akcjami */}
            <div className="border-b border-brand-card/60 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 bg-brand-bg/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-brand-secondary/15 text-brand-secondary rounded-xl shrink-0 hidden sm:flex">
                  <CalendarIcon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 id="booking-modal-title" className="text-base sm:text-lg font-serif font-bold text-brand-primary truncate">
                      Rezerwacja terminu wizyty
                    </h3>
                    {selectedService && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] bg-brand-secondary/15 text-brand-primary border border-brand-secondary/30 px-2.5 py-0.5 rounded-full font-medium">
                        <Tag size={10} className="text-brand-secondary" />
                        <span className="truncate max-w-[180px] sm:max-w-[260px]">{selectedService.title}</span>
                        <span className="text-brand-muted">•</span>
                        <Clock size={10} className="text-brand-secondary" />
                        <span>{selectedService.duration}</span>
                        <span className="text-brand-muted">•</span>
                        <span className="font-semibold text-brand-secondary">{selectedService.price}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 truncate">
                    Gabinet Psychoterapii Alicja Jankiewicz &bull; Gdańsk oraz sesje online
                  </p>
                </div>
              </div>

              {/* Prawa strona nagłówka: SSL + Otwórz w nowym oknie + Zamknij */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3">
                <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 font-medium">
                  <Lock size={12} className="text-emerald-600" />
                  <span>Szyfrowane połączenie SSL</span>
                </div>

                <a
                  href={BOOKING_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] sm:text-xs text-brand-muted hover:text-brand-primary bg-brand-card/40 hover:bg-brand-card/70 rounded-lg transition-colors"
                  title="Otwórz terminarz w osobnej karcie"
                >
                  <span className="hidden sm:inline">Nowa karta</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-brand-card/60 rounded-lg text-brand-muted hover:text-brand-primary transition-all cursor-pointer"
                  aria-label="Zamknij okno"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Główny obszar terminarza - bezpośrednio na pełną wysokość, bez zbędnych zagnieżdżonych kart */}
            <div className="relative w-full flex-1 min-h-0 bg-white overflow-hidden">
              
              {/* Wskaźnik ładowania ramki */}
              {isIframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xs p-6 text-center">
                  <div className="w-8 h-8 border-3 border-brand-secondary/30 border-t-brand-secondary rounded-full animate-spin mb-3" />
                  <p className="text-sm font-medium text-brand-primary font-serif">Ładowanie terminarza...</p>
                  <p className="text-xs text-brand-muted mt-0.5">Pobieranie aktualnego kalendarza wizyt</p>
                </div>
              )}

              {/* Bezpośredni formularz rejestracji zajmujący całą przestrzeń */}
              <iframe 
                src={BOOKING_CALENDAR_URL}
                title="Kalendarz wyboru terminu i rezerwacji wizyty"
                className="w-full h-full border-0 block"
                allow="clipboard-write; payment"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>

            {/* Kompaktowy pasek dolny (Kontakt + RODO + Przycisk zamknięcia) */}
            <div className="border-t border-brand-card/60 px-4 sm:px-6 py-2.5 flex items-center justify-between bg-brand-bg/80 text-xs text-brand-muted shrink-0 gap-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px] sm:text-xs">
                <span className="text-brand-primary font-medium hidden md:inline">Potrzebujesz pomocy z rezerwacją?</span>
                <a
                  href="tel:+48514309526"
                  className="flex items-center gap-1 text-brand-primary hover:text-brand-secondary transition-colors font-medium"
                >
                  <Phone size={12} className="text-brand-secondary" />
                  514 309 526
                </a>
                <span className="text-brand-card/80 hidden sm:inline">•</span>
                <a
                  href="mailto:psycholog.jankiewicz@gmail.com"
                  className="hidden sm:flex items-center gap-1 text-brand-muted hover:text-brand-secondary transition-colors"
                >
                  <Mail size={12} className="text-brand-secondary" />
                  psycholog.jankiewicz@gmail.com
                </a>
                <span className="text-brand-card/80 hidden lg:inline">•</span>
                <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-brand-muted">
                  <ShieldCheck size={12} className="text-brand-secondary shrink-0" />
                  Dane chronione RODO
                </span>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-brand-primary text-white hover:bg-brand-secondary text-center text-xs font-medium rounded-full transition-all cursor-pointer shrink-0"
              >
                Zamknij
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}