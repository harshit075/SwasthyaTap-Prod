import { LanguageProvider } from '@/i18n/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

function BlogContent() {
  const posts = [
    {
      title: 'How Offline-First NFC is Solving Healthcare Barriers in Rural India',
      excerpt: 'Discover how we bypassed the lack of high-speed internet in remote regions to deliver instant emergency medical profiles to first responders.',
      date: 'June 18, 2026',
      author: 'Aditya Chhipa',
      readTime: '5 min read'
    },
    {
      title: 'The Importance of the "Golden Hour" in Trauma & Emergency Care',
      excerpt: 'Why the first 60 minutes after a medical crisis are the most critical, and how instant health data matches can increase survival rates up to 43%.',
      date: 'May 24, 2026',
      author: 'Harshit Borana',
      readTime: '8 min read'
    },
    {
      title: 'DPDP Act 2023: Setting a New Standard for Healthcare Privacy',
      excerpt: 'A comprehensive guide to how SwasthyaTap complies with India\'s latest personal data protection act through strict local encryption and user consent.',
      date: 'April 15, 2026',
      author: 'SwasthyaTap Privacy Team',
      readTime: '6 min read'
    }
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
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mt-6 mb-6 tracking-tight">
            News &amp; <span className="text-primary">Health Insights</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-secondary/70 leading-relaxed">
            Latest stories, updates, and research from SwasthyaTap about digital healthcare infrastructure and emergency response innovation.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-secondary/10 shadow-[0_15px_40px_rgba(29,53,87,0.03)] hover:border-primary/20 transition-all">
              <div className="flex flex-wrap items-center gap-4 text-xs text-secondary/55 mb-4">
                <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={13} /> By {post.author}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-3 hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-secondary/70 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <span className="text-primary font-semibold hover:text-primary/80 transition-colors cursor-pointer inline-flex items-center gap-1 text-sm">
                Read Full Article →
              </span>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  );
}
