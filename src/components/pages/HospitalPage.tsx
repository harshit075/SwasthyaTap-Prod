import { motion } from 'framer-motion';
import { Building2, Zap, DollarSign, ArrowLeft } from 'lucide-react';

import { LanguageProvider } from '@/i18n/LanguageProvider';
// hii
function HospitalContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <a href="/" className="flex items-center gap-2 text-secondary mb-8 hover:text-primary">
          <ArrowLeft size={20} /> Back to Home
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-secondary mb-4">SwasthyaTap for Hospitals</h1>
          <p className="text-xl text-secondary/60 mb-12">Identify unconscious patients in seconds, not hours</p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-card flex items-start gap-4">
              <Building2 className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-bold text-secondary">Instant Patient ID</h3>
                <p className="text-sm text-secondary/60 mt-1">Access critical health data the moment a patient arrives</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-card flex items-start gap-4">
              <Zap className="text-accent mt-1" size={24} />
              <div>
                <h3 className="font-bold text-secondary">Blood Donor API</h3>
                <p className="text-sm text-secondary/60 mt-1">Real-time matching with donors within 5km radius</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-card flex items-start gap-4">
              <DollarSign className="text-success mt-1" size={24} />
              <div>
                <h3 className="font-bold text-secondary">Zero Pilot Cost</h3>
                <p className="text-sm text-secondary/60 mt-1">Start with a free pilot — no integration cost</p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default function HospitalPage() {
  return (
    <LanguageProvider>
      <HospitalContent />
    </LanguageProvider>
  );
}
