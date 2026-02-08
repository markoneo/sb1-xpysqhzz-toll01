import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function PrivacyPolicy() {
  useEffect(() => { document.title = 'Privacy Policy | TollCalculator.eu'; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">1. Who We Are</h2>
          <p>TollCalculator.eu is a free online tool that helps travelers estimate road toll, vignette, and tunnel costs for driving in Europe. The website is operated from Europe.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">2. What Data We Collect</h2>
          <p>We do not require user accounts or registration. When you use our calculator, the start and destination addresses you enter are processed by the Google Maps API to calculate your route. We do not store your addresses or route data on our servers.</p>
          <p>We may automatically collect certain technical information through cookies and analytics tools, such as your IP address, browser type, device type, pages visited, and time spent on the website. This data is collected in anonymized or aggregated form where possible.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">3. How We Use Your Data</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>To provide the toll calculation service via the Google Maps API</li>
            <li>To understand how visitors use the website and improve the user experience</li>
            <li>To serve relevant advertising through Google AdSense</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Google Maps API:</strong> Processes your route data to calculate distances and identify countries along your journey. Subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Privacy Policy</a>.</li>
            <li><strong>Google Analytics:</strong> Collects anonymized usage data to help us understand traffic patterns and improve the website. Uses cookies to track page views and user interactions.</li>
            <li><strong>Google AdSense:</strong> May display advertisements on the website. AdSense uses cookies and similar technologies to serve ads based on prior visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">5. Cookies</h2>
          <p>This website uses cookies. For detailed information about the cookies we use and their purposes, please see our <Link href="/cookies" className="text-blue-600 underline">Cookie Policy</Link>.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">6. Your Rights (GDPR)</h2>
          <p>If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR), including:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>The right to access, update, or delete your personal information</li>
            <li>The right to restrict or object to the processing of your data</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details on our <Link href="/contact" className="text-blue-600 underline">Contact</Link> page.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">7. Data Security</h2>
          <p>We take reasonable technical and organizational measures to protect any data processed through this website. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">9. Contact</h2>
          <p>If you have questions about this Privacy Policy, please visit our <Link href="/contact" className="text-blue-600 underline">Contact</Link> page.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
