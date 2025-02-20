'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useWaitlist } from '@/context/WaitlistContext';
import { FinalCTA } from '@/components/sections/FinalCTA';

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isJoined, isError, errorMessage, joinWaitlist, clearError } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await joinWaitlist(email);
      setEmail('');
    } catch (error) {
      // Error is handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-16">
      {/* Hero Section */}
      <header className="py-20 md:py-60 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Stop Wasting Time on Forms—<br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Let AI Build Them for You!</span>
        </h1>
        <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
          Create, Customize & Share Forms in Seconds. Say goodbye to boring, manual form-building.
          Our AI automatically generates your form structure—you just tweak and publish.
        </p>
        <div className="max-w-md mx-auto">
          {isJoined ? (
            <div className="animate-fade-in text-2xl font-oswald text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
              You're in! 🎉 We'll see you on launch day!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
              {isError && (
                <div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 py-4 md:py-2 h-12 px-6 text-base rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 md:py-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-orange-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
            </form>
          )}
        </div>
      </header>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">3 Simple Steps to Form Perfection</h2>
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Tell the AI What You Need',
              description: 'Type a simple prompt and watch as AI generates your form structure instantly.',
              icon: '🤖'
            },
            {
              title: 'Customize with Drag & Drop',
              description: 'Easily tweak your form with our intuitive drag-and-drop builder.',
              icon: '🎨'
            },
            {
              title: 'Share & Collect Responses',
              description: 'Get a custom shareable link or embed your form anywhere with real-time analytics.',
              icon: '📊'
            }
          ].map((step, index) => (
            <FadeInSection key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">{step.title}</h3>
              <p className="text-gray-800 leading-relaxed">{step.description}</p>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-purple-100 to-orange-50">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">Why Choose Us Over Google Forms?</h2>
        </FadeInSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[
            { title: 'AI-Powered Creation', icon: '🤖' },
            { title: 'Beautiful Design', icon: '✨' },
            { title: 'Smart Analytics', icon: '📊' },
            { title: 'Custom Branding', icon: '🎨' },
            { title: 'Drag & Drop Editor', icon: '🎯' },
            { title: 'Real-time Responses', icon: '⚡' }
          ].map((feature, index) => (
            <FadeInSection key={index} className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="font-semibold">{feature.title}</h3>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
        </FadeInSection>
        <div className="max-w-3xl mx-auto space-y-6 mt-8">
          {[
            {
              q: 'Is this better than Google Forms?',
              a: 'Absolutely. Google Forms is basic. Our tool lets you automate form creation, customize every detail, and analyze results with powerful insights.'
            },
            {
              q: 'Can I edit the AI-generated form?',
              a: 'Of course! After AI builds the structure, you can add, remove, or tweak anything with our drag-and-drop editor.'
            },
            {
              q: 'What integrations does this support?',
              a: 'Right now, we\'re working on Zapier, Notion, Airtable, and Webhooks. More coming soon!'
            },
            {
              q: 'When will this launch?',
              a: 'We\'re in the final stretch of development. Join the waitlist now to get early access before the public launch!'
            }
          ].map((faq, index) => (
            <FadeInSection key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-800">{faq.a}</p>
            </FadeInSection>
          ))}
        </div>
      </section>

      <FinalCTA />
      </div>
    </div>
  );
}
