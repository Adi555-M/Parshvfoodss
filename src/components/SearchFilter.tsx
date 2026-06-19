import { Search, Clock, Leaf } from 'lucide-react';
import { CATEGORIES } from '../data';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: SearchFilterProps) {
  return (
    <section className="px-4 py-4 max-w-7xl mx-auto flex flex-col gap-4">
      {/* Search Input Box */}
      <div className="relative w-full max-w-md mx-auto">
        <label htmlFor="veg-search-input" className="sr-only">Search vegetable name</label>
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          id="veg-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vegetables..."
          className="w-full bg-white text-gray-800 pl-11 pr-4 py-3 rounded-full text-sm border border-gray-200 outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] shadow-sm transition-all placeholder:text-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-gray-600 font-medium active:scale-95"
          >
            Clear
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Filter Chips row */}
      <div className="w-full flex flex-col gap-2 relative">
        <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">
          <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" /> Filter By Category:
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs sm:text-xs font-semibold tracking-wide transition-all duration-250 cursor-pointer active:scale-95 border ${
                  isActive
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* [E] Clock Banner Header info card */}
      <div className="w-full bg-[#EAF6EA] border border-green-200 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm select-none">
        <Clock className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-sm font-semibold text-gray-800 leading-tight">
            Today's Fresh Selection
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Prices and availability are updated daily at 4AM directly from Surat wholesale farm markets.
          </p>
        </div>
      </div>
    </section>
  );
}
