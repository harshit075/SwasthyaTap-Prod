'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

const storyKeys = [
  { titleKey: 'testimonials.story1Title', quoteKey: 'testimonials.story1Quote', authorKey: 'testimonials.story1Author' },
  { titleKey: 'testimonials.story2Title', quoteKey: 'testimonials.story2Quote', authorKey: 'testimonials.story2Author' },
  { titleKey: 'testimonials.story3Title', quoteKey: 'testimonials.story3Quote', authorKey: 'testimonials.story3Author' },
  { titleKey: 'testimonials.story4Title', quoteKey: 'testimonials.story4Quote', authorKey: 'testimonials.story4Author' },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('testimonials.title')}</h2>
          <p className="mt-4 text-lg text-secondary/55">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {storyKeys.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-primary mb-3">{t(s.titleKey)}</h3>
                <p className="text-secondary/70 text-sm italic mb-4">&ldquo;{t(s.quoteKey)}&rdquo;</p>
              </div>
              <p className="text-sm font-medium text-secondary mt-auto">&mdash; {t(s.authorKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-base text-secondary/60 max-w-2xl mx-auto italic">
            &ldquo;We believe every Indian — from a truck driver in Rajasthan to a grandmother in Kerala — deserves to be identifiable and saveable in an emergency.&rdquo;
          </p>
          <p className="text-sm font-semibold text-secondary mt-3">— Team SwasthyaTap, Kadel Labs</p>
        </motion.div>
      </div>
    </section>
  );
}
