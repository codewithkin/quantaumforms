'use client';

import { FadeInSection } from '@/components/FadeInSection';

const faqs = [
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
];

export function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeInSection>
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent font-oswald">
          Frequently Asked Questions
        </h2>
      </FadeInSection>
      <div className="max-w-3xl mx-auto space-y-6 mt-8">
        {faqs.map((faq, index) => (
          <FadeInSection
            key={index}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <h3 className="font-semibold text-lg mb-2 font-oswald">{faq.q}</h3>
            <p className="text-gray-800 font-inter">{faq.a}</p>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
