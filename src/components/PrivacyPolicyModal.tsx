import React, { useEffect } from 'react';
import { X, Shield, Eye, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sections = [
    {
      id: 'general',
      title: '1. Informacje ogólne',
      icon: <Shield size={18} className="text-brand-primary" />,
      content: (
        <div className="space-y-3">
          <p>
            Niniejsza Polityka prywatności i plików cookies określa zasady przetwarzania i ochrony danych osobowych
            użytkowników korzystających z serwisu internetowego Gabinetu Psychoterapii Psychodynamicznej Alicji Jankiewicz
            oraz zasady wykorzystywania plików "cookies".
          </p>
          <p>
            Właścicielem serwisu oraz Administratorem Danych Osobowych jest <strong>mgr Alicja Jankiewicz</strong>,
            prowadząca Gabinet Psychoterapii Psychodynamicznej w Gdańsku (ul. Kartuska 356A, 80-125 Gdańsk).
          </p>
          <p>
            Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których dane dotyczą,
            a w szczególności zapewnia, że zbierane dane są przetwarzane zgodnie z prawem, w szczególności z Rozporządzeniem
            Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) oraz polską ustawą o ochronie danych osobowych.
          </p>
        </div>
      ),
    },
    {
      id: 'data-processing',
      title: '2. Cel i zakres przetwarzania danych',
      icon: <Eye size={18} className="text-brand-primary" />,
      content: (
        <div className="space-y-3">
          <p>
            Dane osobowe gromadzone za pośrednictwem serwisu (takie jak imię, nazwisko, numer telefonu, adres e-mail) są przetwarzane wyłącznie w celach:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-brand-muted">
            <li><strong>Umożliwienia wstępnej rezerwacji konsultacji</strong> oraz kontaktu w sprawie ustalenia terminu wizyty,</li>
            <li><strong>Odpowiedzi na zapytania</strong> przesyłane za pomocą formularza kontaktowego lub bezpośredniego kontaktu e-mailowego/telefonicznego,</li>
            <li><strong>Dokonania niezbędnych uzgodnień przedterapeutycznych</strong>.</li>
          </ul>
          <p>
            Podanie danych ma charakter dobrowolny, jednak jest warunkiem niezbędnym do skorzystania z możliwości rezerwacji terminu online lub uzyskania odpowiedzi na zapytanie kontaktowe.
          </p>
          <p>
            Wszystkie dane osobowe przekazywane w ramach kontaktu oraz sesji terapeutycznych są objęte ścisłą <strong>tajemnicą zawodową psychologa i psychoterapeuty</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: '3. Pliki cookies (Ciasteczka)',
      icon: <Lock size={18} className="text-brand-primary" />,
      content: (
        <div className="space-y-3">
          <p>
            Serwis internetowy wykorzystuje pliki cookies (małe pliki tekstowe zapisywane na urządzeniu końcowym użytkownika) w celu optymalizacji korzystania ze strony internetowej. Serwis stosuje następujące rodzaje plików cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-brand-muted">
            <li><strong>Niezbędne pliki cookies:</strong> umożliwiają prawidłowe funkcjonowanie serwisu, nawigację oraz korzystanie z bezpiecznych obszarów (np. formularza rezerwacji). Bez tych plików strona nie może działać poprawnie.</li>
            <li><strong>Sesyjne (tymczasowe) cookies:</strong> przechowywane na urządzeniu użytkownika do momentu opuszczenia strony lub wyłączenia przeglądarki internetowej.</li>
            <li><strong>Funkcjonalne cookies:</strong> pozwalają zapamiętać wybrane przez użytkownika opcje i preferencje (np. dane wpisane w kalendarzu rezerwacji), zwiększając komfort użytkowania.</li>
          </ul>
          <p>
            Użytkownik ma możliwość samodzielnego zarządzenia plikami cookies. Występuje to poprzez zmianę ustawień swojej przeglądarki internetowej. Możliwe jest całkowite zablokowanie akceptacji plików cookies bądź włączenie powiadomień o każdorazowym ich przesłaniu. Szczegółowe informacje o sposobach wyłączenia cookies znajdują się w pomocy technicznej danej przeglądarki.
          </p>
        </div>
      ),
    },
    {
      id: 'rights',
      title: '4. Prawa Użytkownika',
      icon: <FileText size={18} className="text-brand-primary" />,
      content: (
        <div className="space-y-3">
          <p>Każdej osobie, której dane dotyczą, przysługuje prawo do:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {[
              'Dostępu do treści swoich danych osobowych oraz otrzymania ich kopii',
              'Sprostowania (poprawiania) swoich danych',
              'Usunięcia danych („prawo do bycia zapomnianym”)',
              'Ograniczenia przetwarzania danych osobowych',
              'Przenoszenia danych do innego administratora',
              'Wniesienia sprzeciwu wobec przetwarzania danych'
            ].map((right, index) => (
              <div key={index} className="flex gap-2 items-start text-xs p-2.5 rounded-lg bg-brand-bg border border-brand-card/50">
                <CheckCircle2 size={14} className="text-brand-secondary shrink-0 mt-0.5" />
                <span>{right}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs">
            W celu realizacji powyższych praw należy skontaktować się bezpośrednio z Administratorem pisząc na adres e-mail gabinetu. Osoba, której dane dotyczą, ma również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), jeżeli uzna, że przetwarzanie jej danych narusza przepisy prawa.
          </p>
        </div>
      ),
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-[760px] max-h-[85vh] bg-brand-bg rounded-3xl overflow-hidden shadow-2xl border border-brand-card/30 flex flex-col z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-brand-card/40 flex items-center justify-between bg-brand-bg sticky top-0 z-20">
              <div className="flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-brand-primary text-left">
                  Polityka prywatności & Cookies
                </h3>
                <span className="text-xs font-mono text-brand-muted mt-0.5 text-left">
                  Zgodność z RODO & Zasady plików cookies
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-brand-card text-brand-muted hover:text-brand-primary transition-all cursor-pointer"
                aria-label="Zamknij"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-brand-charcoal/90 text-left leading-relaxed">
              <div className="p-4 rounded-2xl bg-brand-card/30 border border-brand-card/45 text-xs text-brand-muted italic flex gap-3">
                <Shield size={20} className="text-brand-secondary shrink-0 mt-0.5" />
                <p>
                  Szanując Państwa prywatność oraz stosując się do wymogów prawnych, w tym ogólnego rozporządzenia o ochronie danych osobowych (RODO), poniżej przedstawiono szczegółowe zasady i cele przetwarzania danych w ramach tego serwisu. Wszelkie przekazane informacje chronione są tajemnicą zawodową.
                </p>
              </div>

              {sections.map((section) => (
                <div key={section.id} className="border-b border-brand-card/30 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    {section.icon}
                    <h4 className="font-serif text-sm font-semibold text-brand-primary">
                      {section.title}
                    </h4>
                  </div>
                  <div className="font-sans font-light text-brand-muted text-xs sm:text-sm pl-7 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer informational bar */}
            <div className="px-6 py-4 border-t border-brand-card/40 bg-brand-card/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
              <span>Wersja polityki: 1.1 / Czerwiec 2026</span>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary text-brand-bg font-serif font-medium rounded-full transition-all text-xs cursor-pointer"
              >
                Zapoznałem się i rozumiem
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
