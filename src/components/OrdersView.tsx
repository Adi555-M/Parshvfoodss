import React from 'react';
import {
  Calendar,
  Trash2,
  RefreshCw,
  FileText,
  ShoppingBasket
} from 'lucide-react';
import { Product, Profile, HistoricalOrder } from '../types';

interface OrdersViewProps {
  cart: { [productId: string]: number };
  selectedUnits: { [productId: string]: 'KG' | 'GRAM' | 'DOZEN' };
  products: Product[];
  profile: Profile;
  onEditProfile: () => void;
  onBrowseHome: () => void;
  onCheckout: () => void;
  cartTotal: number;
  orderHistory: HistoricalOrder[];
  onClearHistory: () => void;
  onReorder: (order: HistoricalOrder) => void;
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
  orderHistory = [],
  onClearHistory,
  onReorder,
}: OrdersViewProps) {
  const [showConfirmClear, setShowConfirmClear] = React.useState(false);

  return (
    <div id="pf-orders-view" className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4 py-6 select-none text-left">
      <div className="bg-white border-2 border-gray-300 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
        
        {/* Header Tab with Orange underline line */}
        <div className="border-b-4 border-orange-500 pb-2">
          <h2 className="text-2xl font-black text-[#2E7D32] uppercase tracking-wide">
            Your Orders
          </h2>
          <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">
            Monitor and place your next-morning kitchen delivery orders
          </p>
        </div>

        {/* 1. ORDER HISTORY TIMELINE SECTION */}
        <div className="flex flex-col gap-4">
          {orderHistory.length > 0 && (
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-black text-[#2E7D32] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#2E7D32]" />
                <span>📜 Completed WhatsApp Orders History</span>
              </h3>
              
              <div className="flex items-center gap-2">
                {showConfirmClear ? (
                  <>
                    <button
                      onClick={() => {
                        onClearHistory();
                        setShowConfirmClear(false);
                      }}
                      className="text-[10px] text-red-650 font-black uppercase hover:underline bg-red-50 px-2 py-1 border border-red-300 cursor-pointer"
                    >
                      Yes, Clear All
                    </button>
                    <button
                      onClick={() => setShowConfirmClear(false)}
                      className="text-[10px] text-gray-500 font-extrabold uppercase hover:underline px-2 py-1 cursor-pointer bg-transparent border-none"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowConfirmClear(true)}
                    className="text-[10px] text-red-500 font-extrabold uppercase hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear History
                  </button>
                )}
              </div>
            </div>
          )}

          {orderHistory.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-50 border-2 border-gray-200 p-4 relative flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-800 uppercase tracking-wider">
                        Order ID: {order.id}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {order.date}
                      </span>
                    </div>
                    {/* Next Day Status Badge */}
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] text-[10px] font-black uppercase px-2 py-1 border border-[#2E7D32]/20">
                      🚚 Scheduled Next Morning (8-11 AM)
                    </span>
                  </div>

                  {/* Order items miniature listing */}
                  <div className="flex flex-col gap-1.5 py-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs font-bold text-gray-700">
                        <div className="flex items-center gap-1.5 font-black">
                          <span className="text-sm">{item.emoji}</span>
                          <span>
                            {item.gujaratiName} <span className="text-[10px] font-normal text-gray-400">({item.englishName})</span>
                          </span>
                        </div>
                        <span className="text-gray-900 font-extrabold uppercase">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total and Re-Order action panel */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 mt-1">
                    <div className="text-xs">
                      <span className="text-gray-400 uppercase font-black mr-1">Paid:</span>
                      <span className="text-sm font-black text-[#2E7D32]">₹{order.totalCost.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onReorder(order)}
                      className="px-3.5 py-1.5 bg-[#2E7D32] hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wide border border-green-800 cursor-pointer rounded-none flex items-center gap-1 transition-all"
                    >
                      <RefreshCw className="w-3 h-3 text-white" />
                      <span>Re-order Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* PERFECTLY POLISHED ELEVATED EMPTY STATE (Exactly like Image 4) */
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center bg-white border border-gray-200 gap-3.5 my-2">
              <div className="w-20 h-20 bg-[#EAF6EA] border border-green-200 flex items-center justify-center text-green-700 rounded-full">
                <ShoppingBasket className="w-10 h-10 text-[#2E7D32]" />
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-wide">
                  No Orders Found
                </h3>
                <p className="text-xs font-bold text-gray-400">
                  You haven't placed any orders yet.
                </p>
              </div>

              <button
                onClick={onBrowseHome}
                className="mt-4 px-6 py-3.5 bg-[#FFA500] hover:bg-amber-600 text-black border-2 border-black text-xs font-black uppercase tracking-widest shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer rounded-none"
              >
                Place Your First Order
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
