'use client';

import { Input } from '@/components/ui/input';
import { FadeInSection } from '@/components/FadeInSection';
import { useState } from 'react';

export function HeroSection() {
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
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 h-12 px-6 text-base rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 h-12 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-orange-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-green-600">Thanks for joining! We'll be in touch soon.</p>
        )}
      </div>
    </header>
  );
}
