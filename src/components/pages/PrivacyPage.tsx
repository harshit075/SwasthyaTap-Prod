import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

function PrivacyContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      <Navbar />
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,57,70,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(42,157,143,0.02)_0%,transparent_50%)]" />

      <div className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 pt-24 pb-16 relative z-10">
        <a href="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </a>
        
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-secondary/10 shadow-[0_15px_40px_rgba(29,53,87,0.04)]">
          <h1 className="text-3xl font-extrabold text-secondary mb-6">Privacy Policy</h1>
          <div className="prose prose-secondary space-y-5 text-secondary/80 leading-relaxed">
            <p><strong>Last updated:</strong> June 2026</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">1. Data We Collect</h2>
            <p>We collect only the information necessary to provide emergency health identification: name, phone number, blood group, allergies, medications, medical conditions, and emergency contact details.</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">2. How We Use Your Data</h2>
            <p>Your data is used exclusively to display critical health information when your NFC card is tapped, alert your emergency contacts during emergencies, and match blood donors with recipients.</p>
            
            <h2 id="dpdp" className="text-xl font-bold text-secondary mt-8 mb-2">3. Privacy Tiers &amp; DPDP Compliance</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Public:</strong> Name, Blood Group, Critical Allergies — visible on card tap</li>
              <li><strong>PIN Protected:</strong> Medications, Conditions, Full contacts — requires 4-digit PIN</li>
              <li><strong>Owner Only:</strong> Full medical history, documents — requires authentication</li>
            </ul>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">4. Data Storage</h2>
            <p>All data is stored on servers located in India (AWS Mumbai region) and encrypted using AES-256 encryption. We are fully compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act).</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">5. Your Rights</h2>
            <p>You can access, modify, or delete your data at any time through your dashboard. You can deactivate your card instantly if lost or stolen.</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">6. Contact</h2>
            <p>For privacy concerns, contact us at privacy@swasthyatap.in or write to SwasthyaTap.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}
