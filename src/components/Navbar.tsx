import React from 'react';
import { Home, Info, Mail, RotateCcw, ShoppingBag, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  isProfileFilled: boolean;
  onCartClick: () => void;
  onProfileClick: () => void;
  activeTab: 'home' | 'about' | 'contact' | 'orders';
  setActiveTab: (tab: 'home' | 'about' | 'contact' | 'orders') => void;
}

export default function Navbar({
  cartCount,
  cartTotal,
  isProfileFilled,
  onCartClick,
  onProfileClick,
  activeTab,
  setActiveTab,
}: NavbarProps) {
  return (
    <div id="pf-header" className="sticky top-0 z-50 w-full select-none">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#FFA500] text-black py-2.5 px-4 text-center text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-1 leading-tight border-b border-black/10">
        <span>Free delivery on all orders! Order before 10PM And get order next day morning (8-11 AM)</span>
      </div>

      {/* 2. GREEN CORE HEADER */}
      <header className="w-full bg-[#2E7D32] text-white px-4 py-4 flex flex-col items-center gap-4.5 border-b border-green-800">
        
        {/* Brand Title Row with Cart & Profile controls */}
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto md:px-4">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="text-xl">🌿</span>
            <span className="font-extrabold text-white text-xl sm:text-2xl tracking-tight uppercase">
              Parshv Foods
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative w-9 h-9 border border-white bg-transparent flex items-center justify-center transition-all cursor-pointer active:scale-95 rounded-none"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FFA500] text-black text-[9px] font-black px-1.5 py-0.5 border border-black min-w-4 h-4 flex items-center justify-center rounded-none shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile/User settings Icon */}
            <button
              onClick={onProfileClick}
              className={`w-9 h-9 border flex items-center justify-center transition-all cursor-pointer active:scale-95 rounded-none ${
                isProfileFilled ? 'border-[#FFA500] bg-[#FFA500]/20' : 'border-white bg-transparent'
              }`}
              aria-label="Edit Profile"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* 3. HORIZONTAL PILLS TAB RIBBON (Square Borders) */}
        <div className="w-full flex items-center justify-center max-w-7xl mx-auto md:px-4 mt-0.5">
          <div className="grid grid-cols-4 gap-2 w-full">
            {/* Home Pill */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-center font-bold text-xs border transition-all cursor-pointer rounded-none uppercase tracking-wide ${
                activeTab === 'home'
                  ? 'bg-white text-[#2E7D32] border-white font-extrabold shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
              <span>Home</span>
            </button>

            {/* About Pill */}
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-center font-bold text-xs border transition-all cursor-pointer rounded-none uppercase tracking-wide ${
                activeTab === 'about'
                  ? 'bg-white text-[#2E7D32] border-white font-extrabold shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <Info className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
              <span>About</span>
            </button>

            {/* Contact Pill */}
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-center font-bold text-xs border transition-all cursor-pointer rounded-none uppercase tracking-wide ${
                activeTab === 'contact'
                  ? 'bg-white text-[#2E7D32] border-white font-extrabold shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 text-red-500 animate-pulse" style={{ animationDuration: '3s' }} />
              <span className="font-extrabold">Contact</span>
            </button>

            {/* Orders Pill */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-center font-bold text-xs border transition-all cursor-pointer rounded-none uppercase tracking-wide ${
                activeTab === 'orders'
                  ? 'bg-white text-[#2E7D32] border-white font-extrabold shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <RotateCcw className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
              <span>Orders</span>
            </button>
          </div>
        </div>

      </header>
    </div>
  );
}
