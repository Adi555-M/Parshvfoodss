import React from 'react';
import { Leaf, CheckSquare } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4 py-6 select-none">
      {/* Container - Completely Square Borders and Simple Layout spacing */}
      <div className="bg-white border-2 border-gray-300 p-6 md:p-8 flex flex-col gap-6 text-left shadow-sm">
        
        {/* Core Header with thick orange underline badge */}
        <div className="border-b-4 border-orange-500 pb-2">
          <h2 className="text-2xl font-black text-[#2E7D32] uppercase tracking-wide">
            About Parshv Foods
          </h2>
        </div>

        {/* Beautiful Representative Fresh Harvest Graphic Image Card with square frame */}
        <div className="border border-gray-300 p-1.5 bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
            alt="Healthy fresh produce and ingredients"
            className="w-full h-48 object-cover object-center grayscale-[5%] brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="bg-white text-center py-2 px-1 border-t border-gray-200">
            <span className="text-xs font-semibold text-gray-500 block">
              Directly sourcing and delivering healthy, natural and vitamins-rich garden-fresh crops every morning at 4:00 AM
            </span>
          </div>
        </div>

        {/* Strong Intro Statement */}
        <div className="bg-green-50 border-l-4 border-[#2E7D32] p-4">
          <p className="text-sm font-black text-gray-800 leading-relaxed uppercase tracking-wider">
            Your trusted source for fresh, high-quality vegetables.
          </p>
        </div>

        {/* Values Block */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-black text-[#2E7D32] uppercase tracking-wider">
            Our Values
          </h3>
          <p className="text-xs font-semibold text-gray-650 leading-relaxed">
            At Parshv Foods, we operate according to strict vegetarian principles. We do not sell onions, potatoes, garlic, or any root vegetables. Our commitment to quality and freshness guides all our business practices. Every morning at 3:30 AM, our team visits the local markets to select only the freshest produce for our customers.
          </p>
        </div>

        {/* Promise Block */}
        <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
          <h3 className="text-base font-black text-[#2E7D32] uppercase tracking-wider">
            Our Promise
          </h3>
          <p className="text-xs font-semibold text-gray-650 leading-relaxed">
            We guarantee the quality of all our products. If you're not satisfied with any item, we'll replace it or refund your money. All our vegetables are carefully sourced to meet the highest standards of freshness and quality, hand-picked in the early hours of the morning to ensure you receive the best.
          </p>
        </div>

        {/* Why Choose Us Block with exact checklist from the image */}
        <div className="flex flex-col gap-3.5 border-t border-gray-200 pt-4">
          <h3 className="text-base font-black text-[#2E7D32] uppercase tracking-wider">
            Why Choose Us?
          </h3>
          <ul className="flex flex-col gap-2.5">
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">100% fresh vegetable selection</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">Early morning market selection at 3:30 AM</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">No onions, potatoes, or root vegetables</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">Organic and pesticide-free produce</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">next day delivery for all orders timing - 8AM to 11AM</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">Competitive prices with no hidden charges</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckSquare className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-750">Friendly customer service</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
