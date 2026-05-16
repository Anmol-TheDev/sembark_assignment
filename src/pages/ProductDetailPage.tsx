import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, type Product } from '@/features/products/product.action';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SafeImage } from '@/src/components/SafeImage';
import { AddToCartButton } from '@/src/components/AddToCartButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-secondary/20 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 w-24 bg-secondary/20 animate-pulse" />
            <div className="h-16 w-full bg-secondary/20 animate-pulse" />
            <div className="h-8 w-32 bg-secondary/20 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="block lg:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square overflow-hidden bg-secondary/20 border border-dashed border-border">
                      <SafeImage
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 right-12 flex gap-2">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden bg-secondary/20 border border-dashed border-border transition-all hover:border-primary"
              >
                <SafeImage
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28 self-start">
          <div className="space-y-4">
            <Badge variant="secondary" className="rounded-none px-3 py-1 uppercase tracking-widest text-[10px] font-bold">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
              {product.title}
            </h1>
            <div className="text-3xl font-black tracking-tighter text-primary">
              ${product.price}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              The Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-dashed border-border">
            <AddToCartButton product={product} />
            <Button size="lg" variant="outline" className="rounded-none h-16 text-lg font-bold uppercase tracking-widest">
              Add to Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border border-dashed border-border text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Shipping</div>
              <div className="text-xs font-bold uppercase">Worldwide</div>
            </div>
            <div className="p-4 border border-dashed border-border text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Returns</div>
              <div className="text-xs font-bold uppercase">30 Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
