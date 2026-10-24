/**
 * @license
 * @spdx-license-identifier Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import BlogPostDetail from './components/BlogPostDetail'; // Dedykowany widok wpisu
import ServiceLandingPage, { ServiceRouteSlug } from './components/ServiceLandingPage';

export type AppView =
  | 'home'
  | 'standards'
  | 'blog'
  | ServiceRouteSlug;

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-bg text-brand-charcoal selection:bg-brand-accent/40 selection:text-brand-primary">
        <Header onOpenBooking={() => setIsBookingOpen(true)} />

        <main>
          <Routes>
            {/* Strona Główna */}
            <Route path="/" element={
              <>
                <Hero onOpenBooking={() => setIsBookingOpen(true)} />
                <AboutMe />
                <OfferedServices onSelectService={() => setIsBookingOpen(true)} />
                <TestimonialQuote />
                <FAQ />
                <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
              </>
            } />

            {/* Dedykowane strony usług SEO */}
            <Route path="/psychoterapia-indywidualna-gdansk" element={
              <>
                <ServiceLandingPage
                  slug="psychoterapia-indywidualna-gdansk"
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
                <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
              </>
            } />
            <Route path="/psycholog-dzieciecy-gdansk" element={
              <>
                <ServiceLandingPage
                  slug="psycholog-dzieciecy-gdansk"
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
                <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
              </>
            } />
            <Route path="/pomoc-w-kryzysie-gdansk" element={
              <>
                <ServiceLandingPage
                  slug="pomoc-w-kryzysie-gdansk"
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
                <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
              </>
            } />

            {/* Standardy Ochrony Małoletnich */}
            <Route path="/standardy" element={<ChildProtectionStandards />} />

            {/* Blog - Lista artykułów */}
            <Route path="/blog" element={
              <BlogSection onOpenBooking={() => setIsBookingOpen(true)} />
            } />

            {/* Blog - Pojedynczy artykuł (SEO-friendly URL) */}
            <Route path="/blog/:slug" element={
              <BlogPostDetail onOpenBooking={() => setIsBookingOpen(true)} />
            } />

            {/* Przekierowanie nieznanych ścieżek na stronę główną */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
        <PrivacyPolicyModal 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}

