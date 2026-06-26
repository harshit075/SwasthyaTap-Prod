import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const stepLabels = ['Email', 'Basic Info', 'Medical', 'Contacts'];

import { LanguageProvider } from '@/i18n/LanguageProvider';

function RegisterContent() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    allergies: '',
    medications: '',
    conditions: '',
    contact1Name: '',
    contact1Phone: '',
    contact2Name: '',
    contact2Phone: '',
  });

  const next = () => setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleCompleteRegistration = async () => {
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...form,
        email,
        contacts: {
          contact1: { name: form.contact1Name, phone: form.contact1Phone },
          contact2: { name: form.contact2Name, phone: form.contact2Phone }
        }
      };

      const response = await fetch('http://localhost:5000/api/register/individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete registration');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 md:p-10 text-center border border-slate-100/90"
        >
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
            <CheckCircle2 size={44} className="stroke-[1.5]" />
          </div>

          <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
            Registration Complete!
          </h2>

          <p className="text-sm text-secondary/60 mt-4 max-w-sm mx-auto leading-relaxed">
            Your emergency health profile has been successfully created. A confirmation welcome email has been sent to <span className="font-semibold text-secondary">{email}</span>.
          </p>

          <button
            onClick={() => window.location.href = '/'}
            className="mt-8 bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary/20"
          >
            Go to Home Screen
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <a href="/" className="flex items-center gap-2 text-secondary mb-8 hover:text-primary transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Home
        </a>

        <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100/80">
          <h1 className="text-2xl font-bold text-secondary mb-1">Get Your SwasthyaTap Card</h1>
          <p className="text-secondary/50 text-xs mb-6">Step {step + 1} of {stepLabels.length}: {stepLabels[step]}</p>

          {/* Progress bar */}
          <div className="flex gap-1 mb-8">
            {stepLabels.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-100'}`} />
            ))}
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-primary text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Email Address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm mt-1.5"
                  />
                </label>
                {!otpSent ? (
                  <button
                    onClick={() => setOtpSent(true)}
                    disabled={email.length < 5 || !email.includes('@')}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/10 hover:bg-primary/95 disabled:opacity-50 transition-all mt-2 cursor-pointer"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <label className="block">
                      <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Enter 6-digit OTP</span>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm mt-1.5"
                        maxLength={6}
                      />
                    </label>
                    <button
                      onClick={next}
                      disabled={otp.length !== 6}
                      className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/10 hover:bg-primary/95 disabled:opacity-50 transition-all mt-2 cursor-pointer"
                    >
                      Verify &amp; Continue
                    </button>
                  </>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Full Name</span>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rahul Sharma" className="mt-1.5 w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Phone Number</span>
                  <div className="flex gap-2 mt-1.5">
                    <span className="bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-xl text-sm font-medium text-secondary/60 flex items-center">+91</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="flex-1 border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                      maxLength={10}
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Blood Group</span>
                  <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="mt-1.5 w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm">
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Allergies</span>
                  <input type="text" value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} placeholder="e.g. Penicillin, Peanuts" className="mt-1.5 w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Current Medications</span>
                  <input type="text" value={form.medications} onChange={(e) => setForm({ ...form, medications: e.target.value })} placeholder="e.g. Metformin 500mg" className="mt-1.5 w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-secondary/70 uppercase tracking-wider">Medical Conditions</span>
                  <input type="text" value={form.conditions} onChange={(e) => setForm({ ...form, conditions: e.target.value })} placeholder="e.g. Diabetes, Asthma" className="mt-1.5 w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-secondary/50">These contacts will be alerted in an emergency</p>
                <div className="space-y-3">
                  <input type="text" value={form.contact1Name} onChange={(e) => setForm({ ...form, contact1Name: e.target.value })} placeholder="Contact 1 Name" className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                  <input type="tel" value={form.contact1Phone} onChange={(e) => setForm({ ...form, contact1Phone: e.target.value })} placeholder="Contact 1 Phone" className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" maxLength={10} />
                  <input type="text" value={form.contact2Name} onChange={(e) => setForm({ ...form, contact2Name: e.target.value })} placeholder="Contact 2 Name" className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" />
                  <input type="tel" value={form.contact2Phone} onChange={(e) => setForm({ ...form, contact2Phone: e.target.value })} placeholder="Contact 2 Phone" className="w-full border border-slate-100 bg-slate-50/30 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm" maxLength={10} />
                </div>
                <button 
                  onClick={handleCompleteRegistration}
                  disabled={loading}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.01] transition-all mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          {step > 0 && step < 3 && (
            <div className="flex justify-between mt-8 pt-4 border-t border-slate-50">
              <button onClick={prev} className="flex items-center gap-1.5 text-xs font-bold text-secondary/40 hover:text-primary transition-colors cursor-pointer">
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={next} className="flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary/95 transition-all cursor-pointer">
                Next <ArrowRight size={14} />
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex justify-start mt-6 pt-4 border-t border-slate-50">
              <button onClick={prev} className="flex items-center gap-1.5 text-xs font-bold text-secondary/40 hover:text-primary transition-colors cursor-pointer">
                <ArrowLeft size={14} /> Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <LanguageProvider>
      <RegisterContent />
    </LanguageProvider>
  );
}
