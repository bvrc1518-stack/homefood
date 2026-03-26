import Link from 'next/link';
import { Cookie, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-500 rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">HomeFood</span>
                <span className="block text-[10px] text-warm-400 leading-none -mt-0.5">Artisan Kitchen</span>
              </div>
            </div>
            <p className="text-sm text-warm-400 leading-relaxed">
              Handcrafted sweets, snacks & more — made with love and delivered to your door across USA, UK & India.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-warm-400">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/products?category=sweets', label: 'Sweets' },
                { href: '/products?category=snacks', label: 'Snacks' },
                { href: '/products?category=cookies', label: 'Cookies' },
                { href: '/products?category=cakes', label: 'Cakes' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-warm-400">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/about#story', label: 'Our Story' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns Policy' },
                { href: '/faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-warm-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>hello@homefoodartisan.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>+1 (888) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>Ships to USA 🇺🇸 · UK 🇬🇧 · India 🇮🇳</span>
              </li>
            </ul>

            {/* Payment badges */}
            <div className="mt-5">
              <p className="text-xs text-warm-500 mb-2">Secure payments via</p>
              <div className="flex gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'Amex', 'UPI'].map((p) => (
                  <span
                    key={p}
                    className="px-2 py-1 bg-warm-800 text-warm-300 text-xs rounded border border-warm-700"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-warm-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-warm-500">
          <p>© {new Date().getFullYear()} HomeFood Artisan Kitchen. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
