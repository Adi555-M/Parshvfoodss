import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ChevronDown, CheckCheck, RefreshCw } from 'lucide-react';
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
  const [isFlipped, setIsFlipped] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [lastAction, setLastAction] = React.useState<'added' | 'removed' | null>(null);
  const [showIndicator, setShowIndicator] = React.useState(false);
  const prevQuantityRef = React.useRef(quantity);

  // Auto-flip every 10 seconds to show health benefits, staggered by card index
  React.useEffect(() => {
    // 200ms stagger delay so not all cards rotate at the same millisecond
    const staggerTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        // Only trigger auto-flip if user isn't actively adjusting a quantity
        if (quantity === 0) {
          setIsFlipped(true);
          const flipBackTimeout = setTimeout(() => {
            setIsFlipped(false);
          }, 3500); // stay flipped for 3.5 seconds showing benefits
          
          return () => clearTimeout(flipBackTimeout);
        }
      }, 10000); // every 10 seconds spent on site

      return () => clearInterval(interval);
    }, index * 250);

    return () => clearTimeout(staggerTimeout);
  }, [index, quantity]);

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
      // Mango price model representation
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

  // Flip triggers
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking a button, dropdown or input, prevent flip
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('.dropdown-trigger') ||
      target.closest('.no-flip')
    ) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-full h-full perspective-1000 select-none cursor-pointer relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* FRONT FACE OF THE CARD */}
        <div
          style={{ 
            backgroundColor: product.bgColor,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          className="p-5 rounded-3xl border border-gray-200/90 flex flex-col justify-between shadow-xs w-full h-full relative overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          {/* Badge (Top-Right) */}
          <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-[#2E7D32] px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase shadow-xs select-none">
            {product.badge}
          </span>

          {/* Vegetable Icon Illustration Wrapper */}
          <div className="flex justify-center items-center py-5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center text-4xl sm:text-5xl shadow-xs border border-white/40"
            >
              {product.emoji}
            </motion.div>
          </div>

          {/* Main product identifiers - min-h guarantees alignment across grids */}
          <div className="text-left w-full mt-1 min-h-[76px] flex flex-col justify-end">
            <h3 className="text-xl font-extrabold text-gray-800 leading-none">
              {product.gujaratiName}
            </h3>
            <p className="text-xs text-gray-500 font-medium lowercase mt-1">
              ({product.englishName})
            </p>
            <span className="inline-block mt-2 font-bold text-sm text-[#2E7D32]">
              {getPriceLabel()}
            </span>
          </div>

          {/* Controls box and Dropdown integration */}
          <div className="mt-4 w-full flex flex-col gap-2.5">
            <div className="w-full bg-white rounded-2xl px-3 py-1.5 border border-gray-100 flex items-center justify-between shadow-xs no-flip">
              {/* Minus control */}
              <button
                onClick={handleDecrement}
                disabled={quantity === 0}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg font-bold select-none ${
                  quantity > 0
                    ? 'bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white active:scale-90'
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
                  className="w-full font-extrabold text-center text-gray-800 text-base bg-transparent border-none outline-none p-0 focus:ring-0"
                />
              </div>

              {/* Plus control */}
              <button
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-[#2E7D32] hover:text-white flex items-center justify-center transition-all text-lg font-bold select-none active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              <span className="h-5 w-px bg-gray-200 mx-2" />

              {/* Unit Selector Trigger Dropdown */}
              <div ref={dropdownRef} className="relative dropdown-trigger">
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
              <span className="text-gray-400 font-bold tracking-wider uppercase text-[10px]">LIVE COST</span>
              <span className="text-base text-[#2E7D32] font-black">
                ₹{liveCost.toFixed(2)}
              </span>
            </div>

            {/* Expands smoothly ONLY when active to maintain compact layout alignment */}
            <AnimatePresence initial={false}>
              {showIndicator && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 36, opacity: 1, marginTop: 10 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative overflow-hidden w-full h-9"
                >
                  {lastAction === 'added' ? (
                    <div className="absolute inset-0 bg-white border border-green-200 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-[#2E7D32] shadow-xs select-none">
                      <CheckCheck className="w-4 h-4 text-emerald-500" /> Added to Basket!
                    </div>
                  ) : lastAction === 'removed' ? (
                    <div className="absolute inset-0 bg-white border border-red-100 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 shadow-xs select-none">
                      <Minus className="w-4 h-4 text-red-400" /> Removed!
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BACK FACE OF THE CARD WITH HEALTH BENEFITS */}
        <div
          style={{ 
            backgroundColor: '#1E4620', // Premium dark green back banner
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 w-full h-full rounded-3xl border border-emerald-800 text-white flex flex-col justify-between p-5 shadow-xs overflow-hidden select-none"
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center text-[9px] font-extrabold tracking-widest text-emerald-200/90 uppercase">
            <span>Health Wisdom</span>
            <span className="bg-emerald-800 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
              100% Pure
            </span>
          </div>

          {/* Core content block */}
          <div className="my-auto py-2 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-xs border border-white/5 mb-3.5">
              {product.emoji}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-wide">
              {product.gujaratiName}
            </h3>
            
            <p className="text-xs text-emerald-200/90 font-medium italic lowercase">
              ({product.englishName})
            </p>

            <div className="mt-4 px-1 text-center">
              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider block mb-1">Benefit</span>
              <p className="text-xs sm:text-sm font-bold text-emerald-50 leading-relaxed">
                {product.benefit || 'Rich in essential vitamins, minerals, and dietary fibers for vital daily strength.'}
              </p>
            </div>
          </div>

          {/* Touch-to-flip indicator */}
          <div className="w-full text-[9px] text-emerald-300/80 font-bold flex items-center justify-center gap-1.5 pt-2.5 border-t border-white/5 uppercase tracking-wider">
            <RefreshCw className="w-3 h-3 text-emerald-400 rotate-12 animate-spin-slow" />
            <span className="animate-pulse">Tap anywhere to flip back</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
