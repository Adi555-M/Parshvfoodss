import { Leaf, Clock, ShoppingBag, Landmark, MapPin, Phone, Mail, ChevronRight, Check } from 'lucide-react';
import { HEALTH_BENEFITS } from '../data';

interface SectionsProps {
  onBrowseClick: () => void;
  onContactPhoneClick: () => void;
}

export default function Sections({ onBrowseClick, onContactPhoneClick }: SectionsProps) {
  return (
    <>
      {/* 1. WHY CHOOSE US SECTION */}
      <section className="px-4 py-12 max-w-7xl mx-auto text-center bg-white/45 my-6 rounded-[2.5rem] select-none border border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
          Why Choose Parshv Foods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto px-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EAF6EA] flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <h3 className="font-extrabold text-base text-gray-800">Fresh Every Morning</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Sourced directly from organic state farms at 4AM daily.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="font-extrabold text-base text-gray-800">Fast Delivery</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Delivered safely to your door before 11AM every day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-extrabold text-base text-gray-800">Hygienic Packing</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Clean, double-layered contactless and safe food handling.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <span className="text-lg font-bold text-emerald-600">₹</span>
            </div>
            <h3 className="font-extrabold text-base text-gray-800">Affordable Pricing</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Fair local market rates without retail middle-men blocks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HEALTH BENEFITS SECTION -> Why Eat Fresh? */}
      <section className="px-4 py-12 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
          Why Eat Fresh?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md mx-auto">
          Raw vegetables preserve all vital enzymes and fibers. Enrich your daily local Gujarati dishes!
        </p>

        {/* Responsive Grid for benefits */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4.5 mt-8 max-w-5xl mx-auto">
          {HEALTH_BENEFITS.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl flex flex-col items-center text-center shadow-xs border border-gray-100/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${item.bgColor}`}
            >
              <div className="text-3xl mb-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-white/40">
                {item.emoji}
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-800">
                {item.name}
              </h3>
              <span className={`inline-block mt-3.5 px-3.5 py-1 text-[10px] font-bold rounded-full ${item.badgeColor}`}>
                {item.benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION - OUR MORNING STORY */}
      <section id="about" className="px-4 py-10 max-w-7xl mx-auto">
        <div className="w-full bg-[#EAF6EA] border border-[#C8EBC8]/30 rounded-[2.5rem] p-6 sm:p-12 text-center max-w-4xl mx-auto flex flex-col items-center shadow-xs relative overflow-hidden">
          {/* Top visual badge icon (sunset style) */}
          <div className="w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center text-3xl mb-6">
            🌅
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-snug">
            Our Morning Story
          </h2>

          <p className="text-sm sm:text-sm text-gray-600 mt-6 leading-relaxed max-w-2xl font-medium text-center">
            Long before Surat city wakes up, we are on site at local organic farms, carefully handpicking the finest vegetables and crops. We passionately believe that raw fresh food acts as the pillar foundation of a healthy, blissful family. That is why our family sorts, packs, and brings these vegetables directly to you just hours after harvesting.
          </p>

          {/* Styled pills row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <span className="bg-white/90 text-[#2E7D32] px-5 py-2 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
              🌿 100% Fresh
            </span>
            <span className="bg-white/90 text-[#2E7D32] px-5 py-2 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
              🤝 Locally Trusted
            </span>
            <span className="bg-white/90 text-[#2E7D32] px-5 py-2 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
              👨‍👩‍👧 Family First
            </span>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION -> Get in Touch */}
      <section id="contact" className="px-4 py-12 max-w-7xl mx-auto text-center select-none">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
          We're always just a message away 🌿
        </p>

        {/* WhatsApp Hero Card */}
        <div className="w-full max-w-3xl mx-auto mt-8 bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#34C35A] rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Opacity blobs decoratives */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full -mr-12 -mt-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

          {/* Floating emoji decorators inside card */}
          <div className="absolute top-4 left-6 text-2xl opacity-15 select-none pointer-events-none">🥦</div>
          <div className="absolute top-1/2 right-4 text-2xl opacity-20 select-none pointer-events-none">🥕</div>
          <div className="absolute bottom-4 right-10 text-2xl opacity-15 select-none pointer-events-none">🌿</div>

          {/* Left Large Icon container */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12.004 2.002C6.48 2.002 2.002 6.48 2.002 12.004c0 1.91.536 3.693 1.47 5.215L1.002 23l5.961-1.564c1.455.795 3.12 1.252 4.887 1.252 5.522 0 10-4.478 10-10.004 0-5.523-4.478-10.002-10-10.002zm5.733 13.916c-.23.649-1.34 1.189-1.859 1.229-.449.034-.9.135-2.911-.692-2.42-.991-3.957-3.411-4.079-3.575-.121-.164-.991-1.317-.991-2.511 0-1.194.629-1.782.853-2.023.224-.241.488-.302.649-.302s.328 0 .469.006c.159.008.375-.062.583.438.219.529.743 1.815.808 1.947s.109.283.023.454c-.086.17-.129.283-.258.434-.129.151-.274.337-.39.454-.129.129-.265.27-.113.529.151.258.673 1.109 1.439 1.788.988.877 1.817 1.148 2.072 1.275s.4-.043.551-.219c.151-.176.649-.757.828-1.011s.344-.22.583-.129c.241.091 1.52.716 1.788.852s.449.201.511.312c.062.112.062.649-.168 1.298z" />
            </svg>
          </div>

          {/* Right Text Contents */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase block mb-1">
              Direct Broacast & Ordering
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
              Order Instantly on WhatsApp
            </h3>
            <p className="text-xs sm:text-xs text-white/90 font-medium leading-relaxed mt-2 max-w-lg">
              Chat directly with us, join our daily fresh vegetable broadcast list, or simply drop your customized purchase selection, we will confirm within minutes!
            </p>

            {/* In-Card CTA buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <button
                onClick={onContactPhoneClick}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-[#128C7E] font-bold text-sm rounded-xl tracking-wide shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                Chat Now 💬
              </button>
              <button
                onClick={onBrowseClick}
                className="w-full sm:w-auto px-6 py-2.5 bg-white/15 hover:bg-white/20 text-white font-bold text-sm rounded-xl tracking-wide border border-white/25 hover:border-white/40 transition-colors flex items-center justify-center gap-1.5"
              >
                Browse Vegetables <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Detail Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 mt-8 max-w-3xl mx-auto px-4">
          {/* Card Location */}
          <div className="flex items-center gap-3 bg-orange-50/70 border border-orange-100 p-4.5 rounded-2xl text-left select-text">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-xs">
              <MapPin className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block">
                LOCATION
              </span>
              <span className="text-xs font-bold text-gray-800 block mt-0.5">
                Surat, Gujarat, India
              </span>
            </div>
          </div>

          {/* Card Phone */}
          <button
            onClick={onContactPhoneClick}
            className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-100 p-4.5 rounded-2xl text-left hover:bg-[#EAF6EA] transition-all cursor-pointer active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C8EBC8]/60 text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div className="select-text">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
                PHONE
              </span>
              <span className="text-xs font-mono font-bold text-gray-800 block mt-0.5">
                +91 98765 43210
              </span>
            </div>
          </button>

          {/* Card Email */}
          <a
            href="mailto:info@parshvfoods.com"
            className="flex items-center gap-3 bg-blue-50/70 border border-blue-100 p-4.5 rounded-2xl text-left hover:bg-blue-100/40 transition-all active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 select-text">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">
                EMAIL
              </span>
              <span className="text-xs font-bold text-gray-800 block mt-0.5 truncate leading-tight">
                info@parshvfoods.com
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* [K] FOOTER SECTION */}
      <footer className="w-full bg-[#2E7D32] text-white pt-14 pb-28 lg:pb-14 px-4 border-t border-white/5 select-none text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-0.5">
                <img 
                  src="/public/logo.jpeg" 
                  alt="Footer Logo" 
                  className="w-full h-full object-cover rounded-full" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight">Parshv Foods</span>
            </div>
            <p className="text-xs text-green-100 font-medium leading-relaxed max-w-xs">
              Farm-fresh vegetables delivered directly to your doorstep in Surat every morning. Sourced at 4AM, delivered at 6AM – 11AM weekly!
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-sm tracking-wider uppercase text-yellow-400">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 mt-1 text-xs font-semibold text-green-100">
              <a href="#home" className="hover:text-white hover:underline transition-all">
                Home
              </a>
              <a href="#products" className="hover:text-white hover:underline transition-all">
                Shop/Orders
              </a>
              <a href="#about" className="hover:text-white hover:underline transition-all">
                About Us
              </a>
              <a href="#contact" className="hover:text-white hover:underline transition-all">
                Contact
              </a>
            </div>
          </div>

          {/* Col 3 Delivery info details */}
          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-sm tracking-wider uppercase text-yellow-400">
              Delivery Info
            </h4>
            <div className="flex flex-col gap-2 mt-1 text-xs text-green-100 font-medium leading-relaxed">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400" />
                <span>Daily Timings: 6AM – 11AM Surat-wide</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Check className="w-4 h-4 text-yellow-400" />
                <span>Order Cut-off: 10PM previous night</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-yellow-400 font-extrabold" />
                <span className="font-bold text-white">FREE Delivery on all orders!</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/10 my-10 max-w-7xl mx-auto" />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-green-100 font-medium gap-3">
          <span>&copy; 2026 Parshv Foods. All rights reserved. Surat, Gujarat.</span>
          <span className="text-[10px] text-yellow-400/90 font-bold tracking-widest uppercase">
            Vegetables by PARSHV FOOD'S
          </span>
        </div>
      </footer>
    </>
  );
}
