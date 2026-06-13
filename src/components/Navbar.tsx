import React from 'react';
import { ShoppingBag, User, Menu, X, Leaf, Info, MessageSquare, ListCollapse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  isProfileFilled: boolean;
  onCartClick: () => void;
  onProfileClick: () => void;
  onScrollTo: (sectionId: string) => void;
}

export default function Navbar({
  cartCount,
  cartTotal,
  isProfileFilled,
  onCartClick,
  onProfileClick,
  onScrollTo,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (id: string) => {
    onScrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Parent Container for Announcement & Navbar */}
      <div id="pf-header" className="sticky top-0 z-50 w-full">
        {/* [A] ANNOUNCEMENT BAR */}
        <div className="w-full bg-[#FFA000] text-white py-1.5 px-4 text-center text-xs sm:text-xs font-semibold tracking-wide shadow-sm flex items-center justify-center gap-1.5 leading-relaxed">
          <span>🎉</span>
          <span>Free delivery on all orders • Order before 10PM for next morning delivery</span>
        </div>

        {/* [B] STICKY NAVBAR */}
        <header className="w-full bg-[#2E7D32] text-white px-4 py-3 shadow-md flex items-center justify-between">
          {/* Logo & Brand Details */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden">
              <img 
                src="/public/logo.jpeg" 
                alt="Parshv Foods Logo" 
                className="w-full h-full object-cover rounded-full" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-extrabold text-lg sm:text-lg tracking-tight hover:text-green-100 transition-colors flex items-center gap-1">
              Parshv Foods <Leaf className="w-4.5 h-4.5 text-green-200 inline" />
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shadow-inner transition-colors active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFA000] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-lg border border-white flex items-center justify-center min-w-5 h-5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              id="nav-profile-btn"
              onClick={onProfileClick}
              className={`relative w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center shadow-inner transition-all active:scale-95 ${
                isProfileFilled ? 'bg-[#FFA000]/20 ring-2 ring-[#FFA000]' : 'bg-white/10'
              }`}
              aria-label="Edit Profile"
            >
              <User className={`w-5 h-5 ${isProfileFilled ? 'text-yellow-400' : 'text-white'}`} />
              {isProfileFilled && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FFA000] rounded-full ring-1 ring-white" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              id="nav-hamburger-btn"
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-3 ml-4">
              <button 
                onClick={() => handleLinkClick('home')} 
                className="text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleLinkClick('products')} 
                className="text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                Shop/Orders
              </button>
              <button 
                onClick={() => handleLinkClick('about')} 
                className="text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => handleLinkClick('contact')} 
                className="text-sm font-medium bg-[#FFA000] hover:bg-amber-600 px-4 py-1.5 rounded-full shadow-md text-white transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        </header>

        {/* [C] MOBILE HAMBURGER MENU (dropdown) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-dropdown-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 w-full bg-[#2E7D32] border-t border-white/10 shadow-xl z-50 md:hidden"
            >
              <div className="grid grid-cols-2 gap-2.5 p-4 max-w-lg mx-auto">
                <button
                  onClick={() => handleLinkClick('home')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all text-left justify-start active:translate-y-0.5"
                >
                  <span className="text-base">🏠</span> Home
                </button>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all text-left justify-start active:translate-y-0.5"
                >
                  <Info className="w-4 h-4 text-green-200" /> About Us
                </button>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all text-left justify-start active:translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4 text-green-200" /> Contact
                </button>
                <button
                  onClick={() => handleLinkClick('products')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all text-left justify-start active:translate-y-0.5"
                >
                  <ListCollapse className="w-4 h-4 text-green-200" /> Shop / Orders
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
