import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

function TermsContent() {
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
          <h1 className="text-3xl font-extrabold text-secondary mb-6">Terms of Service</h1>
          <div className="prose prose-secondary space-y-5 text-secondary/80 leading-relaxed">
            <p><strong>Last updated:</strong> June 2026</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">1. Service Description</h2>
            <p>SwasthyaTap provides NFC-based emergency health identification cards and a digital platform for managing health profiles, emergency alerts, and blood donor matching.</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate health information</li>
              <li>Keep emergency contact details updated</li>
              <li>Do not share your PIN with unauthorized persons</li>
              <li>Report lost/stolen cards immediately</li>
            </ul>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">3. Disclaimer</h2>
            <p>SwasthyaTap is an emergency information tool and does not replace professional medical advice, diagnosis, or treatment. We are not liable for medical decisions made based on card information.</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">4. Card Usage</h2>
            <p>The NFC card remains the property of SwasthyaTap. One card per registered user. Cards must not be tampered with or used for purposes other than health identification.</p>
            
            <h2 className="text-xl font-bold text-secondary mt-8 mb-2">5. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bangalore, Karnataka.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function TermsPage() {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  );
}
