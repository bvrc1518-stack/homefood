'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Star, Shield, Truck, ChefHat, Info } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const { addItem, currency } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'shipping'>('description');

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-warm-400 mb-8">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-brand-600 capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-warm-700">{product.name}</span>
      </div>

      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      {/* Main product section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-warm-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestseller && (
                <span className="bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Bestseller
                </span>
              )}
              {product.new && (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-2">
            <span className="capitalize text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-warm-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-brand-400 text-brand-400" />
              ))}
            </div>
            <span className="text-sm text-warm-500">4.8 (124 reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-warm-900">
              {formatPrice(product.price, currency)}
            </span>
            <span className="text-warm-400 text-sm">{product.weight}</span>
          </div>

          <p className="text-warm-600 leading-relaxed mb-8">{product.longDescription}</p>

          {/* Allergens */}
          {product.allergens.length > 0 && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-medium text-amber-800">Contains: </span>
                <span className="text-amber-700">{product.allergens.join(', ')}</span>
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-warm-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-warm-600 hover:bg-warm-50 transition-colors font-semibold"
              >
                −
              </button>
              <span className="px-4 py-3 font-semibold text-warm-900 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-3 text-warm-600 hover:bg-warm-50 transition-colors font-semibold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-500 hover:bg-brand-600 text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {product.stock <= 10 && (
            <p className="text-sm text-red-500 mb-6">
              Only {product.stock} left in stock — order soon!
            </p>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: ChefHat, label: 'Freshly Made' },
              { icon: Truck, label: 'Fast Shipping' },
              { icon: Shield, label: 'Secure Payment' },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 bg-warm-50 rounded-xl border border-warm-100 text-center">
                <b.icon className="w-5 h-5 text-brand-500" />
                <span className="text-xs font-medium text-warm-600">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-warm-200 mb-6">
        <div className="flex gap-6">
          {(['description', 'ingredients', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-warm-500 hover:text-warm-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-16">
        {activeTab === 'description' && (
          <div className="prose prose-warm max-w-none">
            <p className="text-warm-600 leading-relaxed">{product.longDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-warm-100 text-warm-600 text-xs rounded-full capitalize">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div>
            <h3 className="font-semibold text-warm-800 mb-3">Ingredients</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {product.ingredients.map((ing) => (
                <li key={ing} className="flex items-center gap-2 text-sm text-warm-600">
                  <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                  {ing}
                </li>
              ))}
            </ul>
            {product.allergens.length > 0 && (
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm font-semibold text-amber-800 mb-1">Allergen Information</p>
                <p className="text-sm text-amber-700">Contains: {product.allergens.join(', ')}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 text-sm text-warm-600">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { flag: '🇺🇸', country: 'USA', time: '3–5 business days', free: '$50' },
                { flag: '🇬🇧', country: 'United Kingdom', time: '4–7 business days', free: '£40' },
                { flag: '🇮🇳', country: 'India', time: '2–4 business days', free: '₹3,500' },
              ].map((s) => (
                <div key={s.country} className="p-4 bg-warm-50 rounded-xl border border-warm-100">
                  <p className="text-2xl mb-2">{s.flag}</p>
                  <p className="font-semibold text-warm-800">{s.country}</p>
                  <p className="text-warm-500 mt-1">{s.time}</p>
                  <p className="text-green-600 text-xs mt-2 font-medium">Free shipping over {s.free}</p>
                </div>
              ))}
            </div>
            <p className="text-warm-400 text-xs">
              All orders are carefully packed to maintain freshness. Perishable items are shipped with insulated packaging.
            </p>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-warm-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
