'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, Currency, CurrencyConfig } from '@/types';
import { currencies } from '@/data/currencies';

interface CartState {
  items: CartItem[];
  currency: CurrencyConfig;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENCY'; payload: Currency };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: Currency) => void;
  totalItems: number;
  subtotal: number; // in USD cents
}

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CURRENCY': {
      const newCurrency = currencies.find((c) => c.code === action.payload) || currencies[0];
      return { ...state, currency: newCurrency };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    currency: currencies[0],
  });

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('homefood-cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.items?.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item.product });
        if (item.quantity > 1) {
          dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity } });
        }
      });
    }
    const savedCurrency = localStorage.getItem('homefood-currency') as Currency;
    if (savedCurrency) {
      dispatch({ type: 'SET_CURRENCY', payload: savedCurrency });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('homefood-cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem('homefood-currency', state.currency.code);
  }, [state.currency]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        setCurrency: (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency }),
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
