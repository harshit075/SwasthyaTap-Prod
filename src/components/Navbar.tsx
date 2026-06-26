'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onGetFreeCardClick?: () => void;
}

export default function Navbar({ onGetFreeCardClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetFreeCard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGetFreeCardClick) {
      onGetFreeCardClick();
    } else {
      window.location.href = '/?register=true';
    }
  };

  const navLinks = [
    { href: '/#features', label: t('nav.features') },
    { href: '/#how-it-works', label: t('nav.howItWorks') },
    { href: '/#blood-network', label: t('nav.bloodNetwork') },
    { href: '/about', label: t('footer.about') },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <Activity size={18} className="text-white" />
            </span>
            <span className="text-xl font-bold text-secondary tracking-tight">{t('common.swasthyaTap')}</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-secondary/70 hover:text-primary transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <button
              onClick={handleGetFreeCard}
              className="bg-primary text-white px-5 py-2.5 rounded-btn font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20 cursor-pointer"
            >
              {t('nav.getFreeCard')}
            </button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-secondary/80 hover:text-primary font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={(e) => {
                  setOpen(false);
                  handleGetFreeCard(e);
                }}
                className="block w-full bg-primary text-white px-5 py-2.5 rounded-btn font-semibold text-center mt-2 cursor-pointer"
              >
                {t('nav.getFreeCard')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
