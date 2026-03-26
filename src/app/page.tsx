import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Heart, Star, ChefHat } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const bestsellers = products.filter((p) => p.bestseller);
const newArrivals = products.filter((p) => p.new);

const features = [
  {
    icon: ChefHat,
    title: 'Handcrafted with Love',
    desc: 'Every item is made fresh in small batches using traditional recipes and premium ingredients.',
  },
  {
    icon: Truck,
    title: 'Ships to 3 Countries',
    desc: 'We deliver across USA, United Kingdom, and India with careful packaging to ensure freshness.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'Pay safely with credit/debit cards, UPI, or digital wallets via our Stripe-powered checkout.',
  },
  {
    icon: Heart,
    title: 'Made with Tradition',
    desc: 'Our recipes honor generations of culinary heritage — from Indian mithai to British bakes.',
  },
];

const testimonials = [
  {
    name: 'Priya S.',
    location: 'London, UK',
    text: 'The Kaju Katli is absolutely divine! Tastes just like home. I order every month for my family.',
    rating: 5,
  },
  {
    name: 'James M.',
    location: 'New York, USA',
    text: 'Best shortbread I\'ve ever had. Shipped quickly and arrived perfectly fresh. Will definitely reorder!',
    rating: 5,
  },
  {
    name: 'Anita R.',
    location: 'Mumbai, India',
    text: 'The chocolate brownies are incredible. My kids are obsessed. Love that everything is homemade.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-50 via-warm-100 to-warm-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-warm-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                Fresh batches every week
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-900 leading-tight mb-6">
                Homemade Goodness,
                <span className="text-brand-500"> Delivered</span> to Your Door
              </h1>

              <p className="text-lg text-warm-600 mb-8 leading-relaxed max-w-lg">
                Artisan sweets, snacks & baked treats crafted with traditional recipes and love.
                Shipping to USA 🇺🇸, UK 🇬🇧 and India 🇮🇳.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/products?category=sweets"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-warm-50 text-warm-800 font-semibold px-8 py-3.5 rounded-xl border border-warm-200 transition-colors"
                >
                  View Sweets
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-warm-500">
                <div className="flex -space-x-2">
                  {['bg-brand-400', 'bg-warm-400', 'bg-green-400', 'bg-blue-400'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-white`} />
                  ))}
                </div>
                <span><strong className="text-warm-900">2,400+</strong> happy customers worldwide</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-48 relative shadow-lg mt-8">
                    <Image
                      src="https://images.unsplash.com/photo-1666268834600-52a12c68beb8?w=400&q=80"
                      alt="Gulab Jamun"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-36 relative shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80"
                      alt="Cookies"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-36 relative shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=400&q=80"
                      alt="Brownies"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 relative shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80"
                      alt="Cakes"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="bg-brand-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide text-sm font-medium text-white/90 whitespace-nowrap">
            {[
              { emoji: '🍬', label: 'Sweets', href: '/products?category=sweets' },
              { emoji: '🥨', label: 'Snacks', href: '/products?category=snacks' },
              { emoji: '🍪', label: 'Cookies', href: '/products?category=cookies' },
              { emoji: '🎂', label: 'Cakes', href: '/products?category=cakes' },
              { emoji: '🫙', label: 'Pickles', href: '/products?category=pickles' },
              { emoji: '☕', label: 'Beverages', href: '/products?category=beverages' },
            ].map((c) => (
              <Link key={c.label} href={c.href} className="flex items-center gap-1.5 hover:text-white transition-colors py-1">
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-brand-600 mb-1">Customer Favourites</p>
            <h2 className="font-display text-3xl font-bold text-warm-900">Bestsellers</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-warm-900 mb-3">Why HomeFood?</h2>
            <p className="text-warm-500 max-w-xl mx-auto">
              We&apos;re a small team of passionate home cooks bringing authentic flavors to your table.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-warm-50 border border-warm-100">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-warm-900 mb-2">{f.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Just Landed</p>
              <h2 className="font-display text-3xl font-bold text-warm-900">New Arrivals</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-warm-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Loved Worldwide</h2>
            <p className="text-warm-400">What our customers say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-warm-800 rounded-2xl p-6 border border-warm-700">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-warm-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-warm-500 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-14">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to taste the difference?
          </h2>
          <p className="text-brand-100 mb-8 text-lg">
            Free shipping on orders over $50 / £40 / ₹3,500
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-colors"
          >
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
