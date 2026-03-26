export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number; // Base price in USD cents
  category: Category;
  image: string;
  tags: string[];
  weight: string;
  ingredients: string[];
  allergens: string[];
  bestseller?: boolean;
  new?: boolean;
  stock: number;
}

export type Category =
  | 'sweets'
  | 'snacks'
  | 'cookies'
  | 'cakes'
  | 'pickles'
  | 'beverages';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Currency = 'USD' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  flag: string;
  country: string;
  rate: number; // Rate relative to USD
}

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  items: CartItem[];
}
