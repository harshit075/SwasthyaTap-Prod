import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface RegistrationModalProps {
  onClose: () => void;
}

export default function RegistrationModal({ onClose }: RegistrationModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'select' | 'hospital' | 'success'>('select');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hospital Form State
  const [hospitalForm, setHospitalForm] = useState({
    hospitalName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    licenseId: '',
    beds: '',
  });

  const handleSelectIndividual = () => {
    // Navigate to current individual registration page
    window.location.href = '/register';
  };

  const handleHospitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register/hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hospitalForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register hospital');
      }

      // Success
      setMode('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_60px_rgba(29,53,87,0.12)] border border-slate-100/90 overflow-hidden z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-secondary/40 hover:text-secondary transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {/* Mode 1: Select Type */}
            {mode === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    Registration
                  </span>
                  <h3 className="text-2xl font-extrabold text-secondary tracking-tight">
                    Get Your Card Today
                  </h3>
                  <p className="text-sm text-secondary/60 mt-2">
                    Please select the registration type that fits your requirement
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Individual Option */}
                  <motion.div
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={handleSelectIndividual}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:border-primary/20 bg-slate-50/50 hover:bg-white hover:shadow-[0_15px_30px_rgba(29,53,87,0.04)] cursor-pointer transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <User size={22} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-secondary text-base group-hover:text-primary transition-colors">
                        Register Individually
                      </h4>
                      <p className="text-xs text-secondary/50 mt-1 leading-relaxed">
                        Register as a citizen to get your own secure NFC health card. Setup emergency contacts and medical details.
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-secondary/20 group-hover:text-primary group-hover:translate-x-1 transition-all self-center shrink-0" />
                  </motion.div>

                  {/* Hospital Option */}
                  <motion.div
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => setMode('hospital')}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:border-primary/20 bg-slate-50/50 hover:bg-white hover:shadow-[0_15px_30px_rgba(29,53,87,0.04)] cursor-pointer transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <Building2 size={22} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-secondary text-base group-hover:text-secondary transition-colors">
                        Register as a Hospital
                      </h4>
                      <p className="text-xs text-secondary/50 mt-1 leading-relaxed">
                        Partner as a healthcare institution. Integrate with emergency response modules, scan cards, and view patient profiles instantly.
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-secondary/20 group-hover:text-secondary group-hover:translate-x-1 transition-all self-center shrink-0" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Mode 2: Hospital Form */}
            {mode === 'hospital' && (
              <motion.div
                key="hospital"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <button
                    onClick={() => { setMode('select'); setError(''); }}
                    className="text-xs font-bold text-secondary/40 hover:text-primary transition-colors flex items-center gap-1.5 mb-2"
                  >
                    ← Back to Options
                  </button>
                  <h3 className="text-xl font-extrabold text-secondary tracking-tight">
                    Hospital Registration
                  </h3>
                  <p className="text-xs text-secondary/60 mt-1">
                    Fill in your hospital details below to initiate our pilot partnership program
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-primary text-xs rounded-xl font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleHospitalSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">Hospital Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. City General Hospital"
                        value={hospitalForm.hospitalName}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, hospitalName: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">Contact Person Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Amit Sharma"
                        value={hospitalForm.contactName}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, contactName: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. admin@hospital.com"
                        value={hospitalForm.email}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={hospitalForm.phone}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, phone: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">City / State</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai, MH"
                        value={hospitalForm.city}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, city: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">License ID</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. HOSP-10294"
                        value={hospitalForm.licenseId}
                        onChange={(e) => setHospitalForm({ ...hospitalForm, licenseId: e.target.value })}
                        className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-secondary/60 uppercase tracking-wider mb-1">Total Bed Capacity</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150"
                      value={hospitalForm.beds}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, beds: e.target.value })}
                      className="w-full text-sm border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      min={1}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary/95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 shadow-md shadow-primary/20 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Register Hospital & Get scanner'
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Mode 3: Success Screen */}
            {mode === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                  <CheckCircle2 size={44} className="stroke-[1.5]" />
                </div>
                
                <h3 className="text-2xl font-extrabold text-secondary tracking-tight">
                  Registration Successful!
                </h3>
                
                <p className="text-sm text-secondary/60 mt-3 max-w-sm mx-auto leading-relaxed">
                  Thank you for registering. A welcome confirmation email has been successfully sent to <span className="font-semibold text-secondary">{hospitalForm.email}</span>.
                </p>

                <p className="text-xs text-secondary/40 mt-2">
                  Our onboarding team will contact you shortly.
                </p>

                <button
                  onClick={onClose}
                  className="mt-8 bg-secondary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-secondary/95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
