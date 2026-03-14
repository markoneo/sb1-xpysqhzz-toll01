import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-white font-semibold mb-3">TollCalculator.eu</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping travelers estimate toll, vignette, and tunnel costs for European road trips.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Calculator</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors" data-testid="link-footer-home">Toll Calculator</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors" data-testid="link-footer-guides">Country Guides</Link></li>
              <li><Link href="/guide/austria" className="hover:text-white transition-colors" data-testid="link-footer-austria">Austria Guide</Link></li>
              <li><Link href="/guide/italy" className="hover:text-white transition-colors" data-testid="link-footer-italy">Italy Guide</Link></li>
              <li><Link href="/guide/france" className="hover:text-white transition-colors" data-testid="link-footer-france">France Guide</Link></li>
              <li><Link href="/guide/switzerland" className="hover:text-white transition-colors" data-testid="link-footer-switzerland">Switzerland Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors" data-testid="link-footer-cookies">Cookie Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors" data-testid="link-footer-terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors" data-testid="link-footer-contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} TollCalculator.eu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
