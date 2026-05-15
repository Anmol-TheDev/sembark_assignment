'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/features/products/product.action';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Button 
      size="lg" 
      className="rounded-none h-16 text-lg font-bold uppercase tracking-widest gap-3 flex-1"
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="h-5 w-5" />
      Secure Checkout
    </Button>
  );
}
