import { useCart } from '@/context/CartContext';
import { Button } from '@/src/components/ui/button';
import { SafeImage } from '@/src/components/SafeImage';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Separator } from '@/src/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Your cart is empty</h1>
        <p className="text-muted-foreground font-medium">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <Button className="rounded-none h-16 px-12 font-bold uppercase tracking-widest text-lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
            Your Cart <span className="text-primary">[{totalItems}]</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Table>
              <TableHeader className="border-b border-dashed border-border pointer-events-none">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[100px] font-bold uppercase tracking-widest text-[10px]">Item</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px] whitespace-normal">Details</TableHead>
                  <TableHead className="text-center font-bold uppercase tracking-widest text-[10px]">Quantity</TableHead>
                  <TableHead className="text-right font-bold uppercase tracking-widest text-[10px]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id} className="border-b border-dashed border-border hover:bg-secondary/5">
                    <TableCell className="py-6">
                      <div className="relative aspect-square h-20 w-20 border border-dashed border-border bg-secondary/20">
                        <SafeImage
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-6 whitespace-normal">
                      <div className="space-y-1 max-w-[200px]">
                        <h3 className="font-bold uppercase tracking-tight text-sm line-clamp-1">{item.title}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest line-clamp-1 text-muted-foreground">
                          {item.category.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-dashed border-border">
                          <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="font-black tracking-tighter text-lg">${item.price * item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-none"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="lg:col-span-4">
            <Card className="rounded-none border-dashed bg-secondary/5 shadow-none sticky top-28">
              <CardHeader className="border-b border-dashed border-border">
                <CardTitle className="text-xl font-black uppercase tracking-tighter">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-[10px]">TBD</span>
                  </div>
                  <Separator className="border-dashed" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-black uppercase tracking-tighter">Grand Total</span>
                    <span className="text-3xl font-black tracking-tighter text-primary">${totalPrice}</span>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <Button className="w-full rounded-none h-16 font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px]">
                    Checkout Now
                  </Button>
                  <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground">
                    Taxes calculated at next step
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
