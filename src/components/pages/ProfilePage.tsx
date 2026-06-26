import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Shield, Droplets, Pill } from 'lucide-react';

// Mock data - in production this would come from Supabase
const mockProfile = {
  name: 'Harshit Borana',
  photo: null,
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Dust'],
  medications: ['None'],
  conditions: ['None'],
  emergencyContacts: [
    { name: 'Mom', phone: '+91-9876543210' },
    { name: 'Dad', phone: '+91-9876543211' },
  ],
};

import { LanguageProvider } from '@/i18n/LanguageProvider';

function ProfileContent({ uid }: { uid?: string }) {
  const [alertSent, setAlertSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleAlert = async () => {
    setSending(true);
    // In production: get GPS, send SMS via API
    await new Promise((r) => setTimeout(r, 1500));
    setAlertSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="bg-white rounded-t-card p-6 text-center border-b">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-3">
            <span className="text-3xl font-bold text-primary">{mockProfile.name[0]}</span>
          </div>
          <h1 className="text-xl font-bold text-secondary">{mockProfile.name}</h1>
          <p className="text-sm text-secondary/60">SwasthyaTap Health ID {uid ? `(${uid})` : ''}</p>
        </div>

        {/* Critical Info */}
        <div className="bg-white p-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-btn">
            <Droplets className="text-primary" size={24} />
            <div>
              <p className="text-xs text-secondary/60">Blood Group</p>
              <p className="text-lg font-bold text-primary">{mockProfile.bloodGroup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-btn">
            <AlertTriangle className="text-accent" size={24} />
            <div>
              <p className="text-xs text-secondary/60">Allergies</p>
              <p className="font-medium text-secondary">{mockProfile.allergies.join(', ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-btn">
            <Pill className="text-blue-600" size={24} />
            <div>
              <p className="text-xs text-secondary/60">Medications</p>
              <p className="font-medium text-secondary">{mockProfile.medications.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Alert Button */}
        <div className="bg-white p-4 border-t">
          {!alertSent ? (
            <button
              onClick={handleAlert}
              disabled={sending}
              className="w-full bg-primary text-white py-4 rounded-btn font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-70 animate-pulse-glow"
            >
              {sending ? (
                'Sending Alert...'
              ) : (
                <>
                  <AlertTriangle size={20} />
                  🚨 ALERT FAMILY
                </>
              )}
            </button>
          ) : (
            <div className="text-center p-4 bg-green-50 rounded-btn">
              <p className="text-success font-bold">✓ Alert Sent!</p>
              <p className="text-sm text-secondary/60 mt-1">Emergency contacts have been notified with your location</p>
            </div>
          )}
        </div>

        {/* Additional Actions */}
        <div className="bg-white rounded-b-card p-4 border-t space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-btn">
            <Shield className="text-secondary" size={20} />
            <span className="text-sm font-medium text-secondary">View Full Profile (PIN required)</span>
          </a>
          <a href="tel:108" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-btn">
            <Phone className="text-success" size={20} />
            <span className="text-sm font-medium text-secondary">Call 108 (Ambulance)</span>
          </a>
        </div>

        <p className="text-center text-xs text-secondary/40 mt-4">
          Powered by SwasthyaTap
        </p>
      </motion.div>
    </div>
  );
}

export default function ProfilePage({ uid }: { uid?: string }) {
  return (
    <LanguageProvider>
      <ProfileContent uid={uid} />
    </LanguageProvider>
  );
}
