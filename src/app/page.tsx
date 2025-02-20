'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual waitlist signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Stop Wasting Time on Forms—<br className="hidden sm:block" />
          <span className="text-blue-600">Let AI Build Them for You!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Create, Customize & Share Forms in Seconds. Say goodbye to boring, manual form-building.
          Our AI automatically generates your form structure—you just tweak and publish.
        </p>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : '✨ Join Waitlist'}
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-green-600">Thanks for joining! We'll be in touch soon.</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">3 Simple Steps to Form Perfection</h2>
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
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us Over Google Forms?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'AI-Powered Creation', icon: '🤖' },
            { title: 'Beautiful Design', icon: '✨' },
            { title: 'Smart Analytics', icon: '📊' },
            { title: 'Custom Branding', icon: '🎨' },
            { title: 'Drag & Drop Editor', icon: '🎯' },
            { title: 'Real-time Responses', icon: '⚡' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
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
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl my-16 mx-4">
        <h2 className="text-3xl font-bold mb-6">Be First in Line!</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our waitlist today and get priority access, special discounts, and help shape the future of form building.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Joining...' : '🚀 Join Now'}
          </button>
        </form>
      </section>
      </div>
      <Footer />
    </div>
  );
}
