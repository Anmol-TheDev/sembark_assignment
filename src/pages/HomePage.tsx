import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, type Product } from '@/features/products/product.action';
import { ProductCard } from '@/src/components/ProductCard';
import { ProductSort } from '@/src/components/ProductSort';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Featured Products
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground max-w-2xl">
            Discover our curated collection of premium products, designed for quality and style.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ProductSort />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-secondary/20 animate-pulse rounded-none" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl font-semibold">No products found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or sorting.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
