import React from 'react';
import { Search, Clock } from 'lucide-react';

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
}: SearchFilterProps) {
  return (
    <section className="px-4 py-4 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto flex flex-col gap-4.5 select-none">
      {/* Search Input Box (Square edges) */}
      <div className="relative w-full">
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
          className="w-full bg-white text-gray-800 pl-11 pr-4 py-3 rounded-none text-sm border-2 border-gray-300 outline-none focus:border-[#2E7D32] focus:ring-0 shadow-sm transition-all placeholder:text-gray-400 font-bold"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-red-500 hover:text-red-700 font-extrabold active:scale-95 cursor-pointer"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Clock Banner Header info card (Square edges) */}
      <div className="w-full bg-[#EAF6EA] border-2 border-green-200 p-4 flex items-start gap-3 shadow-xs select-none rounded-none">
        <Clock className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-sm font-black text-gray-800 leading-tight uppercase tracking-wider">
            Today's Fresh Selection
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-1.5 leading-relaxed">
            Prices and availability are updated daily at 4AM directly from Surat wholesale farm markets.
          </p>
        </div>
      </div>
    </section>
  );
}
