'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HardHat, UserCheck, Truck, Baby, Users } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const segmentKeys = [
  { 
    icon: HardHat, 
    iconName: 'HardHat',
    segmentKey: 'whoIsThisFor.migrantWorkers', 
    hookKey: 'whoIsThisFor.migrantWorkersHook', 
    color: 'from-amber-400 to-amber-600',
    iconBg: 'bg-amber-50 group-hover:bg-amber-500',
    iconColor: 'text-amber-600 group-hover:text-white',
    hoverBorder: 'hover:border-amber-500/30',
    hoverShadow: 'hover:shadow-[0_25px_50px_rgba(245,158,11,0.08)]'
  },
  { 
    icon: UserCheck, 
    iconName: 'UserCheck',
    segmentKey: 'whoIsThisFor.seniorCitizens', 
    hookKey: 'whoIsThisFor.seniorCitizensHook', 
    color: 'from-blue-400 to-blue-600',
    iconBg: 'bg-blue-50 group-hover:bg-blue-500',
    iconColor: 'text-blue-600 group-hover:text-white',
    hoverBorder: 'hover:border-blue-500/30',
    hoverShadow: 'hover:shadow-[0_25px_50px_rgba(59,130,246,0.08)]'
  },
  { 
    icon: Truck, 
    iconName: 'Truck',
    segmentKey: 'whoIsThisFor.truckDrivers', 
    hookKey: 'whoIsThisFor.truckDriversHook', 
    color: 'from-emerald-400 to-emerald-600',
    iconBg: 'bg-emerald-50 group-hover:bg-emerald-500',
    iconColor: 'text-emerald-600 group-hover:text-white',
    hoverBorder: 'hover:border-emerald-500/30',
    hoverShadow: 'hover:shadow-[0_25px_50px_rgba(16,185,129,0.08)]'
  },
  { 
    icon: Baby, 
    iconName: 'Baby',
    segmentKey: 'whoIsThisFor.children', 
    hookKey: 'whoIsThisFor.childrenHook', 
    color: 'from-pink-400 to-pink-600',
    iconBg: 'bg-pink-50 group-hover:bg-pink-500',
    iconColor: 'text-pink-600 group-hover:text-white',
    hoverBorder: 'hover:border-pink-500/30',
    hoverShadow: 'hover:shadow-[0_25px_50px_rgba(236,72,153,0.08)]'
  },
  { 
    icon: Users, 
    iconName: 'Users',
    segmentKey: 'whoIsThisFor.everyone', 
    hookKey: 'whoIsThisFor.everyoneHook', 
    color: 'from-primary to-accent',
    iconBg: 'bg-red-50 group-hover:bg-primary',
    iconColor: 'text-primary group-hover:text-white',
    hoverBorder: 'hover:border-primary/30',
    hoverShadow: 'hover:shadow-[0_25px_50px_rgba(230,57,70,0.08)]'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0, x: 0, y: 0 },
  hover: (iconName: string) => {
    switch (iconName) {
      case 'HardHat':
        return { rotate: [0, -12, 10, -6, 6, 0], transition: { duration: 0.6 } };
      case 'UserCheck':
        return { scale: 1.18, transition: { duration: 0.3 } };
      case 'Truck':
        return { x: [0, 7, -4, 0], transition: { duration: 0.6 } };
      case 'Baby':
        return { y: [0, -5, 5, -3, 3, 0], transition: { duration: 0.6 } };
      case 'Users':
        return { scale: [1, 1.15, 0.96, 1.05, 1], transition: { duration: 0.6 } };
      default:
        return { scale: 1.1 };
    }
  }
};

export default function WhoIsThisFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  const { t } = useLanguage();

  return (
    <section id="who-is-this-for" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFC] relative overflow-hidden">
      {/* Floating background blobs */}
      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          scale: [1, 1.12, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Target Users
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary tracking-tight">
            {t('whoIsThisFor.title')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-secondary/60 max-w-2xl mx-auto leading-relaxed">
            {t('whoIsThisFor.subtitle')}
          </p>
        </motion.div>

        {/* Staggered Animated Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {segmentKeys.map((s) => (
            <motion.div
              key={s.segmentKey}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.025,
                transition: { type: "spring", stiffness: 350, damping: 20 }
              }}
              initial="rest"
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-3xl p-8 bg-white/80 backdrop-blur-md border border-slate-100/80 shadow-[0_8px_30px_rgba(29,53,87,0.015)] transition-all duration-500 ${s.hoverBorder} ${s.hoverShadow} group cursor-pointer flex flex-col items-center text-center`}
            >
              {/* Card top gradient color stripe */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Circle Icon Container */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-sm ${s.iconBg} ${s.iconColor}`}>
                <motion.div
                  variants={iconVariants}
                  custom={s.iconName}
                  className="flex items-center justify-center"
                >
                  <s.icon size={26} />
                </motion.div>
              </div>
              
              <h3 className="font-bold text-secondary text-base mb-3 transition-colors duration-300 group-hover:text-primary">
                {t(s.segmentKey)}
              </h3>
              <p className="text-xs text-secondary/60 leading-relaxed font-normal flex-grow">
                {t(s.hookKey)}
              </p>
              
              {/* Animated Detail Indicator */}
              <div className="mt-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-secondary/35 group-hover:text-primary transition-colors duration-300">
                <span>Details</span>
                <motion.span 
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 3 }
                  }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
