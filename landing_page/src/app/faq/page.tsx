'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Default FAQs
const defaultFaqs = [
  {
    q: "What makes QuantumForms different from other form builders?",
    a: "QuantumForms uses advanced AI to automatically generate form structures based on natural language descriptions. Unlike traditional form builders, you don't start from scratch - our AI understands your needs and creates a smart foundation that you can customize."
  },
  {
    q: "How accurate is the AI form generation?",
    a: "Our AI has been trained on thousands of forms and can accurately generate appropriate fields and validation rules for most common use cases. You can always fine-tune the generated form to perfectly match your needs."
  },
  {
    q: "Can I customize the design of my forms?",
    a: "Absolutely! While our AI creates the initial structure, you have complete control over the design. Use our drag-and-drop editor to customize layouts, apply your brand colors, add custom CSS, and more."
  },
  {
    q: "Is my form data secure?",
    a: "Yes, security is our top priority. We use enterprise-grade encryption, offer GDPR compliance features, and never share your data with third parties. All form submissions are encrypted and stored securely."
  }
];

type FAQ = {
  q: string;
  a: string;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() && newAnswer.trim()) {
      setFaqs(prev => [...prev, { q: newQuestion, a: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
      setIsDialogOpen(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-oswald bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter mb-8">
            Find answers to common questions about QuantumForms. Have a question that's not answered here?
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl">
                <PlusCircle className="w-5 h-5 mr-2" />
                Ask a Question
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-oswald text-2xl mb-4">Ask Your Question</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddFaq} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Question</label>
                  <Input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Suggested Answer</label>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Provide a suggested answer..."
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-md hover:from-purple-600 hover:to-orange-600"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </FadeInSection>
      </section>

      {/* FAQs Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FadeInSection
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold pr-8">{faq.q}</h3>
                {openFaqs.includes(index) ? (
                  <MinusCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <PlusCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <div
                className={`px-6 pb-4 font-inter text-gray-600 transition-all duration-300 ${
                  openFaqs.includes(index) ? 'block' : 'hidden'
                }`}
              >
                {faq.a}
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTA />
    </main>
  );
}
