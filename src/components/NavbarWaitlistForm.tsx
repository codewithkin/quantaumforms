'use client';

import { useState } from 'react';
import { useWaitlist } from '@/context/WaitlistContext';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export function NavbarWaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isJoined, joinWaitlist } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await joinWaitlist(email);
    setIsSubmitting(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="px-6 h-10 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl">
          Join Waitlist
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        {isJoined ? (
          <div className="animate-fade-in text-xl font-oswald text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 text-center py-2">
            You're in! 🎉 We'll see you on launch day!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="font-semibold font-oswald text-lg">Join Our Waitlist</div>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : '🚀 Join Now'}
            </button>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
}
