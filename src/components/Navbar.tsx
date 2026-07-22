'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Activity, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { APP_DOWNLOAD_URL } from '@/constants/app';

interface NavbarProps {
  onGetFreeCardClick?: () => void;
}

const navBtnClass =
  'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-btn text-sm font-semibold whitespace-nowrap shrink-0 transition-colors';

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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4 lg:gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
            <span className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm shrink-0">
              <Activity size={18} className="text-white" />
            </span>
            <span className="text-lg lg:text-xl font-bold text-secondary tracking-tight whitespace-nowrap">
              {t('common.swasthyaTap')}
            </span>
          </a>

          {/* Center nav — desktop only */}
          <div className="hidden xl:flex items-center justify-center gap-6 min-w-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-secondary/70 hover:text-primary transition-colors font-medium text-sm whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-2 lg:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2 lg:gap-3">
              <LanguageSwitcher />
              <a
                href={APP_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${navBtnClass} bg-gradient-to-r from-success to-[#238b7e] text-white shadow-md shadow-success/25 hover:brightness-110`}
              >
                <Download size={15} className="shrink-0" />
                {t('hero.ctaDownloadApp')}
              </a>
              <button
                onClick={handleGetFreeCard}
                className={`${navBtnClass} bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer`}
              >
                {t('nav.getFreeCard')}
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Hamburger for lg–xl when center links are hidden */}
            <button
              onClick={() => setOpen(!open)}
              className="hidden lg:flex xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
            className="xl:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-secondary/80 hover:text-primary font-medium py-2.5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2 lg:hidden">
                <a
                  href={APP_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`${navBtnClass} w-full bg-gradient-to-r from-success to-[#238b7e] text-white shadow-md shadow-success/25`}
                >
                  <Download size={15} />
                  {t('hero.ctaDownloadApp')}
                </a>
                <button
                  onClick={(e) => {
                    setOpen(false);
                    handleGetFreeCard(e);
                  }}
                  className={`${navBtnClass} w-full bg-primary text-white cursor-pointer`}
                >
                  {t('nav.getFreeCard')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
