'use client';
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Smartphone,
  User,
  MessageSquare,
  Hospital,
  Activity,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  Bell,
  type LucideIcon,
  Wifi,
  Clock
} from 'lucide-react';
import SatelliteMapImage from '@/assests/satellite_map.png';
import { useLanguage } from '@/i18n/LanguageProvider';

interface Step {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  accentColor: string;
  bgGlow: string;
  badgeText: string;
}

const stepKeys: Step[] = [
  {
    icon: Smartphone,
    titleKey: 'howItWorks.tapCard',
    descKey: 'howItWorks.tapCardDesc',
    accentColor: '#E63946', // Primary red
    bgGlow: 'rgba(230, 57, 70, 0.08)',
    badgeText: '01. NFC SCAN'
  },
  {
    icon: User,
    titleKey: 'howItWorks.seeInfo',
    descKey: 'howItWorks.seeInfoDesc',
    accentColor: '#F77F00', // Accent orange
    bgGlow: 'rgba(247, 127, 0, 0.08)',
    badgeText: '02. DATA DECRYPT'
  },
  {
    icon: MessageSquare,
    titleKey: 'howItWorks.alertFamily',
    descKey: 'howItWorks.alertFamilyDesc',
    accentColor: '#2A9D8F', // Success teal
    bgGlow: 'rgba(42, 157, 143, 0.08)',
    badgeText: '03. SOS DISPATCH'
  },
  {
    icon: Hospital,
    titleKey: 'howItWorks.hospitalInformed',
    descKey: 'howItWorks.hospitalInformedDesc',
    accentColor: '#1D3557', // Secondary navy
    bgGlow: 'rgba(29, 53, 87, 0.08)',
    badgeText: '04. ER INTAKE'
  }
];

const stepDurations = [3500, 3600, 3600, 3600];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [scanStatus, setScanStatus] = useState<'ready' | 'scanning' | 'success'>('ready');
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

  // Update activeStep and scanStatus based on scroll position on mobile
  useEffect(() => {
    if (!isMobile) return;

    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest < 200) {
        setActiveStep(0);
        setScanStatus('ready');
      } else if (latest >= 200 && latest < 400) {
        setActiveStep(0);
        setScanStatus('scanning');
      } else if (latest >= 400 && latest < 450) {
        setActiveStep(0);
        setScanStatus('success');
      } else if (latest >= 450 && latest < 750) {
        setActiveStep(1);
      } else if (latest >= 750 && latest < 1050) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });

    return () => unsubscribe();
  }, [isMobile, scrollY]);

  // Scan status animation coordinator
  useEffect(() => {
    if (isMobile) return;
    if (!isInView) {
      setScanStatus('ready');
      return;
    }
    if (activeStep !== 0) {
      setScanStatus('ready');
      return;
    }
    
    // Scan animation stages within the 3.5s duration
    const t1 = setTimeout(() => setScanStatus('scanning'), 800);
    const t2 = setTimeout(() => setScanStatus('success'), 2800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeStep, isInView, isMobile]);

  // Auto-cycle timeline steps with custom durations
  useEffect(() => {
    if (isMobile) return;
    if (!isInView || !isAutoPlaying) return;
    
    const duration = stepDurations[activeStep];
    timerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % stepKeys.length);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStep, isAutoPlaying, isInView, isMobile]);

  const handleStepClick = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveStep(index);
    setIsAutoPlaying(true); // Continue autoplay from the clicked stage
  };

  return (
    <section id="how-it-works" ref={containerRef} className="py-16 md:py-28 bg-[#FAFDFB] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="text-secondary/60 font-semibold tracking-widest uppercase text-xs border border-secondary/15 px-4 py-1.5 rounded-full bg-secondary/5 inline-block">
            {t('common.swasthyaTap')} Emergency Lifecycle
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mt-6 mb-6 tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-secondary/70">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Timeline Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Timeline List */}
          <div className="lg:col-span-7 space-y-4">
            {stepKeys.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.titleKey}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    isActive
                      ? 'bg-white shadow-[0_15px_30px_rgba(29,53,87,0.06)] border-secondary/10 scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-white/40'
                  }`}
                >
                  {/* Vertical Progress Line segment in the background */}
                  {idx < stepKeys.length - 1 && (
                    <div className="absolute left-[36px] md:left-[48px] top-16 md:top-20 bottom-[-20px] w-[2px] bg-gray-100">
                      {/* Active filling progress line */}
                      {isActive && isAutoPlaying && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: stepDurations[idx] / 1000, ease: 'linear' }}
                          key={activeStep}
                          className="w-full bg-primary"
                        />
                      )}
                    </div>
                  )}

                  {/* Left Side: Numbered Icon Node */}
                  <div className="flex-shrink-0 relative flex items-center justify-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 font-mono text-xs md:text-sm font-bold ${
                        isActive
                          ? 'bg-secondary border-secondary text-white scale-110 shadow-md shadow-secondary/20'
                          : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-300'
                      }`}
                      style={{
                        backgroundColor: isActive ? step.accentColor : undefined,
                        borderColor: isActive ? step.accentColor : undefined
                      }}
                    >
                      <StepIcon size={18} className="md:w-5 md:h-5" />
                    </div>
                    {/* Ring outer wave */}
                    {isActive && (
                      <motion.div
                        className="absolute -inset-1.5 rounded-full border border-dashed opacity-40 animate-spin"
                        style={{ borderColor: step.accentColor, animationDuration: '6s' }}
                      />
                    )}
                  </div>

                  {/* Right Side: Step Text Description */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: isActive ? step.bgGlow : '#f3f4f6',
                          color: isActive ? step.accentColor : '#9ca3af'
                        }}
                      >
                        {step.badgeText}
                      </span>

                      {/* Small timer dot indicator */}
                      {isActive && (
                        <div className="flex items-center gap-1.5 text-xs text-secondary/40 font-mono">
                          <Clock size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
                          <span>Active</span>
                        </div>
                      )}
                    </div>

                    <h3
                      className={`text-xl font-extrabold transition-colors duration-500 ${
                        isActive ? 'text-secondary' : 'text-secondary/70 group-hover:text-secondary'
                      }`}
                    >
                      {t(step.titleKey)}
                    </h3>
                    
                    <p className="text-secondary/60 leading-relaxed text-sm md:text-[15px]">
                      {t(step.descKey)}
                    </p>

                    {/* Progress bar inside details */}
                    {isActive && isAutoPlaying && (
                      <div className="w-full h-0.5 bg-gray-100 rounded-full mt-4 overflow-hidden md:hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: stepDurations[idx] / 1000, ease: 'linear' }}
                          key={activeStep}
                          className="h-full"
                          style={{ backgroundColor: step.accentColor }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Simulated Mobile Frame */}
          <div className="lg:col-span-5 flex justify-center items-center order-first lg:order-none">
            <div className="relative w-[260px] h-[510px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[630px] bg-[#0c1322] rounded-[40px] sm:rounded-[44px] md:rounded-[48px] p-3 md:p-3.5 shadow-[0_30px_70px_rgba(13,27,42,0.3)] border-[6px] sm:border-[7px] md:border-[8px] border-slate-900 flex flex-col">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full ml-auto mr-4" />
              </div>

              {/* Tapping Card Overlay (Flares/Taps OVER the phone screen and frame) */}
              <AnimatePresence mode="wait">
                {activeStep === 0 && !isMobile && isInView && (
                  <motion.div
                    key="tapping-card"
                    initial={{ y: -170, x: 70, rotate: 25, opacity: 0, scale: 1.05 }}
                    animate={{ 
                      y: [ -170, 15, 15, -170 ], // Tap cycle
                      x: [ 70, -15, -15, 70 ],
                      rotate: [ 25, -10, -10, 25 ],
                      opacity: [ 0, 1, 1, 0 ],
                      scale: [ 1.05, 1, 1, 1.05 ]
                    }}
                    transition={{ 
                      repeat: isAutoPlaying ? 0 : Infinity,
                      repeatDelay: 0.5,
                      duration: 3.5,
                      times: [ 0, 0.23, 0.8, 1.0 ],
                      ease: "easeInOut"
                    }}
                    className="absolute z-40 top-0 left-4 right-4 sm:left-6 sm:w-60 h-32 sm:h-36 bg-gradient-to-br from-[#1a8080] via-[#0d5060] to-[#0a1f3a] rounded-2xl border border-white/25 p-3 sm:p-4 flex flex-col justify-between shadow-[0_25px_60px_rgba(26,128,128,0.5)] overflow-hidden"
                  >
                    {/* Glow highlight */}
                    <div className="absolute inset-0 bg-[radial-gradient(150px_circle_at_40px_30px,rgba(100,220,200,0.18),transparent)] pointer-events-none" />

                    {/* Tricolor Waves SVG */}
                    <svg className="absolute bottom-0 right-0 w-28 h-20 pointer-events-none" viewBox="0 0 300 200" fill="none">
                      <path d="M50 200 C80 140 140 160 200 100 C240 70 280 90 300 50 L300 200 Z" fill="#FF9933" />
                      <path d="M80 200 C110 130 170 150 230 90 C270 60 290 80 300 35 L300 50 C280 90 240 70 200 100 C140 160 80 140 50 200 Z" fill="#FFFFFF" />
                      <path d="M110 200 C140 120 200 140 260 80 C290 50 295 70 300 20 L300 35 C290 80 270 60 230 90 C170 150 110 130 80 200 Z" fill="#138808" />
                    </svg>

                    {/* NFC Signal Waves Top Right */}
                    <div className="absolute top-3.5 right-3.5 opacity-90 text-white/90">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="rotate-90">
                        <path d="M5 12h.01M9 9a5 5 0 0 1 0 6M13 6a9 9 0 0 1 0 12M17 3a13 13 0 0 1 0 18" />
                      </svg>
                    </div>

                    {/* Card Front Content Layout */}
                    <div className="flex justify-between items-start">
                      {/* Heart ECG Logo */}
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                          <path d="M3 12h3l2-5 3 11 2-8 2 4.5h4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Brand & Tagline in center */}
                    <div className="text-center w-full z-10 -mt-2">
                      <span className="text-sm font-black tracking-wide block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">SwasthyaTap</span>
                      <span className="text-[7.5px] text-white/80 font-medium block truncate max-w-[140px] mx-auto mt-0.5">{t('card3d.tagline')}</span>
                    </div>

                    {/* Bottom row: SVG QR Code */}
                    <div className="flex justify-between items-end mt-auto relative z-10">
                      {/* Scalable vector QR Code */}
                      <svg width="36" height="36" viewBox="0 0 29 29" fill="black" className="bg-white p-1 rounded-[4px] shadow-sm flex-shrink-0">
                        <path d="M 0,0 H 7 V 7 H 0 Z M 1,1 V 6 H 6 V 1 Z M 2,2 H 5 V 5 H 2 Z" />
                        <path d="M 22,0 H 29 V 7 H 22 Z M 23,1 V 6 H 28 V 1 Z M 24,2 H 27 V 5 H 24 Z" />
                        <path d="M 0,22 H 7 V 29 H 0 Z M 1,23 V 28 H 6 V 23 Z M 2,24 H 5 V 27 H 2 Z" />
                        <path d="M 18,18 H 23 V 23 H 18 Z M 19,19 V 22 H 22 V 19 Z M 20,20 H 21 V 21 H 20 Z" />
                        <path d="
                          M 8,1 H 9 V 2 H 8 Z M 10,1 H 11 V 3 H 10 Z M 12,0 H 13 V 2 H 12 Z M 14,1 H 15 V 2 H 14 Z M 16,0 H 18 V 1 H 16 Z M 19,1 H 21 V 2 H 19 Z
                          M 8,3 H 10 V 4 H 8 Z M 11,4 H 13 V 5 H 11 Z M 14,3 H 16 V 4 H 14 Z M 17,4 H 18 V 5 H 17 Z M 20,3 H 21 V 5 H 20 Z
                          M 9,5 H 10 V 7 H 9 Z M 12,6 H 14 V 7 H 12 Z M 15,5 H 17 V 6 H 15 Z M 18,6 H 20 V 7 H 18 Z
                          M 0,8 H 2 V 9 H 0 Z M 3,9 H 5 V 10 H 3 Z M 6,8 H 7 V 10 H 6 Z M 8,9 H 10 V 11 H 8 Z M 11,8 H 12 V 10 H 11 Z M 13,9 H 15 V 10 H 13 Z M 16,8 H 17 V 10 H 16 Z M 18,9 H 20 V 10 H 18 Z M 21,8 H 22 V 9 H 21 Z M 23,9 H 25 V 11 H 23 Z M 26,8 H 28 V 9 H 26 Z
                          M 1,11 H 3 V 12 H 1 Z M 4,10 H 6 V 11 H 4 Z M 7,12 H 9 V 13 H 7 Z M 10,11 H 12 V 12 H 10 Z M 13,12 H 14 V 14 H 13 Z M 15,10 H 17 V 11 H 15 Z M 18,11 H 19 V 13 H 18 Z M 20,12 H 22 V 13 H 20 Z M 23,11 H 24 V 12 H 23 Z M 25,12 H 27 V 14 H 25 Z M 28,10 H 29 V 12 H 28 Z
                          M 0,13 H 2 V 14 H 0 Z M 3,14 H 5 V 16 H 3 Z M 6,13 H 7 V 15 H 6 Z M 8,14 H 10 V 15 H 8 Z M 11,13 H 13 V 14 H 11 Z M 14,15 H 16 V 16 H 14 Z M 17,13 H 19 V 14 H 17 Z M 20,15 H 21 V 17 H 20 Z M 22,13 H 24 V 14 H 22 Z M 26,14 H 27 V 15 H 26 Z M 28,13 H 29 V 15 H 28 Z
                          M 8,16 H 9 V 18 H 8 Z M 10,17 H 12 V 18 H 10 Z M 13,16 H 15 V 17 H 13 Z M 16,18 H 18 V 19 H 16 Z M 19,16 H 21 V 17 H 19 Z M 22,17 H 23 V 19 H 22 Z M 24,16 H 26 V 18 H 24 Z M 27,17 H 29 V 18 H 27 Z
                          M 1,19 H 2 V 21 H 1 Z M 3,20 H 5 V 21 H 3 Z M 6,19 H 7 V 20 H 6 Z M 8,21 H 10 V 22 H 8 Z M 11,19 H 13 V 20 H 11 Z M 14,20 H 16 V 21 H 14 Z M 17,19 H 18 V 21 H 17 Z M 24,20 H 25 V 22 H 24 Z M 26,19 H 28 V 21 H 26 Z
                          M 9,23 H 10 V 25 H 9 Z M 11,24 H 13 V 25 H 11 Z M 14,23 H 16 V 24 H 14 Z M 17,25 H 18 V 27 H 17 Z M 24,23 H 26 V 25 H 24 Z M 27,24 H 28 V 26 H 27 Z
                          M 8,26 H 10 V 27 H 8 Z M 11,27 H 12 V 29 H 11 Z M 13,26 H 15 V 27 H 13 Z M 16,28 H 18 V 29 H 16 Z M 19,26 H 20 V 28 H 19 Z M 21,27 H 23 V 28 H 21 Z M 25,26 H 27 V 27 H 25 Z M 28,27 H 29 V 29 H 28 Z
                        " />
                      </svg>
                      <span className="text-[7px] text-white/40 font-mono tracking-widest uppercase pb-0.5">NFC SECURITY</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Screen Content Wrapper */}
              <div className="flex-1 bg-slate-950 rounded-[36px] overflow-hidden relative flex flex-col border border-white/5">
                
                {/* Status Bar */}
                <div className="h-10 flex justify-between items-end px-6 text-[11px] text-white/80 z-20 pb-1.5 font-sans font-medium">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi size={12} className="text-white/80" />
                    <span>5G</span>
                    <div className="w-5 h-2.5 border border-white/55 rounded-[4px] p-[1.5px] flex items-center">
                      <div className="h-full w-3 bg-white rounded-[2px]" />
                    </div>
                  </div>
                </div>

                {/* Persistent dark background - ensures screen is never blank */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14] via-[#101725] to-[#080b11]" />

                <AnimatePresence mode="wait" initial={false}>
                  {/* Step 1: Tap the Card (Apple Pay style NFC Scan screen) */}
                  {activeStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="absolute inset-0 flex flex-col justify-between p-6 text-white bg-gradient-to-b from-[#0b0e14] via-[#101725] to-[#080b11]"
                    >
                      <div className="text-center mt-6 space-y-1">
                        <span className={`text-[10px] tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-extrabold uppercase transition-colors duration-300 ${
                          scanStatus === 'success' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-[#E63946]'
                        }`}>
                          {scanStatus === 'ready' && 'NFC Reader Ready'}
                          {scanStatus === 'scanning' && 'NFC Chip Found'}
                          {scanStatus === 'success' && 'Decryption Complete'}
                        </span>
                        <h4 className="text-lg font-black pt-2">
                          {scanStatus === 'ready' && 'Hold Near Reader'}
                          {scanStatus === 'scanning' && 'Reading Health Key'}
                          {scanStatus === 'success' && 'Profile Decrypted'}
                        </h4>
                        <p className="text-xs text-white/50 max-w-[180px] mx-auto">
                          {scanStatus === 'ready' && 'Place card near top of phone'}
                          {scanStatus === 'scanning' && 'Decrypting secure records...'}
                          {scanStatus === 'success' && '✓ Connected securely'}
                        </p>
                      </div>

                      {/* Interactive circular radar scanner display */}
                      <div className="relative flex-1 w-full flex items-center justify-center">
                        {/* Radar circular rings */}
                        <div className={`absolute w-48 h-48 border-2 rounded-full transition-colors duration-500 ${
                          scanStatus === 'success' ? 'border-green-500/10' : 'border-teal-500/20 animate-ping'
                        }`} />
                        <div className={`absolute w-32 h-32 border rounded-full transition-colors duration-500 ${
                          scanStatus === 'success' ? 'border-green-500/20' : 'border-teal-500/30 animate-pulse [animation-duration:2s]'
                        }`} />
                        <div className={`absolute w-16 h-16 border-2 border-dashed rounded-full transition-colors duration-500 ${
                          scanStatus === 'success' ? 'border-green-400/30' : 'border-teal-400/40 animate-spin [animation-duration:8s]'
                        }`} />
                        
                        {/* Phone scanning indicator icon */}
                        <div className={`relative z-10 w-16 h-16 rounded-full bg-slate-900 border flex items-center justify-center shadow-lg transition-colors duration-500 ${
                          scanStatus === 'success' ? 'border-green-500/40' : 'border-teal-500/30'
                        }`}>
                          {scanStatus === 'success' ? (
                            <CheckCircle2 size={28} className="text-green-400 animate-bounce" />
                          ) : (
                            <Smartphone size={28} className="text-teal-400 animate-pulse" />
                          )}
                        </div>
                      </div>

                      <div className="mb-4 bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-1.5">
                        <div className="flex items-center gap-3">
                          <Activity size={16} className={`animate-pulse ${scanStatus === 'success' ? 'text-green-400' : 'text-primary'}`} />
                          <div className="text-left">
                            <span className="text-[10px] font-bold block text-white/80">
                              {scanStatus === 'ready' && 'Awaiting NFC Signal'}
                              {scanStatus === 'scanning' && 'Scanning Secure Chip...'}
                              {scanStatus === 'success' && 'Syncing Data Feed...'}
                            </span>
                            <span className="text-[8px] text-white/50 block">
                              {scanStatus === 'ready' && 'Bring device within 2 cm'}
                              {scanStatus === 'scanning' && 'Keep phone steady near card'}
                              {scanStatus === 'success' && 'Loading profile dashboard'}
                            </span>
                          </div>
                        </div>

                        {/* Scan progress bar */}
                        {scanStatus === 'scanning' && (
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2, ease: 'easeInOut' }}
                              className="h-full bg-teal-400"
                            />
                          </div>
                        )}
                        {scanStatus === 'success' && (
                          <div className="w-full h-1 bg-green-500 rounded-full mt-1" />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: See Critical Info (Emergency Medical Profile UI) */}
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="absolute inset-0 flex flex-col bg-[#FAFDF9] text-secondary"
                    >
                      {/* Emergency Banner */}
                      <div className="bg-[#E63946] p-4 pt-6 text-white text-center shadow-lg relative">
                        <div className="absolute top-2 left-4 text-[9px] font-mono tracking-widest text-white/60">SWASTHYATAP SECURE WEB</div>
                        <div className="flex justify-center items-center gap-2 mt-1">
                          <ShieldAlert size={16} className="animate-bounce" />
                          <h4 className="text-xs font-black tracking-widest uppercase">EMERGENCY MEDICAL ID</h4>
                        </div>
                      </div>

                      {/* Main card details container */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                        
                        {/* Patient info card */}
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center font-black text-sm">
                            RS
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-secondary">Rahul Sharma</h5>
                            <span className="text-[9px] text-gray-400 font-mono tracking-wider block">ID: STP 1234 5678</span>
                          </div>
                        </div>

                        {/* Split parameters grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-red-50 p-3 rounded-xl border border-red-100 flex flex-col items-center">
                            <span className="text-[8px] font-bold uppercase tracking-wider text-red-500">Blood Group</span>
                            <span className="text-lg font-black text-red-600 mt-0.5">O+</span>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex flex-col items-center">
                            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-600">Allergies</span>
                            <span className="text-[11px] font-black text-amber-700 mt-0.5 w-full text-center truncate">Penicillin</span>
                          </div>
                        </div>

                        {/* Health Conditions */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 text-xs">
                          <span className="font-bold text-secondary/80 block mb-1 text-[10px]">MEDICAL CONDITIONS:</span>
                          <p className="text-secondary/70 text-[11px] leading-relaxed">Type 2 Diabetes, Asthmatic</p>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 text-xs">
                          <span className="font-bold text-secondary/80 block mb-1 text-[10px]">EMERGENCY CONTACTS:</span>
                          <div className="flex justify-between items-center text-[10px] text-secondary/70">
                            <span className="font-medium">Karan Sharma (Father)</span>
                            <span className="font-mono font-bold">+91 98765 ...</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Alert Bar */}
                      <div className="p-4 bg-white border-t border-gray-100">
                        <motion.button
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-full bg-[#E63946] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/25"
                        >
                          <Bell size={14} />
                          <span>ALERT FAMILY (SOS)</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Alert Family (iOS style Lockscreen alert notification) */}
                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="absolute inset-0 flex flex-col p-5 bg-[#080d1a] justify-between text-white"
                    >
                      <div className="text-center mt-4">
                        <span className="text-[10px] tracking-widest text-[#2A9D8F] bg-[#2A9D8F]/10 border border-[#2A9D8F]/20 px-3 py-1 rounded-full font-extrabold uppercase">
                          Alert Gateway Status
                        </span>
                        <h4 className="text-sm font-black pt-3">Notification Dispatched</h4>
                      </div>

                      {/* Messaging Box & Simulated Notification widget */}
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        
                        {/* Simulated Alert Notification Popup */}
                        <div className="bg-slate-900/90 border border-white/10 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl relative overflow-hidden">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-md bg-[#E63946] flex items-center justify-center">
                              <ShieldAlert size={12} className="text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-white/80">SwasthyaTap Emergency</span>
                            <span className="text-[8px] text-white/40 ml-auto font-mono">1m ago</span>
                          </div>
                          <h5 className="text-[11px] font-black text-red-400">🚨 CRITICAL ALERT</h5>
                          <p className="text-[10px] text-white/70 leading-relaxed mt-1">
                            Rahul Sharma is registered in an emergency. Live tracking URL dispatched.
                          </p>
                        </div>

                        {/* Location map frame */}
                        <div className="bg-[#121b2d] border border-white/5 rounded-2xl p-2.5 flex-1 flex flex-col relative min-h-[175px] overflow-hidden">
                          <div className="flex justify-between items-center text-[9px] text-white/50 mb-1.5 border-b border-white/5 pb-1.5">
                            <span className="font-mono">LIVE GPS MAP LINK</span>
                            <span className="text-green-400 font-extrabold animate-pulse">TRANSMITTING GPS</span>
                          </div>
                          
                          {/* Simulated Map Visual */}
                          <div className="flex-1 bg-[#0b0f19] rounded-xl relative flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
                            {/* Satellite background */}
                            <img
                              src={SatelliteMapImage.src || SatelliteMapImage}
                              alt="Satellite GPS Navigation"
                              className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-lighten"
                            />
                            
                            {/* Grid scanning/overlay lines */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(11,15,25,0.6)_100%)] pointer-events-none" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:15px_15px] opacity-20 pointer-events-none" />

                            {/* SVG Overlay: Routing Line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 120" preserveAspectRatio="none">
                              <path 
                                d="M 132,72 L 95,72 L 95,30 L 42,30 L 42,12" 
                                stroke="#2A9D8F" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeDasharray="6 4" 
                                style={{ 
                                  animation: 'routeFlow 1.2s linear infinite',
                                }} 
                                fill="none" 
                              />
                            </svg>

                            <style>{`
                              @keyframes routeFlow {
                                to { stroke-dashoffset: -20; }
                              }
                            `}</style>

                            {/* Hospital Location Marker (ER Destination) */}
                            <div className="absolute top-[6px] left-[34px] flex flex-col items-center z-10">
                              <div className="bg-teal-500 text-slate-950 p-1 rounded-full border border-white/20 shadow-lg flex items-center justify-center">
                                <Hospital size={11} className="stroke-[3]" />
                              </div>
                              <span className="text-[6px] font-black text-white font-mono tracking-widest mt-0.5 bg-slate-900/90 border border-teal-500/35 px-1 py-0.5 rounded shadow">ER DES</span>
                            </div>

                            {/* Pulse patient GPS coordinates */}
                            <div className="absolute top-[62px] left-[122px] flex flex-col items-center z-10">
                              <div className="absolute w-12 h-12 bg-red-500/25 rounded-full animate-ping" />
                              <div className="absolute w-6 h-6 bg-red-500/35 rounded-full animate-ping [animation-delay:0.5s]" />
                              <div className="bg-[#E63946] text-white p-1 rounded-full border border-white/20 shadow-lg flex items-center justify-center">
                                <MapPin size={11} className="stroke-[3]" />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="bg-[#2A9D8F]/15 border border-[#2A9D8F]/25 py-2.5 px-4 rounded-xl flex items-center gap-2 justify-center text-[10px] text-[#2A9D8F]">
                        <CheckCircle2 size={13} />
                        <span className="font-bold">SMS notifications delivered to 3 contacts</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Hospital Informed (EHR Portal interface) */}
                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="absolute inset-0 flex flex-col p-5 bg-[#0c1220] text-white"
                    >
                      {/* ER System header banner */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mt-4">
                        <div className="flex items-center gap-2">
                          <Activity className="text-primary animate-pulse" size={16} />
                          <h4 className="text-[10px] font-black tracking-widest text-white/80">APEX HOSPITAL ER PORTAL</h4>
                        </div>
                        <span className="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">
                          INCOMING
                        </span>
                      </div>

                      {/* Portal medical sync file display */}
                      <div className="flex-1 mt-4 space-y-4">
                        
                        {/* Simulated Intake Card */}
                        <div className="bg-slate-900 border border-white/5 p-3 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-[9px] text-white/40">
                            <span>PRE-ARRIVAL INTAKE</span>
                            <span className="font-mono">ETA 5 MIN</span>
                          </div>
                          <p className="font-extrabold text-xs text-white">Rahul Sharma (Age 35)</p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[8px] bg-red-500/20 text-[#E63946] border border-red-500/25 px-2 py-0.5 rounded font-bold">
                              BLOOD: O+
                            </span>
                            <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded font-bold">
                              PENICILLIN ALLERGY
                            </span>
                          </div>
                        </div>

                        {/* ER Prep Steps Checklist */}
                        <div className="space-y-2">
                          <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">PRE-ARRIVAL CHECKLIST</span>
                          
                          <div className="bg-slate-900/50 border border-white/5 p-2.5 rounded-lg flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={12} className="text-green-400" />
                              <span className="text-white/80 text-[10px]">O+ Blood Units Prepared</span>
                            </div>
                            <span className="text-[8px] text-green-400 font-extrabold">VERIFIED</span>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-2.5 rounded-lg flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={12} className="text-green-400" />
                              <span className="text-white/80 text-[10px]">Trauma Bay 2 Reserved</span>
                            </div>
                            <span className="text-[8px] text-green-400 font-extrabold">ASSIGNED</span>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-2.5 rounded-lg flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={12} className="text-green-400" />
                              <span className="text-white/80 text-[10px]">EMR Intake File Loaded</span>
                            </div>
                            <span className="text-[8px] text-green-400 font-extrabold">SYNCED</span>
                          </div>
                        </div>

                      </div>

                      {/* Synced footer bar */}
                      <div className="mt-auto bg-green-500/10 border border-green-500/25 p-3 rounded-xl flex items-center gap-3">
                        <CheckCircle2 className="text-green-400 flex-shrink-0" size={18} />
                        <div className="text-left leading-normal">
                          <span className="font-bold block text-white text-[10px]">Intake Configured</span>
                          <span className="text-[8px] text-green-400 block">Critical emergency profile pre-loaded.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* iOS Home pill bar indicator */}
              <div className="h-4 flex items-center justify-center">
                <div className="w-24 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
