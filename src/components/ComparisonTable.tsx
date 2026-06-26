'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Minus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

const featureKeys = [
  'comparison.worksUnconscious',
  'comparison.realTimeAlerts',
  'comparison.bloodMatching',
  'comparison.updateable',
  'comparison.multilingual',
  'comparison.cost',
];

const solutions: { name: string; values: (string | boolean | null)[] }[] = [
  { name: 'SwasthyaTap', values: [true, true, true, true, true, '₹20'] },
  { name: 'ABHA Card', values: [false, false, false, true, null, 'Free'] },
  { name: 'Paper Records', values: [false, false, false, false, false, 'Varies'] },
  { name: 'Medical Bracelet', values: [null, false, false, false, false, '₹500+'] },
];

function StatusIcon({ value }: { value: boolean | null | string }) {
  if (typeof value === 'string') return <span className="text-[10px] sm:text-sm md:text-base font-bold text-secondary">{value}</span>;
  if (value === true) return <Check className="text-success mx-auto" size={16} />;
  if (value === false) return <X className="text-red-500 mx-auto" size={16} />;
  return <Minus className="text-secondary/30 mx-auto" size={16} />;
}

export default function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{t('comparison.title')}</h2>
          <p className="mt-3 text-base text-secondary/55">{t('comparison.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          <table className="w-full table-fixed text-[10px] sm:text-sm md:text-base border-collapse">
            <colgroup>
              <col className="w-[32%] sm:w-[36%]" />
              <col className="w-[17%] sm:w-[16%]" />
              <col className="w-[17%] sm:w-[16%]" />
              <col className="w-[17%] sm:w-[16%]" />
              <col className="w-[17%] sm:w-[16%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-1 sm:py-4 sm:px-4 text-secondary/70 font-semibold text-[10px] sm:text-sm md:text-base">
                  {t('comparison.feature')}
                </th>
                {solutions.map((s) => (
                  <th 
                    key={s.name} 
                    className={`py-3 px-1 sm:py-4 sm:px-4 text-center font-bold text-[10px] sm:text-sm md:text-base break-words leading-tight ${
                      s.name === 'SwasthyaTap' ? 'text-success bg-success/5 rounded-t-xl' : 'text-secondary/60'
                    }`}
                  >
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map((featureKey, i) => (
                <tr key={featureKey} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-1 sm:py-5 sm:px-4 text-[10px] sm:text-sm md:text-base font-medium text-secondary/80 leading-snug break-words">
                    {t(featureKey)}
                  </td>
                  {solutions.map((s) => (
                    <td key={s.name} className={`py-4 px-1 sm:py-5 sm:px-4 text-center ${s.name === 'SwasthyaTap' ? 'bg-success/5' : ''}`}>
                      <StatusIcon value={s.values[i]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
