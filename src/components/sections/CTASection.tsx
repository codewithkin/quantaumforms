'use client';

import { FadeInSection } from '@/components/FadeInSection';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual waitlist signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-2xl my-16 mx-4 shadow-xl">
      <FadeInSection>
        <h2 className="text-3xl font-bold mb-6">Be First in Line!</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our waitlist today and get priority access, special discounts, and help shape the future of form building.
        </p>
      </FadeInSection>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-8">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 h-12 px-6 text-base rounded-full border-white/20 bg-white/10 text-white placeholder-white/70 focus-visible:ring-white/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 h-12 bg-white text-orange-600 rounded-full font-semibold hover:bg-slate-200 transition-all disabled:opacity-50 border-2 border-white hover:border-opacity-50"
        >
          {isSubmitting ? 'Joining...' : '🚀 Join Now'}
        </button>
      </form>
    </section>
  );
}
