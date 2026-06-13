import React from 'react';
import { motion } from 'motion/react';
import { X, User, Phone, MapPin, BadgeCheck } from 'lucide-react';
import { Profile } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  profile: Profile;
  onClose: () => void;
  onSave: (updated: Profile) => void;
}

export default function ProfileDrawer({ isOpen, profile, onClose, onSave }: ProfileDrawerProps) {
  const [formData, setFormData] = React.useState<Profile>({ name: '', phone: '', address: '' });
  const [isSavedSuccessfully, setIsSavedSuccessfully] = React.useState(false);

  // Sync state when opened
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
      setIsSavedSuccessfully(false);
    }
  }, [isOpen, profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill out all fields carefully so we can successfully deliver your vegetables! 🥦');
      return;
    }
    onSave(formData);
    setIsSavedSuccessfully(true);
    setTimeout(() => {
      setIsSavedSuccessfully(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
      />

      {/* [N] Profile bottom sheet drawer container */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] shadow-2xl z-40 max-h-[92vh] overflow-y-auto flex flex-col"
      >
        {/* Grey pull horizontal indicator slider */}
        <div className="w-full flex justify-center py-3">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Drawer Header card box */}
        <div className="mx-4 mb-4 bg-[#2E7D32] text-white p-4 rounded-3xl relative flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold leading-tight">
                {formData.name ? `Hi, ${formData.name}! 👋` : 'My Profile'}
              </h2>
              <p className="text-xs text-white/80 mt-1 font-medium">
                Set delivery details for checkout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
            aria-label="Close details edit panel"
          >
            <X className="w-5 h-5 text-block text-white" />
          </button>
        </div>

        {/* Edit Fields Form */}
        <form onSubmit={handleSave} className="px-5 pb-8 flex-1 flex flex-col gap-5">
          {/* Full Name input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-name" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <User className="h-5 w-5 text-[#2E7D32]" />
              </span>
              <input
                id="pf-prof-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-gray-50 text-gray-800 border border-gray-200 pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] focus:bg-white transition-all font-semibold"
              />
            </div>
          </div>

          {/* Phone Number tel input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-phone" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Phone className="h-5 w-5 text-[#2E7D32]" />
              </span>
              <input
                id="pf-prof-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number (e.g. +91 98765 43210)"
                className="w-full bg-gray-50 text-gray-800 border border-gray-200 pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] focus:bg-white transition-all font-mono font-semibold"
              />
            </div>
          </div>

          {/* Delivery Address textarea */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-address" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              Delivery Address (Surat only)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 pointer-events-none">
                <MapPin className="h-5 w-5 text-[#2E7D32]" />
              </span>
              <textarea
                id="pf-prof-address"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House/flat no., building name, street name, area, Surat"
                className="w-full bg-gray-50 text-gray-800 border border-gray-200 pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] focus:bg-white transition-all font-semibold leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Footer Save CTA Actions */}
          <div className="mt-4 flex flex-col gap-2 relative">
            <button
              type="submit"
              disabled={isSavedSuccessfully}
              className={`w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer ${
                isSavedSuccessfully
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-[#2E7D32] text-white hover:bg-emerald-700 hover:shadow-xl'
              }`}
            >
              {isSavedSuccessfully ? (
                <>
                  <BadgeCheck className="w-5 h-5 text-white" /> Details Saved!
                </>
              ) : (
                'Save Details'
              )}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-1">
              Your details are safely stored on your device and will be appended to your WhatsApp order message.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
