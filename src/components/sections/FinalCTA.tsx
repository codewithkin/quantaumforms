'use client';

import { FadeInSection } from '@/components/FadeInSection';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useWaitlist } from '@/context/WaitlistContext';

export function FinalCTA() {
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-2xl my-16 mx-4 shadow-xl">
      <FadeInSection>
        <h2 className="text-3xl font-bold mb-6 font-oswald">Ready to Transform Your Form Building?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto font-inter">
          Join our waitlist today and be among the first to experience the future of form creation.
        </p>
      </FadeInSection>
      <div className="max-w-md mx-auto">
        {isJoined ? (
          <div className="animate-fade-in text-2xl font-oswald">
            You're in! 🎉 We'll see you on launch day!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {isError && (
              <div className="text-white/90 text-sm text-center bg-white/10 py-2 px-4 rounded-lg">
                {errorMessage}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
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
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
