import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onNavigateToStandards: () => void;
  onNavigateHome: () => void;
  onNavigateToBlog: () => void;
}

export default function Footer({ onOpenPrivacy, onNavigateToStandards, onNavigateHome, onNavigateToBlog }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleHomeLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    onNavigateHome();
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = hash;
      }
    }, 80);
  };

  return (
    <footer className="bg-brand-card/25 border-t border-brand-card py-16 text-brand-charcoal">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Bio segment column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <span className="text-xl font-serif font-semibold tracking-tight text-brand-primary">
            Alicja Jankiewicz
          </span>
          <p className="text-brand-muted font-sans font-light text-sm max-w-[340px] leading-relaxed">
            Gabinet psychoterapii psychodynamicznej.<br />
            Profesjonalne wsparcie psychologiczne oraz psychoterapia indywidualna dorosłych, dzieci i młodzieży w Gdańsku (dzielnica Jasień, blisko Kokoszki, Ujeścisko-Łostowice, Piecki-Migowo).
          </p>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
            Nawigacja
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a 
                href="#home" 
                onClick={(e) => handleHomeLink(e, '#home')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Start
              </a>
            </li>
            <li>
              <a 
                href="#o-mnie" 
                onClick={(e) => handleHomeLink(e, '#o-mnie')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                O mnie
              </a>
            </li>
            <li>
              <a 
                href="#oferta" 
                onClick={(e) => handleHomeLink(e, '#oferta')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Oferta i Cennik
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                onClick={(e) => handleHomeLink(e, '#faq')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Często Zadawane Pytania (FAQ)
              </a>
            </li>
            <li>
              <a 
                href="#kontakt" 
                onClick={(e) => handleHomeLink(e, '#kontakt')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Kontakt i Dojazd
              </a>
            </li>
            <li>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); onNavigateToBlog(); }}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors flex items-center cursor-pointer text-left"
              >
                Artykuły i Przemyślenia (Blog)
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); onNavigateToStandards(); }}
                className="text-brand-secondary hover:text-brand-primary font-semibold transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <ShieldCheck size={14} />
                Standardy Ochrony Dzieci
              </button>
            </li>
          </ul>
        </div>


        {/* Important profile and patient links */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
            Zaufane portale i Social
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a 
                href="https://twojpsycholog.pl/profil-psychologa/alicja-jankiewicz-6630" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-muted hover:text-brand-primary font-medium flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                Profil na TwójPsycholog.pl
                <ExternalLink size={13} className="text-brand-muted/50 group-hover:text-brand-primary transition-colors" />
              </a>
            </li>
            <li>
              <a 
                href="https://www.ptppd.pl/czlonkowie-ptppd.html" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-muted hover:text-brand-primary font-medium flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                Członek PTPPd
                <ExternalLink size={13} className="text-brand-muted/50 group-hover:text-brand-primary transition-colors" />
              </a>
            </li>
            <li>
              <div className="text-xs text-brand-muted/70 font-light mt-2 leading-relaxed">
                Superwizja: praca podlega stałej superwizji u certyfikowanych superwizorów Polskiego Towarzystwa Psychologicznego.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub-footer bottom bar */}
      <div className="max-w-[1140px] mx-auto px-6 mt-12 pt-8 border-t border-brand-card/75 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-brand-muted/65">
        <div>
          &copy; {currentYear} Alicja Jankiewicz &bull; Gabinet psychoterapii psychodynamicznej Gdańsk
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToStandards();
            }}
            className="hover:text-brand-primary transition-colors cursor-pointer text-brand-secondary font-semibold"
          >
            Standardy Ochrony Małoletnich (SOM)
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenPrivacy();
            }}
            className="hover:text-brand-primary transition-colors cursor-pointer"
          >
            Polityka prywatności & Cookies
          </button>
          <span>Gdańsk, Pomorskie</span>
        </div>
      </div>
    </footer>
  );
}
