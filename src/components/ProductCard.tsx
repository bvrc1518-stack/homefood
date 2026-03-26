'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/currencies';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, currency } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-warm-100">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-warm-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.bestseller && (
              <span className="bg-brand-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Bestseller
              </span>
            )}
            {product.new && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-warm-900 text-sm leading-snug group-hover:text-brand-600 transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-warm-500 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3 h-3 fill-brand-400 text-brand-400" />
            ))}
            <span className="text-xs text-warm-400 ml-1">(4.8)</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-warm-900">
                {formatPrice(product.price, currency)}
              </span>
              <span className="text-xs text-warm-400 ml-1">{product.weight}</span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-500 hover:bg-brand-600 text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
