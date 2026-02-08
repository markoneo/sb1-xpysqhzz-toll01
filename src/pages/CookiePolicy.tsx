import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function CookiePolicy() {
  useEffect(() => { document.title = 'Cookie Policy | TollCalculator.eu'; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p><strong>Last updated:</strong> February 2026</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">What Are Cookies?</h2>
          <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the website owners. Cookies can be "persistent" (remaining on your device for a set period) or "session-based" (deleted when you close your browser).</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">How We Use Cookies</h2>
          <p>TollCalculator.eu uses cookies for the following purposes:</p>

          <h3 className="font-semibold text-gray-800 pt-1">Essential Cookies</h3>
          <p>These cookies are necessary for the basic functioning of the website. They do not collect personal information and cannot be disabled.</p>

          <h3 className="font-semibold text-gray-800 pt-1">Analytics Cookies (Google Analytics)</h3>
          <p>We use Google Analytics to understand how visitors interact with our website. These cookies collect information such as the number of visitors, which pages are visited most often, and how users navigate the site. This data is aggregated and anonymized. Google Analytics cookies include: _ga, _ga_*, _gid.</p>

          <h3 className="font-semibold text-gray-800 pt-1">Advertising Cookies (Google AdSense)</h3>
          <p>Google AdSense may place cookies on your device to serve relevant advertisements. These cookies allow Google and its partners to serve ads based on your visit to this site and other websites. Advertising cookies may include tracking cookies from Google and its advertising partners.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Managing Cookies</h2>
          <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling certain cookies may affect the functionality of this website.</p>
          <p>You can also opt out of personalized advertising by visiting:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a></li>
            <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Digital Advertising Alliance Opt-Out</a></li>
            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Your Online Choices (EU)</a></li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Third-Party Cookies</h2>
          <p>Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. For more information, refer to the privacy policies of the respective third parties, including <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google's Cookie Policy</a>.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Changes to This Policy</h2>
          <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Contact</h2>
          <p>If you have questions about our use of cookies, please visit our <Link href="/contact" className="text-blue-600 underline">Contact</Link> page.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
