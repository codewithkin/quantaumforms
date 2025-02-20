'use client';

import { Bot, Sparkles, BarChart3, Palette, DragDropHorizontal, Zap, 
  Brain, Magic, Brush, Lock, Rocket, Share2, Bell, Smartphone, Gauge } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';
import { CTASection } from '@/components/sections/CTASection';

const features = [
  {
    title: 'AI-Powered Form Generation',
    description: 'Simply describe your form in plain English, and watch as our AI instantly generates the perfect form structure.',
    icon: Brain,
    category: 'AI & Automation'
  },
  {
    title: 'Smart Field Suggestions',
    description: 'Our AI suggests relevant fields and validation rules based on your form's purpose.',
    icon: Magic,
    category: 'AI & Automation'
  },
  {
    title: 'Beautiful Templates',
    description: 'Choose from dozens of professionally designed templates or let AI create a custom design.',
    icon: Brush,
    category: 'Design & Customization'
  },
  {
    title: 'Advanced Security',
    description: 'Enterprise-grade security with encryption, CAPTCHA protection, and data privacy controls.',
    icon: Lock,
    category: 'Security & Privacy'
  },
  {
    title: 'Real-time Analytics',
    description: 'Track form performance, completion rates, and user behavior with detailed analytics.',
    icon: BarChart3,
    category: 'Analytics & Insights'
  },
  {
    title: 'Instant Deployment',
    description: 'Deploy your forms instantly with a shareable link or embed them on your website.',
    icon: Rocket,
    category: 'Deployment & Integration'
  },
  {
    title: 'Social Sharing',
    description: 'Share your forms across social media platforms with automatic preview cards.',
    icon: Share2,
    category: 'Deployment & Integration'
  },
  {
    title: 'Smart Notifications',
    description: 'Get instant alerts for form submissions and customize notification rules.',
    icon: Bell,
    category: 'Productivity'
  },
  {
    title: 'Mobile Optimization',
    description: 'Forms automatically adapt to any screen size for perfect mobile experience.',
    icon: Smartphone,
    category: 'Design & Customization'
  },
  {
    title: 'Performance Metrics',
    description: 'Monitor form loading times and optimize performance with built-in tools.',
    icon: Gauge,
    category: 'Analytics & Insights'
  },
  {
    title: 'Custom Branding',
    description: 'Add your logo, colors, and brand elements to create consistent brand experience.',
    icon: Palette,
    category: 'Design & Customization'
  },
  {
    title: 'Drag & Drop Editor',
    description: 'Fine-tune your forms with an intuitive drag-and-drop interface.',
    icon: DragDropHorizontal,
    category: 'Design & Customization'
  }
];

const categories = Array.from(new Set(features.map(f => f.category)));

export default function FeaturesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-oswald bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Powerful Features for Modern Form Building
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Discover all the powerful features that make QuantumForms the most advanced AI-powered form builder.
          </p>
        </FadeInSection>
      </section>

      {/* Features Grid */}
      {categories.map((category, categoryIndex) => (
        <section key={category} className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-12 font-oswald text-center bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              {category}
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features
              .filter(feature => feature.category === category)
              .map((feature, index) => (
                <FadeInSection
                  key={feature.title}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 font-oswald">{feature.title}</h3>
                      <p className="text-gray-600 font-inter">{feature.description}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
