import { motion } from 'motion/react';

interface HeroProps {
  onOrderNowClick: () => void;
}

export default function Hero({ onOrderNowClick }: HeroProps) {
  return (
    <section id="home" className="px-4 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Container with light green background and large borders */}
      <div className="w-full bg-[#EAF6EA] rounded-[2rem] px-6 py-10 sm:py-14 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
        {/* Abstract organic visual accents inside container background */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-200/20 rounded-full blur-2xl -translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-[#FFA000]/10 rounded-full blur-3xl translate-x-16 translate-y-16 pointer-events-none" />

        {/* Circular Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white mb-6 active:scale-95 transition-transform"
        >
          <img
            src="/public/logo.jpeg"
            alt="Parshv Foods"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-extrabold max-w-2xl leading-tight tracking-tight text-[#1F2937]"
        >
          Fresh Vegetables <br className="sm:hidden" />
          <span className="text-[#2E7D32]">Delivered Daily</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 font-normal text-sm sm:text-base mt-4 max-w-md leading-relaxed"
        >
          Farm-fresh vegetables delivered directly to your doorstep in Surat every morning.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8"
        >
          <button
            onClick={onOrderNowClick}
            className="px-8 py-3.5 bg-[#FFA000] hover:bg-amber-600 text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            Order Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
