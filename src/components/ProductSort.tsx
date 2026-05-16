import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' },
];

export function ProductSort() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'newest') {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    navigate(`?${params.toString()}`, { replace: false });
  };

  return (
    <div className="relative inline-block w-full sm:w-72">
      <div className="relative group">
        <label htmlFor="product-sort" className="sr-only">Sort products</label>
        <select
          id="product-sort"
          value={currentSort}
          onChange={handleSortChange}
          className="w-full appearance-none bg-background border border-dashed border-border rounded-none px-4 py-4 pr-12 text-xs font-bold uppercase tracking-widest transition-all hover:border-primary focus:outline-none focus:border-primary cursor-pointer"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-background text-foreground py-2">
              SORT BY: {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none transition-transform duration-300 group-hover:translate-y-0.5">
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
