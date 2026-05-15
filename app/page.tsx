import { getProducts, getProductsByCategory } from "@/features/products/product.action";
import { ProductCard } from "@/components/ProductCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryId } = await searchParams;
  
  const products = categoryId 
    ? await getProductsByCategory(categoryId) 
    : await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col items-start gap-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl uppercase">
          {categoryId ? "Filtered Results" : "Featured Products"}
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          {categoryId 
            ? `Showing products for the selected category.` 
            : "Discover our curated collection of premium products."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">No products found</h2>
          <p className="text-muted-foreground">Try selecting a different category or view all products.</p>
        </div>
      )}
    </div>
  );
}
