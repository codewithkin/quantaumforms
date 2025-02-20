import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-50 to-orange-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              QuantumForms
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              The next generation AI form builder. Create, customize, and share forms in seconds with the power of artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:bg-clip-text transition-all">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:hello@quantumforms.ai" className="text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:bg-clip-text transition-all">
                  hello@quantumforms.ai
                </a>
              </li>
              <li>
                <a href="https://twitter.com/quantumforms" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  @quantumforms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} QuantumForms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
