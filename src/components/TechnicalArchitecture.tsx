'use client';
import ProcessImage from '@/assests/Process.png';

export default function TechnicalArchitecture() {
  return (
    <section id="technical-architecture" className="py-10 md:py-16 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-extrabold text-secondary tracking-tight">
            Technical Architecture & Process Flow
          </h3>
          <p className="text-sm text-secondary/60 mt-2">
            A deep dive look into the secure SwasthyaTap NFC synchronization lifecycle
          </p>
        </div>
        
        <div className="w-full max-w-7xl bg-white p-4 md:p-6 rounded-3xl shadow-[0_10px_30px_rgba(29,53,87,0.03)] border border-slate-100 flex flex-col items-center">
          <h4 className="font-bold text-secondary mb-6 text-center text-sm tracking-wider uppercase opacity-80">
            Universal Health Identity Sync Flow
          </h4>
          <div className="w-full relative flex justify-center">
            <img
              src={ProcessImage.src || ProcessImage}
              alt="SwasthyaTap complete process flow"
              width={1400}
              height={700}
              className="rounded-2xl shadow-sm object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
