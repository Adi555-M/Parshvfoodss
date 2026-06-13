import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Modular files imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchFilter from './components/SearchFilter';
import ProductCard from './components/ProductCard';
import ProfileDrawer from './components/ProfileDrawer';
import CartDrawer from './components/CartDrawer';
import Sections from './components/Sections';

import { PRODUCTS } from './data';
import { Profile } from './types';

export default function App() {
  // 1. Core Reactive States
  const [cart, setCart] = React.useState<Record<string, number>>({});
  const [selectedUnits, setSelectedUnits] = React.useState<Record<string, 'KG' | 'GRAM' | 'DOZEN'>>({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  // Load profile details from client-side local storage safely on load
  const [profile, setProfile] = React.useState<Profile>(() => {
    try {
      const stored = localStorage.getItem('pf_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load profile data', e);
    }
    return { name: '', phone: '', address: '' };
  });

  // 2. State Mutators
  const handleQuantityChange = (productId: string, val: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: val,
    }));
  };

  const handleUnitChange = (productId: string, unit: 'KG' | 'GRAM' | 'DOZEN') => {
    setSelectedUnits((prev) => ({
      ...prev,
      [productId]: unit,
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem('pf_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.error('Failed to save profile details', e);
    }
  };

  // Check if profile fields are accurately populated
  const isProfileFilled = React.useMemo(() => {
    return (
      (profile.name || '').trim().length > 0 &&
      (profile.phone || '').trim().length > 0 &&
      (profile.address || '').trim().length > 0
    );
  }, [profile]);

  // Compute total unique item types and dollar/rupee cost in current basket
  const cartItemSummary = React.useMemo(() => {
    let distinctTypes = 0;
    let grandRupeeTotal = 0;

    Object.entries(cart).forEach(([id, qty]) => {
      const quantityNum = qty as number;
      if (quantityNum <= 0) return;
      distinctTypes += 1;
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;

      const unit = selectedUnits[id] || 'KG';
      if (unit === 'GRAM') {
        grandRupeeTotal += (quantityNum / 1000) * product.price;
      } else if (product.id === '5' && unit === 'KG') {
        // Alphonso mango custom KG pricing
        grandRupeeTotal += quantityNum * 250;
      } else {
        grandRupeeTotal += quantityNum * product.price;
      }
    });

    return {
      distinctTypes,
      grandRupeeTotal,
    };
  }, [cart, selectedUnits]);

  // Filter products by query and selection category
  const filteredProducts = React.useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchQuery =
        product.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.gujaratiName.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'All') {
        return matchQuery;
      }
      return product.category === selectedCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  // smooth anchor navigation scrolling
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // WhatsApp Message Generator / Submission
  const handleCheckout = () => {
    // GATE CHECK: If profile elements are not filled, open profile drawer immediately
    if (!isProfileFilled) {
      setIsCartOpen(false);
      setIsProfileOpen(true);
      // Give native browser alert fallback or styling
      return;
    }

    // Build the ordered elements listing
    const cropsLines: string[] = [];
    Object.entries(cart).forEach(([id, qty]) => {
      const quantityNum = qty as number;
      if (quantityNum <= 0) return;
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;

      const unit = selectedUnits[id] || 'KG';
      let rowCost = 0;
      let priceLabel = '';

      if (unit === 'GRAM') {
        rowCost = (quantityNum / 1000) * product.price;
        priceLabel = `(${quantityNum} GRAM @ ₹${product.price}/kg)`;
      } else if (product.id === '5' && unit === 'KG') {
        rowCost = quantityNum * 250;
        priceLabel = `(${quantityNum} KG @ ₹250/kg)`;
      } else {
        rowCost = quantityNum * product.price;
        const perLabel = product.baseUnit === 'DOZEN' ? 'dozen' : 'kg';
        priceLabel = `(${quantityNum} ${unit} @ ₹${product.price}/${perLabel})`;
      }

      cropsLines.push(
        `🌿 ${product.gujaratiName} (${product.englishName}) - ${quantityNum} ${unit} - ₹${rowCost.toFixed(2)}`
      );
    });

    if (cropsLines.length === 0) {
      alert('Your shopping basket is empty! Fill up your card and try again.');
      return;
    }

    // Format final precompiled text message
    const lines = [
      'Hello Parshv Foods! 🌿',
      '',
      '*Customer Details:*',
      `👤 Name: ${profile.name.trim()}`,
      `📞 Phone: ${profile.phone.trim()}`,
      `📍 Address: ${profile.address.trim()}`,
      '',
      '*Order Details:*',
      ...cropsLines,
      '',
      `*Total Cost: ₹${cartItemSummary.grandRupeeTotal.toFixed(2)}*`,
      'Delivery Handling Fee: FREE 🚚',
      'Payment Mode: cash / Scan UPI on delivery',
      '',
      'Please confirm my next morning vegetable delivery order! Thank you! 😊',
    ];

    const encodedMessage = encodeURIComponent(lines.join('\n'));
    // Secure direct link to bypass modal blockings
    const whatsAppUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

    // Open link in a secure tab
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col justify-between selection:bg-[#2E7D32]/20 selection:text-[#2E7D32]">
      <div>
        {/* Navbar */}
        <Navbar
          cartCount={cartItemSummary.distinctTypes}
          cartTotal={cartItemSummary.grandRupeeTotal}
          isProfileFilled={isProfileFilled}
          onCartClick={() => setIsCartOpen(true)}
          onProfileClick={() => setIsProfileOpen(true)}
          onScrollTo={scrollToSection}
        />

        {/* Hero Section */}
        <Hero onOrderNowClick={() => scrollToSection('products')} />

        {/* Search, Filter bar, Clock Banner */}
        <div id="products" className="scroll-mt-24">
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Product Grid section */}
        <main className="px-4 py-8 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            Today's Fresh Vegetables
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Handpicked and delivered raw, clean and delicious 🥦
          </p>

          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-14 text-center text-gray-400 flex flex-col items-center justify-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-2">
                  🥬
                </div>
                <h3 className="font-extrabold text-gray-700 text-sm">No vegetables found!</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs text-center leading-relaxed">
                  We currently do not have any items matching "{searchQuery}". Try selecting another filter!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 sm:gap-6 mt-8">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    quantity={cart[product.id] || 0}
                    unit={selectedUnits[product.id] || (product.baseUnit as 'KG' | 'GRAM' | 'DOZEN')}
                    onQuantityChange={(qty) => handleQuantityChange(product.id, qty)}
                    onUnitChange={(unit) => handleUnitChange(product.id, unit)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Dynamic Static Sections (Why Choose Us, Our Story, Contact, Footer) */}
        <Sections
          onBrowseClick={() => scrollToSection('products')}
          onContactPhoneClick={() => {
            const encoded = encodeURIComponent('Hello Parshv Foods! 🌿 I am interested in ordering farm-fresh vegetables in Surat. Please add me to your daily broadcast list! Thank you.');
            window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank', 'noopener,noreferrer');
          }}
        />
      </div>

      {/* [L] Interactive Fixed Mini Floating Basket indicator */}
      <AnimatePresence>
        {cartItemSummary.distinctTypes > 0 && !isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto pointer-events-auto"
          >
            <div
              onClick={() => setIsCartOpen(true)}
              className="bg-[#2E7D32] hover:bg-emerald-700 text-white rounded-2xl px-4.5 py-4 flex items-center justify-between shadow-xl cursor-pointer active:scale-[0.98] transition-all border border-green-550/40 select-none animate-bounce-subtle"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/11 flex items-center justify-center shadow-inner">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] text-green-150 font-bold block leading-none">
                    {cartItemSummary.distinctTypes} {cartItemSummary.distinctTypes === 1 ? 'type' : 'types'} of vegetables
                  </span>
                  <span className="text-sm font-extrabold uppercase mt-1 block tracking-wider">
                    View Basket
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-green-200 mt-0.5">Grand Total:</span>
                <span className="text-base font-extrabold text-white">
                  ₹{cartItemSummary.grandRupeeTotal.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Components overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <ProfileDrawer
            isOpen={isProfileOpen}
            profile={profile}
            onClose={() => setIsProfileOpen(false)}
            onSave={handleSaveProfile}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            cart={cart}
            selectedUnits={selectedUnits}
            products={PRODUCTS}
            profile={profile}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckout}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
