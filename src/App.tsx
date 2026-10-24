/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import OfferedServices from './components/OfferedServices';
import TestimonialQuote from './components/TestimonialQuote';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import ChildProtectionStandards from './components/ChildProtectionStandards';
import BlogSection from './components/BlogSection';
import ServiceLandingPage, {
  ServiceRouteSlug,
  SERVICE_PAGES_DATA
} from './components/ServiceLandingPage';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export type AppView =
  | 'home'
  | 'standards'
  | 'blog'
  | ServiceRouteSlug;

function resolveViewFromLocation(pathname: string): AppView {
  const clean = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  if (clean === '/psychoterapia-indywidualna-gdansk') {
    return 'psychoterapia-indywidualna-gdansk';
  }
  if (clean === '/psycholog-dzieciecy-gdansk') {
    return 'psycholog-dzieciecy-gdansk';
  }
  if (clean === '/pomoc-w-kryzysie-gdansk') {
    return 'pomoc-w-kryzysie-gdansk';
  }
  if (clean === '/standardy' || clean === '/ochrona-dzieci') {
    return 'standards';
  }
  if (clean === '/blog') {
    return 'blog';
  }
  return 'home';
}

function updateDocumentMeta(view: AppView) {
  let title = 'Psychoterapia Psychodynamiczna Gdańsk | Alicja Jankiewicz';
  let description =
    'Gabinet psychoterapii w Gdańsku (Jasień / Zabornia). Psychoterapia psychodynamiczna i pomoc w kryzysie. Sprawdź wolne terminy i umów bezpieczną konsultację.';
  let canonical = 'https://www.gabinetpsychologagdansk.pl';

  if (
    view === 'psychoterapia-indywidualna-gdansk' ||
    view === 'psycholog-dzieciecy-gdansk' ||
    view === 'pomoc-w-kryzysie-gdansk'
  ) {
    const pageMeta = SERVICE_PAGES_DATA[view];
    title = pageMeta.metaTitle;
    description = pageMeta.metaDescription;
    canonical = pageMeta.canonicalUrl;
  } else if (view === 'standards') {
    title = 'Standardy Ochrony Małoletnich (SOM) – Gabinet Psychoterapii Gdańsk | Alicja Jankiewicz';
    description =
      'Standardy Ochrony Małoletnich (SOM) obowiązujące w Gabinecie Psychoterapii Psychodynamicznej Alicji Jankiewicz w Gdańsku przy ul. Kartuskiej 356a.';
    canonical = 'https://www.gabinetpsychologagdansk.pl/standardy';
  } else if (view === 'blog') {
    title = 'Artykuły i Baza Wiedzy – Psychoterapia Psychodynamiczna Gdańsk | Alicja Jankiewicz';
    description =
      'Artykuły o psychoterapii psychodynamicznej, zdrowiu psychicznym, wsparciu dzieci i młodzieży oraz radzeniu sobie z kryzysem emocjonalnym.';
    canonical = 'https://www.gabinetpsychologagdansk.pl/blog';
  }

  document.title = title;

  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) {
    descEl.setAttribute('content', description);
  }
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) {
    ogTitleEl.setAttribute('content', title);
  }
  const ogDescEl = document.querySelector('meta[property="og:description"]');
  if (ogDescEl) {
    ogDescEl.setAttribute('content', description);
  }
  const ogUrlEl = document.querySelector('meta[property="og:url"]');
  if (ogUrlEl) {
    ogUrlEl.setAttribute('content', canonical);
  }
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', canonical);
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() =>
    resolveViewFromLocation(window.location.pathname)
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigateToView = useCallback((nextView: AppView, pushHistory = true) => {
    setCurrentView(nextView);
    updateDocumentMeta(nextView);

    if (pushHistory) {
      let targetPath = '/';
      if (
        nextView === 'psychoterapia-indywidualna-gdansk' ||
        nextView === 'psycholog-dzieciecy-gdansk' ||
        nextView === 'pomoc-w-kryzysie-gdansk'
      ) {
        targetPath = `/${nextView}`;
      } else if (nextView === 'standards') {
        targetPath = '/standardy';
      } else if (nextView === 'blog') {
        targetPath = '/blog';
      }

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: nextView }, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    updateDocumentMeta(currentView);
  }, [currentView]);

  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveViewFromLocation(window.location.pathname);
      setCurrentView(resolved);
      updateDocumentMeta(resolved);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId: string | null = null) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreSelectedServiceId(null);
  };

  const isServiceView =
    currentView === 'psychoterapia-indywidualna-gdansk' ||
    currentView === 'psycholog-dzieciecy-gdansk' ||
    currentView === 'pomoc-w-kryzysie-gdansk';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-charcoal overflow-x-hidden selection:bg-brand-accent selection:text-brand-secondary">
      {/* Dynamic Progress indicator or top visual bar */}
      <div className="h-1 w-full bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent" />

      {/* Primary Header */}
      <Header
        onOpenBooking={() => handleOpenBooking(null)}
        onNavigateHome={() => navigateToView('home')}
        onNavigateToStandards={() => navigateToView('standards')}
        onNavigateToBlog={() => navigateToView('blog')}
        onNavigateToService={(slug) => navigateToView(slug)}
        currentView={currentView}
      />

      {/* Main Content Layout */}
      <main>
        {currentView === 'home' ? (
          <>
            {/* Hero Banner Grid */}
            <Hero onOpenBooking={() => handleOpenBooking(null)} />

            {/* Section: About Me and Bio */}
            <AboutMe />

            {/* Section: Offered Services & Rates */}
            <OfferedServices
              onSelectService={(id) => handleOpenBooking(id)}
              onNavigateToService={(slug) => navigateToView(slug)}
            />

            {/* Testimonial Quote Canvas */}
            <TestimonialQuote />

            {/* Section: Frequently Asked Questions (FAQ) with SEO schema */}
            <FAQ />

            {/* Section: Contact & Google Maps Directions Widget */}
            <ContactSection onOpenBooking={(serviceId) => handleOpenBooking(serviceId ?? null)} />
          </>
        ) : isServiceView ? (
          <>
            <ServiceLandingPage
              slug={currentView}
              onBackToHome={() => navigateToView('home')}
              onOpenBooking={(serviceId) => handleOpenBooking(serviceId ?? null)}
              onNavigateToService={(slug) => navigateToView(slug)}
              onNavigateToStandards={() => navigateToView('standards')}
            />
            <ContactSection onOpenBooking={(serviceId) => handleOpenBooking(serviceId ?? null)} />
          </>
        ) : currentView === 'blog' ? (
          <BlogSection
            onBackToHome={() => navigateToView('home')}
            onOpenBooking={() => handleOpenBooking(null)}
          />
        ) : (
          <ChildProtectionStandards onBackToHome={() => navigateToView('home')} />
        )}
      </main>

      {/* Primary Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onNavigateToStandards={() => navigateToView('standards')}
        onNavigateHome={() => navigateToView('home')}
        onNavigateToBlog={() => navigateToView('blog')}
        onNavigateToService={(slug) => navigateToView(slug)}
      />

      {/* Interactive STEP-by-STEP Custom Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preSelectedServiceId={preSelectedServiceId}
      />

      {/* RODO & Cookie Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Wróć do góry"
            className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-brand-primary text-white hover:bg-brand-secondary shadow-lg hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-brand-accent transition-all cursor-pointer flex items-center justify-center border border-white/10"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
