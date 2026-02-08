import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Mail, Globe, MapPin } from 'lucide-react';
import { Footer } from '../components/Footer';

export function Contact() {
  useEffect(() => { document.title = 'Contact | TollCalculator.eu'; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Contact</h1>
        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>If you have questions, feedback, or would like to report an issue with the calculator, please reach out using the contact details below.</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Website</p>
                <p>TollCalculator.eu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Country of Operation</p>
                <p>European Union</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p><a href="mailto:info@tollcalculator.eu" className="text-blue-600 underline" data-testid="link-contact-email">info@tollcalculator.eu</a></p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
            <p className="text-sm text-gray-600">We aim to respond to all inquiries within a few business days. For urgent matters related to data privacy or GDPR requests, please include "GDPR" in your email subject line.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
