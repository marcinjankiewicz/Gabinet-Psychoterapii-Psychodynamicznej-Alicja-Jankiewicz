import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { ServiceRouteSlug } from './ServiceLandingPage';

interface FooterProps {
  onOpenPrivacy: () => void;
  onNavigateToStandards?: () => void;
  onNavigateHome?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToService?: (slug: ServiceRouteSlug) => void;
}

export default function Footer({
  onOpenPrivacy,
  onNavigateToStandards,
  onNavigateHome,
  onNavigateToBlog,
  onNavigateToService
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleHomeLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/');
    }
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = hash;
      }
    }, 80);
  };

  const handleServiceLink = (e: React.MouseEvent<HTMLAnchorElement>, slug: ServiceRouteSlug) => {
    e.preventDefault();
    if (onNavigateToService) {
      onNavigateToService(slug);
    } else {
      navigate(`/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBlogNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigateToBlog) {
      onNavigateToBlog();
    } else {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStandardsNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigateToStandards) {
      onNavigateToStandards();
    } else {
      navigate('/standardy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-card/25 border-t border-brand-card py-12 md:py-14 text-brand-charcoal">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Bio & NAP segment column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <span className="text-xl font-serif font-semibold tracking-tight text-brand-primary">
            Alicja Jankiewicz
          </span>
          <p className="text-brand-muted font-sans font-light text-sm max-w-[360px] leading-relaxed">
            Gabinet Psychoterapii Psychodynamicznej Gdańsk – Alicja Jankiewicz.<br />
            Profesjonalne wsparcie psychologiczne oraz psychoterapia indywidualna dorosłych, dzieci i młodzieży w Gdańsku.
          </p>
          <address className="not-italic text-xs text-brand-muted font-sans leading-relaxed space-y-1 pt-1 border-t border-brand-card/80 max-w-[360px]">
            <p className="font-medium text-brand-primary">
              ul. Kartuska 356a, 80-125 Gdańsk (Gdańsk Jasień)
            </p>
            <p>
              Tel.:{' '}
              <a href="tel:+48514309526" className="hover:text-brand-primary font-medium transition-colors">
                +48 514 309 526
              </a>{' '}
              &bull; E-mail: psycholog.jankiewicz@gmail.com
            </p>
            <p>Godziny przyjęć: Poniedziałek – Piątek, 08:00–20:00</p>
            <p className="text-brand-secondary/90 pt-0.5">
              Obszar działania: Gdańsk (Jasień, Morena, Piecki-Migowo, Wrzeszcz, Oliwa), Sopot, Gdynia.
            </p>
          </address>
        </div>

        {/* Dedicated SEO Services Column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
            Obszary pomocy
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a
                href="/psychoterapia-indywidualna-gdansk"
                onClick={(e) => handleServiceLink(e, 'psychoterapia-indywidualna-gdansk')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Psychoterapia indywidualna Gdańsk
              </a>
            </li>
            <li>
              <a
                href="/psycholog-dzieciecy-gdansk"
                onClick={(e) => handleServiceLink(e, 'psycholog-dzieciecy-gdansk')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Psycholog dziecięcy Gdańsk
              </a>
            </li>
            <li>
              <a
                href="/pomoc-w-kryzysie-gdansk"
                onClick={(e) => handleServiceLink(e, 'pomoc-w-kryzysie-gdansk')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Pomoc w kryzysie Gdańsk
              </a>
            </li>
            <li>
              <a
                href="/#oferta"
                onClick={(e) => handleHomeLink(e, '#oferta')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Oferta i Cennik
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
            Nawigacja
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a 
                href="/#home" 
                onClick={(e) => handleHomeLink(e, '#home')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Start
              </a>
            </li>
            <li>
              <a 
                href="/#o-mnie" 
                onClick={(e) => handleHomeLink(e, '#o-mnie')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                O mnie
              </a>
            </li>
            <li>
              <a 
                href="/#faq" 
                onClick={(e) => handleHomeLink(e, '#faq')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="/#kontakt" 
                onClick={(e) => handleHomeLink(e, '#kontakt')}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors cursor-pointer"
              >
                Kontakt i Dojazd
              </a>
            </li>
            <li>
              <a
                href="/blog"
                onClick={handleBlogNav}
                className="text-brand-muted hover:text-brand-primary font-medium transition-colors flex items-center cursor-pointer text-left"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/standardy"
                onClick={handleStandardsNav}
                className="text-brand-secondary hover:text-brand-primary font-semibold transition-colors flex items-center gap-1 cursor-pointer text-left"
              >
                <ShieldCheck size={14} />
                Ochrona Dzieci
              </a>
            </li>
          </ul>
        </div>

        {/* Important profile and patient links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">
            Zaufane portale i Social
          </h2>
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
      <div className="max-w-[1140px] mx-auto px-6 mt-10 pt-6 border-t border-brand-card/75 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-brand-muted/65">
        <div>
          &copy; {currentYear} Alicja Jankiewicz &bull; Gabinet psychoterapii psychodynamicznej Gdańsk
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end">
          <a
            href="/standardy"
            onClick={handleStandardsNav}
            className="hover:text-brand-primary transition-colors cursor-pointer text-brand-secondary font-semibold"
          >
            Standardy Ochrony Małoletnich (SOM)
          </a>
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
