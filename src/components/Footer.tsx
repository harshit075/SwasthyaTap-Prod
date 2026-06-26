'use client';
import { Activity } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  const links = {
    [t('footer.product')]: [
      { label: t('footer.features'), href: '/#features' },
      { label: t('footer.bloodNetwork'), href: '/#blood-network' },
      { label: t('footer.forHospitals'), href: '/hospital' },
    ],
    [t('footer.company')]: [
      { label: t('footer.about'), href: '/about' },
      { label: t('footer.careers'), href: '/careers' },
      { label: t('footer.blog'), href: '/blog' },
      { label: t('footer.contact'), href: 'mailto:support@swasthtap.in' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.privacy'), href: '/privacy' },
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.dpdp'), href: '/privacy#dpdp' },
    ],
  };

  return (
    <footer className="bg-secondary text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center">
                <Activity size={18} className="text-primary" />
              </span>
              <span className="text-lg font-bold">{t('common.swasthyaTap')}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-white/30 text-xs mt-4">{t('footer.byCompany')}</p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4 text-white/80">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-white/45 hover:text-white text-sm transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            {t('footer.madeFor')}
          </p>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
