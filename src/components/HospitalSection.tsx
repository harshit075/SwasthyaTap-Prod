'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Zap, DollarSign } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function HospitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section id="hospital" className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">For Healthcare</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('hospital.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('hospital.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <Building2 className="text-primary" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.identifyPatients')}</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <Zap className="text-accent" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.bloodApi')}</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-card">
            <DollarSign className="text-success" size={24} />
            <span className="text-secondary text-sm font-medium">{t('hospital.zeroCost')}</span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="mailto:support@swasthtap.in?subject=Hospital Partnership Request"
            className="bg-primary text-white px-8 py-3.5 rounded-btn font-bold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-md shadow-primary/20"
          >
            {t('hospital.requestDemo')}
          </a>
        </div>
      </div>
    </section>
  );
}
