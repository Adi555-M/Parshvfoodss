import React from 'react';
import { ShoppingBag, User, CheckCircle2, ArrowRight, Edit, PhoneCall } from 'lucide-react';
import { Product, Profile } from '../types';

interface OrdersViewProps {
  cart: { [productId: string]: number };
  selectedUnits: { [productId: string]: 'KG' | 'GRAM' | 'DOZEN' };
  products: Product[];
  profile: Profile;
  onEditProfile: () => void;
  onBrowseHome: () => void;
  onCheckout: () => void;
  cartTotal: number;
}

export default function OrdersView({
  cart,
  selectedUnits,
  products,
  profile,
  onEditProfile,
  onBrowseHome,
  onCheckout,
  cartTotal,
}: OrdersViewProps) {
  const hasProfile = profile.name.trim() !== '' && profile.phone.trim() !== '';
  
  // Calculate cart items
  const activeItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const prod = products.find((p) => p.id === id);
      const unit = selectedUnits[id] || (prod?.baseUnit as 'KG' | 'GRAM' | 'DOZEN');
      
      let itemPrice = prod ? prod.price : 0;
      let computedCost = 0;
      if (prod) {
        if (unit === 'GRAM') {
          computedCost = (qty / 1000) * prod.price;
        } else if (prod.id === '5' && unit === 'KG') {
          computedCost = qty * 250;
        } else {
          computedCost = qty * prod.price;
        }
      }
      return {
        product: prod,
        quantity: qty,
        unit,
        cost: computedCost,
      };
    })
    .filter((it) => it.product !== undefined);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 select-none text-left">
      <div className="bg-white border-2 border-gray-300 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
        
        {/* Header Tab with thick Orange underline */}
        <div className="border-b-4 border-orange-500 pb-2">
          <h2 className="text-2xl font-black text-[#2E7D32] uppercase tracking-wide">
            Your Orders & Profile
          </h2>
          <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">
            Monitor and place your next-morning kitchen delivery orders
          </p>
        </div>

        {/* 1. Profile Status Info Card */}
        <div className="bg-[#EAF6EA] border-2 border-green-300 p-4.5 flex flex-col gap-3 rounded-none">
          <div className="flex items-center justify-between border-b border-green-200 pb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#2E7D32]" />
              <h3 className="font-black text-xs sm:text-sm text-gray-800 uppercase tracking-wider">
                Saved Delivery Profile
              </h3>
            </div>
            <button
              onClick={onEditProfile}
              className="text-[10px] font-black text-[#2E7D32] uppercase hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>

          {hasProfile ? (
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-gray-800 font-extrabold text-sm uppercase">👤 {profile.name}</p>
              <p className="text-gray-600 font-bold">📞 {profile.phone}</p>
              <p className="text-gray-600 font-bold mt-1">📍 {profile.address || 'Surat, Gujarat, India'}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 py-1 text-center">
              <p className="text-xs font-bold text-gray-600 italic">No delivery profile saved yet!</p>
              <button
                onClick={onEditProfile}
                className="px-4 py-2 bg-[#2E7D32] text-white text-[11px] font-black uppercase tracking-wider border-2 border-green-700 select-none cursor-pointer hover:bg-emerald-700 rounded-none w-full"
              >
                Set Up Delivery Address now
              </button>
            </div>
          )}
        </div>

        {/* 2. Order History / Pending Next-day Orders Block */}
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-500" /> Back-End Delivery Status
          </h3>
          <div className="border-l-4 border-orange-500 bg-orange-50/70 p-3.5">
            <p className="text-xs font-black text-orange-700 uppercase tracking-wide">
              🔒 Pending Next Morning Confirmation
            </p>
            <p className="text-[11px] font-semibold text-gray-650 mt-1 lines-relaxed">
              Once you confirm your basket via WhatsApp, our early morning farm coordinators at 4:30 AM will pack your vegetables. Delivery is scheduled between 8:00 AM and 11:00 AM.
            </p>
          </div>
        </div>

        {/* 3. Items currently prepared in your basket */}
        <div className="flex flex-col gap-3.5 border-t border-gray-200 pt-5">
          <h3 className="text-sm font-black text-[#2E7D32] uppercase tracking-wider flex items-center justify-between">
            <span>Prepared Basket list</span>
            <span className="text-[11px] font-extrabold text-gray-400 capitalize">({activeItems.length} items)</span>
          </h3>

          {activeItems.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 border border-gray-200 sm:max-h-72 overflow-y-auto p-2 bg-gray-50 max-w-full">
                {activeItems.map((it) => (
                  <div key={it.product?.id} className="flex items-center justify-between py-2 px-2.5 bg-white border border-gray-200 font-bold text-xs select-none">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{it.product?.emoji}</span>
                      <div>
                        <p className="text-gray-800 font-black">{it.product?.gujaratiName}</p>
                        <p className="text-[10px] text-gray-400 lowercase italic">({it.product?.englishName})</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800 font-black uppercase">{it.quantity} {it.unit}</p>
                      <p className="text-[10.5px] text-[#2E7D32] font-black">₹{it.cost.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Summary box */}
              <div className="flex items-center justify-between border-t-2 border-dashed border-gray-300 pt-3 pb-1 px-1">
                <span className="text-xs font-black text-gray-500 uppercase">Grand Total:</span>
                <span className="text-lg font-black text-[#2E7D32]">₹{cartTotal.toFixed(2)}</span>
              </div>

              {/* Send and Checkout CTA button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#FFA500] hover:bg-amber-600 text-black border-2 border-black font-black text-xs uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer rounded-none flex items-center justify-center gap-2"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 border border-gray-200 gap-3">
              <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center text-xl">
                🥬
              </div>
              <p className="text-xs font-bold text-gray-400 max-w-xs px-4">
                Your basket is empty! Check out our morning list and add items.
              </p>
              <button
                onClick={onBrowseHome}
                className="px-5 py-2.5 bg-[#2E7D32] text-white border-2 border-green-800 text-xs font-black uppercase tracking-widest hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer rounded-none"
              >
                Start Shop Selection
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
