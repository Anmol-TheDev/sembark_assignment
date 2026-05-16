import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, type Product } from '@/features/products/product.action';
import { ProductCard } from '@/src/components/ProductCard';
import { ProductSort } from '@/src/components/ProductSort';
import { ProductCardSkeleton } from '@/src/components/Skeleton';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

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
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
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
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="products"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3">
              {sortedProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {sortedProducts.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-20 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-2xl font-semibold">No products found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or sorting.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
