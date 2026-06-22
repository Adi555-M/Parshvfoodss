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

        {/* 3. HORIZONTAL PILLS TAB RIBBON (Elegant Underlined Styling with White Line) */}
        <div id="pf-tab-ribbon" className="w-full flex items-center justify-center max-w-7xl mx-auto md:px-4 mt-1">
          <div className="grid grid-cols-4 gap-1 w-full border-b border-white/20">
            {/* Home Pill */}
            <button
              id="pf-tab-home"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 text-center font-bold text-[11.5px] sm:text-xs transition-all cursor-pointer rounded-none uppercase tracking-wide focus:outline-none ${
                activeTab === 'home'
                  ? 'text-white border-b-4 border-white font-black bg-white/5'
                  : 'text-white/75 hover:text-white border-b-4 border-transparent hover:border-white/10'
              }`}
            >
              <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span>Home</span>
            </button>

            {/* About Pill */}
            <button
              id="pf-tab-about"
              onClick={() => setActiveTab('about')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 text-center font-bold text-[11.5px] sm:text-xs transition-all cursor-pointer rounded-none uppercase tracking-wide focus:outline-none ${
                activeTab === 'about'
                  ? 'text-white border-b-4 border-white font-black bg-white/5'
                  : 'text-white/75 hover:text-white border-b-4 border-transparent hover:border-white/10'
              }`}
            >
              <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span>About</span>
            </button>

            {/* Contact Pill */}
            <button
              id="pf-tab-contact"
              onClick={() => setActiveTab('contact')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 text-center font-bold text-[11.5px] sm:text-xs transition-all cursor-pointer rounded-none uppercase tracking-wide focus:outline-none ${
                activeTab === 'contact'
                  ? 'text-white border-b-4 border-white font-black bg-white/5'
                  : 'text-white/75 hover:text-white border-b-4 border-transparent hover:border-white/10'
              }`}
            >
              <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span className="font-extrabold">Contact</span>
            </button>

            {/* Orders Pill */}
            <button
              id="pf-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 text-center font-bold text-[11.5px] sm:text-xs transition-all cursor-pointer rounded-none uppercase tracking-wide focus:outline-none ${
                activeTab === 'orders'
                  ? 'text-white border-b-4 border-white font-black bg-white/5'
                  : 'text-white/75 hover:text-white border-b-4 border-transparent hover:border-white/10'
              }`}
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span>Orders</span>
            </button>
          </div>
        </div>

      </header>
    </div>
  );
}
