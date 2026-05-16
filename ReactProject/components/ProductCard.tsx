import { Link } from 'react-router-dom';
import { SafeImage } from '@/components/SafeImage';
import type { Product } from '@/features/products/product.action';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} data-testid="productCard">
      <Card className="group overflow-hidden rounded-none border border-dashed border-border bg-background transition-all hover:border-primary pt-0">
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          <SafeImage
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-0 right-0 rounded-none bg-primary px-3 py-1 text-primary-foreground opacity-0 transition-all duration-300 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 border-none">
            {product.category.name}
          </Badge>
        </div>
        <CardContent className="p-2 sm:p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="line-clamp-1 font-bold text-lg uppercase tracking-tight transition-colors group-hover:text-primary">
              {product.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-border/50">
            <span className="text-2xl font-black tracking-tighter">${product.price}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              View Product
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
