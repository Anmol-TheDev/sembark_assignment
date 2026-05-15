import { getProducts } from "@/features/products/product.action";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col items-start gap-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Featured Products
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover our curated collection of premium products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
