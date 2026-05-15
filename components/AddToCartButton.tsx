'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/features/products/product.action';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) return;
    
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  return (
    <Button 
      size="lg" 
      disabled={isInCart}
      className={cn(
        "relative overflow-hidden rounded-none h-16 text-lg font-bold uppercase tracking-widest gap-3 flex-1 transition-all duration-300",
        isInCart ? "bg-green-600 hover:bg-green-600 opacity-100 cursor-default" : ""
      )}
      onClick={handleAddToCart}
    >
      <div className={cn(
        "flex items-center gap-3 transition-all duration-300",
        isAdding ? "scale-90 opacity-0" : "scale-100 opacity-100"
      )}>
        <ShoppingCart className="h-5 w-5" />
        {isInCart ? "Already in Cart" : "Secure Checkout"}
      </div>

      {isAdding && (
        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300">
          <Check className="h-6 w-6" />
        </div>
      )}

      {isInCart && !isAdding && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="flex items-center gap-3">
             <Check className="h-5 w-5" />
             Already in Cart
           </div>
        </div>
      )}
    </Button>
  );
}
