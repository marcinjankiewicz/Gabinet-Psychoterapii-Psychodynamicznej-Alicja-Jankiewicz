/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'standards' | 'blog'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-charcoal overflow-x-hidden selection:bg-brand-accent selection:text-brand-secondary">
      {/* Dynamic Progress indicator or top visual bar */}
      <div className="h-1 w-full bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent" />

      {/* Primary Header */}
      <Header 
        onOpenBooking={() => handleOpenBooking(null)} 
        onNavigateHome={() => setCurrentView('home')}
        onNavigateToStandards={() => setCurrentView('standards')}
        onNavigateToBlog={() => setCurrentView('blog')}
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
            <OfferedServices onSelectService={(id) => handleOpenBooking(id)} />

            {/* Testimonial Quote Canvas */}
            <TestimonialQuote />

            {/* Section: Frequently Asked Questions (FAQ) with SEO schema */}
            <FAQ />

            {/* Section: Contact & Google Maps Directions Widget */}
            <ContactSection />
          </>
        ) : currentView === 'blog' ? (
          <BlogSection 
            onBackToHome={() => setCurrentView('home')}
            onOpenBooking={() => handleOpenBooking(null)}
          />
        ) : (
          <ChildProtectionStandards onBackToHome={() => setCurrentView('home')} />
        )}
      </main>

      {/* Primary Footer */}
      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onNavigateToStandards={() => setCurrentView('standards')}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateToBlog={() => setCurrentView('blog')}
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


