'use client';

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SafeImage } from '@/components/SafeImage';
import Link from 'next/link';

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-none border-dashed">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg rounded-none border-l border-dashed">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
            Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>
        {totalItems > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6 mt-6">
              <div className="flex flex-col gap-5">
                {cart.map((item) => (
                  <div key={item.id} className="space-y-4">
                    <div className="flex gap-4">
                      <div className="relative aspect-square h-20 w-20 flex-shrink-0 border border-dashed border-border bg-secondary/20">
                        <SafeImage
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="space-y-1">
                          <h4 className="line-clamp-1 text-sm font-bold uppercase tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs font-bold text-primary">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-dashed border-border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator className="border-dashed" />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total</span>
                <span className="text-2xl font-black tracking-tighter">${totalPrice}</span>
              </div>
              <div className="grid gap-2">
                <Link href="/cart" className="w-full">
                  <Button className="w-full rounded-none h-14 font-bold uppercase tracking-widest" variant="outline">
                    View Full Cart
                  </Button>
                </Link>
                <Button className="w-full rounded-none h-14 font-bold uppercase tracking-widest">
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/20" />
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Your cart is empty
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
