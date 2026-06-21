import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Profile } from '../types';

interface CartItemData {
  product: Product;
  quantity: number;
  unit: 'KG' | 'GRAM' | 'DOZEN';
}

interface CartDrawerProps {
  isOpen: boolean;
  cart: Record<string, number>;
  selectedUnits: Record<string, 'KG' | 'GRAM' | 'DOZEN'>;
  products: Product[];
  profile: Profile;
  onClose: () => void;
  onCheckout: () => void;
  onQuantityChange: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

// Crisp inline SVG for WhatsApp icon
const WhatsAppIconSVG = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.84.002-2.63-1.023-5.101-2.883-6.963C16.58 1.94 14.11 .917 11.512.916 6.074.916 1.65 5.328 1.646 10.755c-.002 1.673.438 3.31 1.272 4.757l-.991 3.616 3.72-.974zm13.111-6.175c-.328-.164-1.94-.959-2.241-1.07-.301-.11-.52-.164-.738.164-.219.329-.848 1.07-1.039 1.29-.192.219-.384.246-.712.083-.328-.164-1.385-.511-2.637-1.63-1.01-.902-1.693-2.016-1.892-2.344-.199-.328-.021-.506.142-.669.147-.146.328-.384.493-.575.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.782-1.01-2.44-.266-.64-.537-.54-.738-.551-.192-.01-.41-.01-.628-.01-.219 0-.575.082-.876.411-.301.329-1.15 1.123-1.15 2.738 0 1.616 1.178 3.178 1.342 3.397.164.219 2.317 3.538 5.614 4.962.784.339 1.396.541 1.874.693.788.251 1.505.215 2.073.13.633-.095 1.94-.794 2.214-1.562.274-.767.274-1.423.192-1.561-.082-.138-.219-.22-.602-.383z" />
  </svg>
);

export default function CartDrawer({
  isOpen,
  cart,
  selectedUnits,
  products,
  profile,
  onClose,
  onCheckout,
  onQuantityChange,
  onRemoveItem,
}: CartDrawerProps) {
  // Compute ordered cart items (with quantities > 0)
  const orderItems: CartItemData[] = React.useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const prod = products.find((p) => p.id === id);
        return {
          product: prod!,
          quantity: qty,
          unit: selectedUnits[id] || 'KG',
        };
      })
      .filter((item) => item.product !== undefined);
  }, [cart, selectedUnits, products]);

  // Compute calculated costs
  const getItemCost = (item: CartItemData) => {
    if (item.unit === 'GRAM') {
      return (item.quantity / 1000) * item.product.price;
    }
    // Mango KG pricing custom configuration
    if (item.product.id === '5' && item.unit === 'KG') {
      return item.quantity * 250;
    }
    return item.quantity * item.product.price;
  };

  const itemsTotal = React.useMemo(() => {
    return orderItems.reduce((acc, item) => acc + getItemCost(item), 0);
  }, [orderItems]);

  const deliveryFee = 0; // FREE
  const grandTotal = itemsTotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
      {/* Backdrop overlay background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* [M] Cart Bottom Sheet Drawer Container - COMPLETELY SQUARE */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative w-full max-w-lg bg-white shadow-2xl z-40 max-h-[92vh] overflow-y-auto flex flex-col rounded-none border-t-2 border-gray-400"
      >
        {/* Grey pull slider horizontal bar (square styled) */}
        <div className="w-full flex justify-center py-3 select-none">
          <div className="w-12 h-1.5 bg-gray-205 border border-gray-300" />
        </div>

        {/* Drawer Header with Square Edges */}
        <div className="mx-4 mb-2 bg-[#2E7D32] text-white p-4.5 rounded-none border-2 border-green-800 relative flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 border border-white flex items-center justify-center text-xl shadow-xs rounded-none">
              🧺
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider leading-tight">
                Your Active Vegetables Basket
              </h2>
              <p className="text-[10px] text-white/80 mt-1 uppercase tracking-wide font-black">
                Have {orderItems.length} types of vegetables
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all active:scale-95 cursor-pointer rounded-none"
            aria-label="Close cart basket drawer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* SECTION LABEL */}
        <div className="w-full px-5 py-3 select-none bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-1.5 text-[9px] font-black text-[#2E7D32] tracking-wider uppercase">
            <span>🌿</span> Review Ordered Crops
          </div>
        </div>

        {/* Dynamic content scroll frame with clean square items */}
        <div className="flex-1 px-5 py-4 overflow-y-auto max-h-[40vh] flex flex-col gap-3.5">
          <AnimatePresence initial={false}>
            {orderItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 px-4 text-center text-gray-400 select-none flex flex-col items-center justify-center gap-3"
              >
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center text-[#2E7D32]/85 mb-2 rounded-none">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Your basket is empty!</h3>
                <p className="text-[11px] text-gray-500 max-w-xs mt-0.5 leading-relaxed font-bold">
                  Browse fresh garden produce and tap '+' to add delicious raw crops.
                </p>
              </motion.div>
            ) : (
              orderItems.map((item) => {
                const itemCost = getItemCost(item);
                const priceLabel =
                  item.product.id === '5'
                    ? item.unit === 'KG'
                      ? '₹250/kg'
                      : `₹${item.product.price}/dozen`
                    : `₹${item.product.price}/kg`;

                return (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 rounded-none transition-colors"
                  >
                    {/* Left details */}
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                      <div
                        style={{ backgroundColor: item.product.bgColor }}
                        className="w-11 h-11 border border-gray-300 flex items-center justify-center text-xl shadow-xs flex-shrink-0 rounded-none"
                      >
                        {item.product.emoji}
                      </div>
                      <div className="text-left truncate">
                        <h4 className="text-xs font-black text-gray-800 leading-tight uppercase">
                          {item.product.gujaratiName}
                        </h4>
                        <span className="text-[10px] text-gray-500 block lowercase mt-0.5 font-bold">
                          ({item.product.englishName})
                        </span>
                        <span className="text-[9px] text-[#2E7D32] block font-black mt-1 uppercase tracking-wide bg-white border border-[#2E7D32]/10 px-1 py-0.5 self-start inline-block">
                          {item.quantity} {item.unit} @ {priceLabel}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Adjustment Controls + Trash */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="bg-white border-2 border-gray-400 py-1 px-1 flex items-center gap-1.5 shadow-xs rounded-none">
                        {/* Decrement */}
                        <button
                          onClick={() => {
                            const step = item.unit === 'GRAM' ? 100 : 1;
                            const nextVal = item.quantity - step;
                            if (nextVal <= 0) {
                              onRemoveItem(item.product.id);
                            } else {
                              onQuantityChange(item.product.id, nextVal);
                            }
                          }}
                          className="w-6 h-6 border border-gray-300 bg-gray-50 hover:bg-red-50 hover:text-red-650 flex items-center justify-center transition-colors text-xs font-black rounded-none cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-xs font-black text-gray-850 min-w-8 text-center font-mono">
                          {item.quantity}
                        </span>

                        {/* Increment */}
                        <button
                          onClick={() => {
                            const step = item.unit === 'GRAM' ? 100 : 1;
                            onQuantityChange(item.product.id, item.quantity + step);
                          }}
                          className="w-6 h-6 border border-gray-300 bg-gray-50 hover:bg-[#2E7D32] hover:text-white flex items-center justify-center transition-colors text-xs font-black rounded-none cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Explicit Delete Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="w-8 h-8 bg-red-50 border border-red-200 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors rounded-none cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price total */}
                    <div className="pl-3.5 text-right flex-shrink-0 min-w-[50px]">
                      <span className="text-xs font-black text-[#2E7D32]">
                        ₹{itemCost.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Bottom review card details */}
        <div className="px-5 pb-6 pt-2 bg-white flex flex-col gap-4 border-t border-gray-200 rounded-none">
          {/* TOTALS BLOCK with zero corners */}
          <div className="bg-gray-50 p-4 border-2 border-gray-300 flex flex-col gap-2 shadow-xs text-xs select-none rounded-none font-bold">
            <div className="flex justify-between items-center text-gray-400 font-black uppercase tracking-wider">
              <span>Items Total:</span>
              <span className="text-gray-800 font-mono">₹{itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-gray-400 font-black tracking-wider uppercase">
              <span>Delivery Charge:</span>
              <span className="text-[#2E7D32] font-black uppercase">FREE</span>
            </div>
            <div className="h-px bg-gray-300 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-black uppercase tracking-wide">GRAND TOTAL:</span>
              <span className="text-base text-[#FFA500] font-black font-mono">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* AMBER ADVISORY BANNER - Completely square edges */}
          <div className="bg-amber-50 border-2 border-amber-200 p-3.5 flex items-start gap-2.5 rounded-none">
            <ShieldCheck className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-left font-bold">
              <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-wider">No Advance Payment Needed!</h4>
              <p className="text-[10px] text-amber-600 mt-1 leading-relaxed">
                This order is cash-on-delivery. You can easily pay with cash or compile instant UPI scans directly at physical delivery time next morning.
              </p>
            </div>
          </div>

          {/* MAIN CTA WHATSAPP ORDER PLACEMENT BUTTON - Square edges */}
          <button
            onClick={onCheckout}
            disabled={orderItems.length === 0}
            className={`w-full py-3.5 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer rounded-none border-2 ${
              orderItems.length > 0
                ? 'bg-[#25D366] hover:bg-[#128C7E] border-[#128C7E]'
                : 'bg-gray-300 hover:bg-gray-300 border-gray-400 cursor-not-allowed text-gray-400'
            }`}
          >
            <WhatsAppIconSVG />
            <span>Place Order on WhatsApp</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
