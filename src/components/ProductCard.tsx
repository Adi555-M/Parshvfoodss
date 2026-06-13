import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ChevronDown, CheckCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key | string | number;
  product: Product;
  index: number;
  quantity: number;
  unit: 'KG' | 'GRAM' | 'DOZEN';
  onQuantityChange: (qty: number) => void;
  onUnitChange: (unit: 'KG' | 'GRAM' | 'DOZEN') => void;
}

export default function ProductCard({
  product,
  index,
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
}: ProductCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate live cost
  const liveCost = React.useMemo(() => {
    if (quantity <= 0) return 0;
    if (unit === 'GRAM') {
      return (quantity / 1000) * product.price;
    }
    // Mango KG custom price representation or standard price multiplication
    if (product.id === '5' && unit === 'KG') {
      // Mango price is ₹750/dozen, let's say ₹250/kg
      return quantity * 250;
    }
    return quantity * product.price;
  }, [quantity, unit, product.price, product.id]);

  // Adjust quantity
  const handleIncrement = () => {
    if (quantity === 0) {
      // Default to 1 for KG/DOZEN, and 250 for GRAM
      if (unit === 'GRAM') {
        onQuantityChange(250);
      } else {
        onQuantityChange(1);
      }
    } else {
      if (unit === 'GRAM') {
        onQuantityChange(quantity + 100);
      } else {
        onQuantityChange(quantity + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    if (unit === 'GRAM') {
      const nextQty = quantity - 100;
      onQuantityChange(nextQty <= 0 ? 0 : nextQty);
    } else {
      onQuantityChange(quantity - 1 <= 0 ? 0 : quantity - 1);
    }
  };

  const handleInputChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0) {
      onQuantityChange(0);
    } else {
      onQuantityChange(num);
    }
  };

  // When changing unit, adjust quantity to standard sizes
  const handleUnitSelect = (newUnit: 'KG' | 'GRAM' | 'DOZEN') => {
    onUnitChange(newUnit);
    setIsDropdownOpen(false);
    if (newUnit === 'GRAM') {
      // If was 1 KG, convert to 1000g, else 250g
      onQuantityChange(quantity === 1 ? 1000 : 250);
    } else {
      // If was grams, reset to 1
      if (unit === 'GRAM') {
        onQuantityChange(1);
      }
    }
  };

  // Price label descriptor
  const getPriceLabel = () => {
    if (product.id === '5') {
      return `₹${product.price}/dozen (₹250/kg)`;
    }
    return `₹${product.price}/kg`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
      whileHover={{ y: -4, shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      style={{ backgroundColor: product.bgColor }}
      className="p-5 rounded-3xl border border-[#C8EBC8]/30 flex flex-col justify-between shadow-sm relative transition-all duration-300"
    >
      {/* Badge (Top-Right) */}
      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#2E7D32] px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase shadow-xs">
        {product.badge}
      </span>

      {/* Vegetable Icon Illustration Wrapper */}
      <div className="flex justify-center items-center py-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 3 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center text-4xl sm:text-5xl shadow-sm border border-white/40"
        >
          {product.emoji}
        </motion.div>
      </div>

      {/* Main product identifiers */}
      <div className="text-left w-full mt-2">
        <h3 className="text-xl font-extrabold text-gray-800 leading-snug">
          {product.gujaratiName}
        </h3>
        <p className="text-xs text-gray-500 font-medium lowercase">
          ({product.englishName})
        </p>
        <span className="inline-block mt-1 font-semibold text-sm text-[#2E7D32]">
          {getPriceLabel()}
        </span>
      </div>

      {/* Controls box and Dropdown integration */}
      <div className="mt-5 w-full flex flex-col gap-3">
        <div className="w-full bg-white rounded-2xl px-3 py-2 border border-gray-100 flex items-center justify-between shadow-xs">
          {/* Minus control */}
          <button
            onClick={handleDecrement}
            disabled={quantity === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg font-bold select-none ${
              quantity > 0
                ? 'bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white active:scale-90'
                : 'bg-gray-50 text-gray-300'
            }`}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Core quantity input */}
          <div className="flex-1 px-1 text-center min-w-[50px]">
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full font-bold text-center text-gray-800 text-base bg-transparent border-none outline-none p-0 focus:ring-0"
            />
          </div>

          {/* Plus control */}
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white flex items-center justify-center transition-all text-lg font-bold select-none active:scale-95"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>

          <span className="h-5 w-px bg-gray-200 mx-2" />

          {/* Unit Selector Trigger Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-0.5 font-bold text-[#2E7D32] text-xs uppercase px-1 py-1 rounded-sm hover:bg-green-50 transition-colors"
            >
              {unit} <ChevronDown className="w-3.5 h-3.5 text-green-700 font-bold" />
            </button>

            {/* Float menu for unit select */}
            {isDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-28 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
                {product.availableUnits.map((u) => (
                  <button
                    key={u}
                    onClick={() => handleUnitSelect(u as 'KG' | 'GRAM' | 'DOZEN')}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                      unit === u
                        ? 'bg-[#EAF6EA] text-[#2E7D32]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live dynamic cost block */}
        <div className="flex items-center justify-between text-xs px-1 select-none">
          <span className="text-gray-400 font-semibold tracking-wider">LIVE COST</span>
          <span className="text-base text-[#2E7D32] font-extrabold">
            ₹{liveCost.toFixed(2)}
          </span>
        </div>

        {/* [F] Added to Basket Status indicator */}
        <div className="h-9 relative overflow-hidden">
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute inset-0 bg-white border border-green-200 rounded-full flex items-center justify-center gap-1 text-xs font-bold text-[#2E7D32] shadow-xs cursor-pointer select-none"
              >
                <CheckCheck className="w-4 h-4 text-emerald-500" /> Removed / Added to Basket!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
