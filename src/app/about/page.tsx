import Image from 'next/image';
import Link from 'next/link';
import { Heart, Globe, Award, Users, ArrowRight } from 'lucide-react';

const stats = [
  { value: '2,400+', label: 'Happy Customers' },
  { value: '3', label: 'Countries Served' },
  { value: '12', label: 'Products' },
  { value: '4.8★', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-warm-100 to-brand-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-warm-900 mb-6">
            Made with Love, <span className="text-brand-500">Delivered with Care</span>
          </h1>
          <p className="text-lg text-warm-600 leading-relaxed max-w-2xl mx-auto">
            HomeFood Artisan Kitchen started as a passion project in a small home kitchen. Today, we ship
            handcrafted sweets, snacks, and baked goods to customers across the USA, United Kingdom, and India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-500 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-brand-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
              alt="Home kitchen"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-warm-900 mb-5">Our Story</h2>
            <div className="space-y-4 text-warm-600 leading-relaxed">
              <p>
                It all began with a grandmother&apos;s recipe book, a love for cooking, and countless hours
                spent in the kitchen perfecting traditional sweets and snacks.
              </p>
              <p>
                We noticed that authentic homemade food — the kind you&apos;d find at a relative&apos;s home
                during festivals — was incredibly hard to find. Store-bought alternatives were loaded with
                preservatives and just didn&apos;t taste the same.
              </p>
              <p>
                So we started HomeFood: a small-batch artisan kitchen that celebrates the food traditions
                of India, Britain, and beyond — making them accessible to anyone, anywhere in our three markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-warm-900 text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Made with Love', desc: 'Every product is crafted in small batches by passionate home cooks.' },
              { icon: Award, title: 'Quality First', desc: 'We use only premium, fresh ingredients. No artificial preservatives ever.' },
              { icon: Globe, title: 'Global Reach', desc: 'Bringing authentic flavours to USA, UK and India with every order.' },
              { icon: Users, title: 'Community', desc: 'We source ingredients ethically and support local farmers and suppliers.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-warm-100 text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-warm-900 mb-2">{v.title}</h3>
                <p className="text-sm text-warm-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-warm-900 mb-4">Taste the difference today</h2>
        <p className="text-warm-500 mb-8">Fresh batches prepared weekly. Order before Thursday for weekend delivery.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
