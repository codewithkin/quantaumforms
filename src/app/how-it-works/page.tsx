'use client';

import { Bot, Sparkles, Wand2, PenTool, Share2, BarChart3 } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';
import { CTASection } from '@/components/sections/CTASection';

const steps = [
  {
    title: 'Describe Your Form',
    description: 'Start by telling our AI what kind of form you need. Use natural language to describe your requirements, and watch as our AI understands and plans your form structure.',
    icon: Bot,
    details: [
      'Natural language form description',
      'AI-powered understanding',
      'Smart field suggestions',
      'Automatic validation rules'
    ]
  },
  {
    title: 'AI Generates Your Form',
    description: 'Our advanced AI instantly generates a complete form structure based on your description, including all necessary fields, validations, and logic.',
    icon: Wand2,
    details: [
      'Instant form generation',
      'Smart field organization',
      'Built-in validation logic',
      'Conditional fields setup'
    ]
  },
  {
    title: 'Customize & Design',
    description: 'Fine-tune your form with our intuitive drag-and-drop editor. Customize the design, add your branding, and make it pixel-perfect.',
    icon: PenTool,
    details: [
      'Drag-and-drop interface',
      'Custom branding options',
      'Theme customization',
      'Mobile optimization'
    ]
  },
  {
    title: 'Share & Collect',
    description: 'Deploy your form instantly with a shareable link or embed it on your website. Start collecting responses and analyzing the data.',
    icon: Share2,
    details: [
      'One-click deployment',
      'Embeddable forms',
      'Social sharing',
      'Real-time collection'
    ]
  },
  {
    title: 'Analyze & Optimize',
    description: 'Track form performance, analyze submission patterns, and optimize your form based on real user data and AI insights.',
    icon: BarChart3,
    details: [
      'Real-time analytics',
      'Performance metrics',
      'User behavior insights',
      'AI-powered suggestions'
    ]
  }
];

export default function HowItWorksPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-oswald bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            How QuantumForms Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            Create perfect forms in minutes with our AI-powered platform. Here's how it works.
          </p>
        </FadeInSection>
      </section>

      {/* Steps Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-24">
          {steps.map((step, index) => (
            <FadeInSection
              key={step.title}
              className="relative"
            >
              {/* Step number */}
              <div className="absolute -left-4 sm:-left-8 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>

              {/* Content */}
              <div className="ml-12 sm:ml-16">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {/* Text content */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4 font-oswald bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 font-inter">
                      {step.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700 font-inter">
                          <Sparkles className="w-5 h-5 text-purple-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Icon */}
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500/10 to-orange-500/10 flex items-center justify-center">
                      <step.icon strokeWidth={1.3} className="w-16 h-16 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1 sm:left-2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-orange-500" />
              )}
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
