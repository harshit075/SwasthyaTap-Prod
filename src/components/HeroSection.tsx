'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Wifi, Shield, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const Card3D = lazy(() => import('./Card3D'));

interface HeroSectionProps {
  onGetFreeCardClick?: () => void;
}

export default function HeroSection({ onGetFreeCardClick }: HeroSectionProps) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll-linked card transforms
  const yMobile = useTransform(scrollY, [0, 450], [0, 480]);
  const scaleMobile = useTransform(scrollY, [0, 450], [1, 0.5]);
  const rotateMobile = useTransform(scrollY, [0, 450], [0, -10]);
  const opacityMobile = useTransform(scrollY, [0, 400, 450, 460], [1, 1, 1, 0]);

  return (
    <section className="min-h-[70vh] lg:min-h-[90vh] pt-20 pb-8 flex items-center relative lg:overflow-hidden overflow-visible z-20" style={{ overflow: 'visible' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,57,70,0.03)_0%,transparent_50%)]" />

      {/* Container — 90% of viewport */}
      <div className="w-[90vw] max-w-[1600px] mx-auto relative z-10" style={{ overflow: 'visible' }}>

        {/* 2-column fluid grid: text | card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-center" style={{ overflow: 'visible' }}>

          {/* Col 1 — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/5 text-secondary text-sm font-medium px-4 py-2 rounded-full mb-5 border border-secondary/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              India&apos;s First NFC Health Identity Card
            </div>

            <h1 className="text-[clamp(1.8rem,2.8vw,3.5rem)] font-bold leading-[1.15]">
              <span className="font-hindi text-secondary block whitespace-nowrap">
                {t('hero.title1')}
              </span>
              <span className="font-hindi text-primary block mt-1 whitespace-nowrap">
                {t('hero.title2')}
              </span>
            </h1>

            <p className="mt-4 text-[clamp(0.85rem,1.1vw,1.05rem)] text-secondary/60 leading-relaxed max-w-md">
              {t('hero.subtitle')}
            </p>

            {/* Key differentiators */}
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-1.5 text-secondary/60">
                <Wifi size={13} className="text-success flex-shrink-0" /> No internet needed
              </span>
              <span className="flex items-center gap-1.5 text-secondary/60">
                <Shield size={13} className="text-success flex-shrink-0" /> PIN protected
              </span>
              <span className="flex items-center gap-1.5 text-secondary/60">
                <Clock size={13} className="text-success flex-shrink-0" /> Works in &lt;1 sec
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onGetFreeCardClick) {
                    onGetFreeCardClick();
                  } else {
                    window.location.href = '/register';
                  }
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer"
              >
                {t('hero.ctaPrimary')}
              </button>
              <a
                href="#how-it-works"
                className="border border-secondary/15 text-secondary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-secondary/5 transition-all"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>

          {/* Col 2 — NFC Card */}
          <div
            className="flex-1 w-full flex flex-col justify-center items-center relative select-none"
            style={{
              height: 'clamp(220px, min(38vw, 55vh), 560px)',
              overflow: 'visible'
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                y: isMobile ? yMobile : 0,
                scale: isMobile ? scaleMobile : 1,
                rotate: isMobile ? rotateMobile : 0,
                opacity: isMobile ? opacityMobile : 1,
                zIndex: isMobile ? 50 : undefined,
              }}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-56 h-36 bg-gradient-to-br from-[#0a3d50] to-[#0d5a6a] rounded-xl animate-pulse" />
                    </div>
                  }
                >
                  <Card3D />
                </Suspense>
              </div>
              <p className="text-center text-[11px] text-secondary/35 mt-3 tracking-wide">
                {t('hero.dragHint')}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
