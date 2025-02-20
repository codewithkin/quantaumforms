'use client';

import { FadeInSection } from '@/components/FadeInSection';

const steps = [
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
];

export function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeInSection>
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent font-oswald">
          3 Simple Steps to Form Perfection
        </h2>
      </FadeInSection>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <FadeInSection
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
          >
            <div className="text-5xl mb-6">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent font-oswald">
              {step.title}
            </h3>
            <p className="text-gray-800 leading-relaxed font-inter">{step.description}</p>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
