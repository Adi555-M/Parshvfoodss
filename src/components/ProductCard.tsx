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
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
}: ProductCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [lastAction, setLastAction] = React.useState<'added' | 'removed' | null>(null);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const prevQuantityRef = React.useRef(quantity);

  // Manage Added / Removed from basket status indicator
  React.useEffect(() => {
    if (quantity > prevQuantityRef.current) {
      setLastAction('added');
      setShowIndicator(true);
    } else if (quantity < prevQuantityRef.current) {
      setLastAction('removed');
      setShowIndicator(true);
      const timer = setTimeout(() => {
        if (quantity === 0) {
          setShowIndicator(false);
        } else {
          setLastAction('added');
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else if (quantity > 0) {
      setLastAction('added');
      setShowIndicator(true);
    } else {
      setShowIndicator(false);
    }
    prevQuantityRef.current = quantity;
  }, [quantity]);

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
    if (product.id === '5' && unit === 'KG') {
      return quantity * 250;
    }
    return quantity * product.price;
  }, [quantity, unit, product.price, product.id]);

  // Adjust quantity increment/decrement
  const handleIncrement = () => {
    if (quantity === 0) {
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

  // Unit changes helper
  const handleUnitSelect = (newUnit: 'KG' | 'GRAM' | 'DOZEN') => {
    onUnitChange(newUnit);
    setIsDropdownOpen(false);
    if (newUnit === 'GRAM') {
      onQuantityChange(quantity === 1 ? 1000 : 250);
    } else {
      if (unit === 'GRAM') {
        onQuantityChange(1);
      }
    }
  };

  const getPriceLabel = () => {
    if (product.id === '5') {
      return `₹${product.price}/dozen (₹250/kg)`;
    }
    return `₹${product.price}/kg`;
  };

  return (
    <div
      style={{ backgroundColor: product.bgColor }}
      className="p-5 rounded-none border-2 border-gray-300 flex flex-col justify-between shadow-xs w-full h-full relative overflow-hidden transition-all duration-300 hover:shadow-md select-none"
    >
      {/* Badge (Top-Right) */}
      <span className="absolute top-4 right-4 bg-white border border-gray-300 text-[#2E7D32] px-2 py-0.5 rounded-none text-[8px] font-black tracking-wider uppercase shadow-xs">
        {product.badge}
      </span>

      {/* Vegetable Icon Illustration Wrapper (Square styled Stamps) */}
      <div className="flex justify-center items-center py-5">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="w-20 h-20 sm:w-22 sm:h-22 rounded-none bg-white flex items-center justify-center text-4xl sm:text-5xl shadow-sm border border-gray-300"
        >
          {product.emoji}
        </motion.div>
      </div>

      {/* Main product identifiers - min-h guarantees alignment across grids */}
      <div className="text-left w-full mt-1 min-h-[76px] flex flex-col justify-end">
        <h3 className="text-lg font-black text-gray-800 leading-none">
          {product.gujaratiName}
        </h3>
        <p className="text-[11px] text-gray-500 font-extrabold lowercase mt-1">
          ({product.englishName})
        </p>
        <span className="inline-block mt-2 font-black text-xs text-[#2E7D32] uppercase tracking-wide">
          {getPriceLabel()}
        </span>
      </div>

      {/* Controls box (strictly square borders) */}
      <div className="mt-4 w-full flex flex-col gap-2.5">
        <div className="w-full bg-white rounded-none px-2 py-1.5 border-2 border-gray-400 flex items-center justify-between shadow-xs">
          {/* Minus control */}
          <button
            onClick={handleDecrement}
            disabled={quantity === 0}
            className={`w-8 h-8 rounded-none border border-gray-300 flex items-center justify-center transition-colors text-base font-black select-none ${
              quantity > 0
                ? 'bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white active:scale-95'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Core quantity input */}
          <div className="flex-1 px-1 text-center min-w-[50px]">
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full font-black text-center text-gray-800 text-sm bg-transparent border-none outline-none p-0 focus:ring-0"
            />
          </div>

          {/* Plus control */}
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-none border border-gray-300 bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white flex items-center justify-center transition-all text-base font-black select-none active:scale-95"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          <span className="h-5 w-px bg-gray-200 mx-1.5" />

          {/* Unit Selector Trigger Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-0.5 font-black text-[#2E7D32] text-[11px] uppercase px-1 py-1 rounded-none hover:bg-green-50 transition-colors border border-green-700/20"
            >
              {unit} <ChevronDown className="w-3 h-3 text-green-700 font-bold" />
            </button>

            {/* Float menu for unit select */}
            {isDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-1 w-28 bg-white border-2 border-gray-300 rounded-none shadow-lg z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
                {product.availableUnits.map((u) => (
                  <button
                    key={u}
                    onClick={() => handleUnitSelect(u as 'KG' | 'GRAM' | 'DOZEN')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold capitalize transition-colors rounded-none ${
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
        <div className="flex items-center justify-between text-xs px-1 select-none font-bold">
          <span className="text-gray-400 font-black tracking-wider uppercase text-[9px]">LIVE COST</span>
          <span className="text-sm text-[#2E7D32] font-black">
            ₹{liveCost.toFixed(2)}
          </span>
        </div>

        {/* Expands smoothly ONLY when active to maintain layout consistency */}
        <AnimatePresence initial={false}>
          {showIndicator && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 32, opacity: 1, marginTop: 10 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden w-full h-8"
            >
              {lastAction === 'added' ? (
                <div className="absolute inset-0 bg-white border border-green-300 rounded-none flex items-center justify-center gap-1.5 text-xs font-black text-[#2E7D32] shadow-xs select-none uppercase tracking-wide">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> Added!
                </div>
              ) : lastAction === 'removed' ? (
                <div className="absolute inset-0 bg-white border border-red-300 rounded-none flex items-center justify-center gap-1.5 text-xs font-black text-red-600 shadow-xs select-none uppercase tracking-wide">
                  <Minus className="w-3.5 h-3.5 text-red-400" /> Removed!
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
