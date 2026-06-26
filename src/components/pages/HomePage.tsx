import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import ImpactStats from '@/components/ImpactStats';
import TechnicalArchitecture from '@/components/TechnicalArchitecture';
import ComparisonTable from '@/components/ComparisonTable';
import Features from '@/components/Features';
import WhoIsThisFor from '@/components/WhoIsThisFor';
import TrustSecurity from '@/components/TrustSecurity';
import BloodNetwork from '@/components/BloodNetwork';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';

export default function HomePage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    // Open modal if register parameter is present in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('register') === 'true' || window.location.hash === '#register') {
      setIsRegisterModalOpen(true);
      // Clean up hash/params silently
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <LanguageProvider>
      <Navbar onGetFreeCardClick={() => setIsRegisterModalOpen(true)} />
      <HeroSection onGetFreeCardClick={() => setIsRegisterModalOpen(true)} />
      <HowItWorks />
      <ImpactStats />
      <TechnicalArchitecture />
      <ComparisonTable />
      <Features />
      <WhoIsThisFor />
      <TrustSecurity />
      <BloodNetwork />
      <Testimonials />
      <Footer />

      {isRegisterModalOpen && (
        <RegistrationModal onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </LanguageProvider>
  );
}
