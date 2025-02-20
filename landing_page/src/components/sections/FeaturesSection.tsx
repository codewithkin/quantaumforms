'use client';

import { FadeInSection } from '@/components/FadeInSection';
import { Bot, Sparkles, BarChart3, Palette, DragDropHorizontal, Zap } from 'lucide-react';

const features = [
  { title: 'AI-Powered Creation', icon: Bot },
  { title: 'Beautiful Design', icon: Sparkles },
  { title: 'Smart Analytics', icon: BarChart3 },
  { title: 'Custom Branding', icon: Palette },
  { title: 'Drag & Drop Editor', icon: DragDropHorizontal },
  { title: 'Real-time Responses', icon: Zap }
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-purple-100 to-orange-50">
      <FadeInSection>
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent font-oswald">
          Why Choose Us Over Google Forms?
        </h2>
      </FadeInSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {features.map((feature, index) => (
          <FadeInSection
            key={index}
            className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <feature.icon size={24} className="text-purple-600" />
            <h3 className="font-semibold font-oswald">{feature.title}</h3>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
