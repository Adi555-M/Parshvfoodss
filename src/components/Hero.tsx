import React from 'react';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import heroLogo from '../assets/images/regenerated_image_1781430026139.jpg';

interface HeroProps {
  onOrderNowClick: () => void;
}

export default function Hero({ onOrderNowClick }: HeroProps) {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <section id="home" className="px-4 py-4 max-w-lg mx-auto">
      {/* Container with light green background and completely square borders */}
      <div className="w-full bg-[#EAF6EA] border-2 border-green-200 px-6 py-10 flex flex-col items-center text-center shadow-xs relative overflow-hidden rounded-none">
        
        {/* Abstract organic visual accents with square shapes */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-green-200/25 -translate-x-6 -translate-y-6 pointer-events-none border border-green-300/30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FFA000]/10 translate-x-8 translate-y-8 pointer-events-none border border-[#FFA000]/20" />

        {/* Square Border Logo Badge (Match "make it square not curve") */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-28 h-28 rounded-none border-4 border-white shadow-md overflow-hidden bg-white mb-6 active:scale-95 transition-transform flex items-center justify-center shrink-0"
        >
          {!logoError ? (
            <img
              src={heroLogo}
              alt="Parshv Foods"
              className="w-full h-full object-cover rounded-none"
              onError={() => setLogoError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white p-4 text-[#2E7D32]">
              <Leaf className="w-9 h-9 mb-1 text-[#2E7D32]" />
              <span className="font-black text-[10px] tracking-wider uppercase text-gray-750">Parshv Foods</span>
            </div>
          )}
        </motion.div>

        {/* Hero Title with square feel */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl sm:text-4xl font-black max-w-sm leading-tight tracking-tight text-gray-800 uppercase"
        >
          Farm-Fresh <br />
          <span className="text-[#2E7D32]">Vegetables Daily</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-600 font-bold text-xs mt-3.5 max-w-xs leading-relaxed uppercase tracking-wider"
        >
          Delivered raw, clean, and delicious directly to Surat doorsteps.
        </motion.p>

        {/* Square Styled CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6"
        >
          <button
            onClick={onOrderNowClick}
            className="px-8 py-3 bg-[#FFA500] hover:bg-amber-600 text-black border-2 border-black font-black text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer rounded-none"
          >
            Start Shop Selection
          </button>
        </motion.div>
      </div>
    </section>
  );
}
