import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategories } from '@/features/category/getCategorys';
import type { Category } from '@/features/category/getCategorys';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { CartSheet } from './CartSheet';

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSearchParams({ category: String(categoryId) });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">Store</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                data-testid="categoryLink"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <CartSheet />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 sm:h-9 sm:w-9 transition-transform active:scale-95">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6 p-4">
                <Link to="/" className="text-lg font-semibold">
                  Home
                </Link>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    data-testid="categoryLink"
                    className="text-lg font-medium transition-colors hover:text-primary text-left"
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
