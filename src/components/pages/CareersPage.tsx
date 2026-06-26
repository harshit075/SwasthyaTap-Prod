import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Briefcase, MapPin } from 'lucide-react';

function CareersContent() {
  const jobs = [
    { title: 'Senior Software Engineer (NFC & Android)', type: 'Full-time', location: 'Bangalore / Remote', dept: 'Engineering' },
    { title: 'Product Manager (Healthcare Integration)', type: 'Full-time', location: 'Bangalore', dept: 'Product' },
    { title: 'Regional Operations Manager', type: 'Full-time', location: 'Mumbai / Delhi', dept: 'Operations' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      <Navbar />
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,57,70,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(42,157,143,0.02)_0%,transparent_50%)]" />

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 pt-24 pb-16 relative z-10">
        <a href="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </a>
        
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-widest uppercase text-xs border border-primary/20 px-4 py-1.5 rounded-full bg-primary/5 inline-block">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6 mb-6 tracking-tight">
            Build the Future of <span className="text-primary">Emergency Health</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-secondary/70 leading-relaxed">
            Join SwasthyaTap in our mission to protect and empower 140 Crore Indian lives with secure, instant offline-first health identities.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-secondary mb-4">Open Positions</h2>
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-secondary/10 shadow-[0_10px_30px_rgba(29,53,87,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/30 transition-all">
              <div>
                <span className="text-xs font-semibold text-primary/80 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-md">
                  {job.dept}
                </span>
                <h3 className="text-lg font-bold text-secondary mt-2.5">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-secondary/60">
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                </div>
              </div>
              <a href="mailto:careers@swasthyatap.in" className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CareersPage() {
  return (
    <LanguageProvider>
      <CareersContent />
    </LanguageProvider>
  );
}
