import { getProducts } from "@/features/products/product.action";
import { ProductCard } from "@/components/ProductCard";
import { ProductSort } from "@/components/ProductSort";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const products = await getProducts();
  const { sort } = await searchParams;

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
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
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our curated collection of premium products, designed for
            quality and style.
          </p>
        </div>
        <ProductSort />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3 ">
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
    </div>
  );
}
