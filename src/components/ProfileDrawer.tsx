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

      {/* [N] Profile bottom sheet drawer container - COMPLETELY SQUARE */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative w-full max-w-lg bg-white shadow-2xl z-40 max-h-[92vh] overflow-y-auto flex flex-col rounded-none border-t-2 border-gray-400"
      >
        {/* Grey pull horizontal indicator slider - Square styled stamp */}
        <div className="w-full flex justify-center py-3">
          <div className="w-12 h-1.5 bg-gray-205 border border-gray-300" />
        </div>

        {/* Drawer Header card / Completely Square */}
        <div className="mx-4 mb-4 bg-[#2E7D32] text-white p-4 relative flex items-center justify-between border-2 border-green-800 rounded-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 border border-white flex items-center justify-center rounded-none">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider leading-tight">
                {formData.name ? `Hi, ${formData.name}! 👋` : 'My Profile'}
              </h2>
              <p className="text-[11px] text-white/80 mt-1 font-bold uppercase tracking-wide">
                Set Delivery Details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer rounded-none active:scale-95"
            aria-label="Close details edit panel"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Edit Fields Form with square styling elements */}
        <form onSubmit={handleSave} className="px-5 pb-8 flex-1 flex flex-col gap-5">
          {/* Full Name input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
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
                className="w-full bg-gray-50 text-gray-850 border-2 border-gray-300 pl-11 pr-4 py-3 text-xs font-black outline-none focus:border-[#2E7D32] focus:bg-white transition-all rounded-none uppercase"
              />
            </div>
          </div>

          {/* Phone Number tel input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
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
                className="w-full bg-gray-50 text-gray-850 border-2 border-gray-300 pl-11 pr-4 py-3 text-xs font-black outline-none focus:border-[#2E7D32] focus:bg-white transition-all rounded-none font-mono"
              />
            </div>
          </div>

          {/* Delivery Address textarea */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pf-prof-address" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
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
                className="w-full bg-gray-50 text-gray-850 border-2 border-gray-300 pl-11 pr-4 py-3 text-xs font-black outline-none focus:border-[#2E7D32] focus:bg-white transition-all rounded-none leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Footer Save Actions with full square style button */}
          <div className="mt-4 flex flex-col gap-2 relative">
            <button
              type="submit"
              disabled={isSavedSuccessfully}
              className={`w-full py-3.5 font-black text-xs uppercase tracking-widest cursor-pointer border-2 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] rounded-none ${
                isSavedSuccessfully
                  ? 'bg-emerald-600 text-white border-emerald-800'
                  : 'bg-[#2E7D32] text-white hover:bg-emerald-700 border-green-800'
              }`}
            >
              {isSavedSuccessfully ? (
                <>
                  <BadgeCheck className="w-4 h-4 text-white" /> Details Saved!
                </>
              ) : (
                'Save Details'
              )}
            </button>
            <p className="text-center text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wide">
              Data is stored locally on this device.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
