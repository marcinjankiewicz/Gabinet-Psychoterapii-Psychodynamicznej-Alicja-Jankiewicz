import React, { useState } from 'react';
import { Menu, X, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  onNavigateToStandards: () => void;
  onNavigateToBlog: () => void;
  currentView: 'home' | 'standards' | 'blog';
}

export default function Header({ onOpenBooking, onNavigateHome, onNavigateToStandards, onNavigateToBlog, currentView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Start', href: '#home', type: 'section' },
    { name: 'O mnie', href: '#o-mnie', type: 'section' },
    { name: 'Oferta', href: '#oferta', type: 'section' },
    { name: 'FAQ', href: '#faq', type: 'section' },
    { name: 'Blog', href: '#blog', type: 'blog' },
    { name: 'Kontakt', href: '#kontakt', type: 'section' },
    { name: 'Ochrona Dzieci', href: '#ochrona-dzieci', type: 'standards' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.type === 'standards') {
      e.preventDefault();
      onNavigateToStandards();
      setIsOpen(false);
    } else if (link.type === 'blog') {
      e.preventDefault();
      onNavigateToBlog();
      setIsOpen(false);
    } else {
      if (currentView !== 'home') {
        e.preventDefault();
        onNavigateHome();
        // Allow state rendering to complete and then scroll to hash if present
        const hash = link.href;
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = hash;
          }
        }, 80);
      }
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigateHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = '#home';
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-card/50 transition-all duration-300">
      <div className="max-w-[1140px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#home" 
          onClick={handleLogoClick}
          className="text-xl font-serif font-semibold tracking-tight text-brand-primary cursor-pointer"
        >
          Alicja Jankiewicz
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`font-semibold text-xs tracking-wide uppercase transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                (link.type === 'standards' && currentView === 'standards') || (link.type === 'blog' && currentView === 'blog')
                  ? 'text-brand-secondary font-bold underline underline-offset-4'
                  : link.type === 'standards' || link.type === 'blog'
                  ? 'text-brand-secondary hover:text-brand-primary'
                  : 'text-brand-muted hover:text-brand-primary'
              }`}
            >
              {link.type === 'standards' && <ShieldCheck size={13} />}
              {link.name}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-brand-primary text-white font-serif px-5 py-2.5 rounded-lg text-sm font-medium shadow-soft-lift hover:bg-brand-primary/95 transition-all duration-200 cursor-pointer"
          >
            <Calendar size={15} />
            Umów wizytę
          </motion.button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-primary hover:bg-brand-card/55 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-brand-bg border-b border-brand-card overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`py-2 font-medium text-base transition-colors cursor-pointer flex items-center gap-1.5 ${
                    (link.type === 'standards' && currentView === 'standards') || (link.type === 'blog' && currentView === 'blog')
                      ? 'text-brand-secondary font-bold underline underline-offset-4'
                      : link.type === 'standards' || link.type === 'blog'
                      ? 'text-brand-secondary'
                      : 'text-brand-muted hover:text-brand-primary'
                  }`}
                >
                  {link.type === 'standards' && <ShieldCheck size={16} />}
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-serif py-3 rounded-lg text-base font-medium shadow-soft-lift mt-2 cursor-pointer"
              >
                <Calendar size={18} />
                Umów wizytę
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

