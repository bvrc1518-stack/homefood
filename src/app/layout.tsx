import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'HomeFood Artisan Kitchen | Homemade Sweets & Snacks',
  description:
    'Handcrafted homemade sweets, snacks, cookies, and more. Shipped to USA, UK & India. Authentic recipes, made fresh with love.',
  keywords: ['homemade sweets', 'artisan snacks', 'Indian sweets', 'cookies', 'online food store'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
