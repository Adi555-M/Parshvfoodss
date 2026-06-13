import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    gujaratiName: 'ટામેટા',
    englishName: 'Tomatoes',
    price: 50,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Seasonal',
    badge: 'Fresh Today',
    emoji: '🍅',
    bgColor: '#FFF0F2', // Pink blush
  },
  {
    id: '2',
    gujaratiName: 'ભીંડા',
    englishName: 'Okra',
    price: 100,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Organic',
    badge: 'Organic',
    emoji: '🫛',
    bgColor: '#F2FBF2', // Mint green
  },
  {
    id: '3',
    gujaratiName: 'ફ્લાવર',
    englishName: 'Cauliflower',
    price: 100,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Seasonal',
    badge: 'Seasonal',
    emoji: '🥦',
    bgColor: '#FFFDE8', // Light yellow
  },
  {
    id: '4',
    gujaratiName: 'દેશી કોબીજ',
    englishName: 'Desi Cabbage',
    price: 60,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Leafy',
    badge: 'Leafy',
    emoji: '🥬',
    bgColor: '#F0FFF5', // Soft green
  },
  {
    id: '5',
    gujaratiName: 'હાફુસ કેરી',
    englishName: 'Alphonso Mango',
    price: 750,
    baseUnit: 'DOZEN',
    availableUnits: ['DOZEN', 'KG'],
    category: 'Fruits',
    badge: 'Fruits',
    emoji: '🥭',
    bgColor: '#FFF8F0', // Peachy cream
  },
  {
    id: '6',
    gujaratiName: 'કારેલા',
    englishName: 'Bitter Gourd',
    price: 100,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Organic',
    badge: 'Organic',
    emoji: '🥒',
    bgColor: '#F2FBF2', // Mint green
  },
  {
    id: '7',
    gujaratiName: 'ગાજર',
    englishName: 'Carrot',
    price: 50,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Root',
    badge: 'Root',
    emoji: '🥕',
    bgColor: '#FFF8F0', // Peachy cream
  },
  {
    id: '8',
    gujaratiName: 'પાલક',
    englishName: 'Spinach',
    price: 25,
    baseUnit: 'KG',
    availableUnits: ['KG', 'GRAM'],
    category: 'Leafy',
    badge: 'Leafy',
    emoji: '🌿',
    bgColor: '#F0FFF5', // Soft green
  }
];

export const CATEGORIES = ['All', 'Leafy', 'Root', 'Seasonal', 'Organic', 'Fruits'];

export const HEALTH_BENEFITS = [
  {
    id: 'tomato',
    emoji: '🍅',
    name: 'Tomato',
    benefit: 'Rich in Vitamin C',
    bgColor: 'bg-red-50 hover:bg-red-100/70',
    textColor: 'text-red-600',
    badgeColor: 'bg-red-100/50 text-red-700',
  },
  {
    id: 'carrot',
    emoji: '🥕',
    name: 'Carrot',
    benefit: 'Good for eyesight',
    bgColor: 'bg-orange-50 hover:bg-orange-100/70',
    textColor: 'text-orange-600',
    badgeColor: 'bg-orange-100/50 text-orange-700',
  },
  {
    id: 'spinach',
    emoji: '🌿',
    name: 'Spinach',
    benefit: 'High in iron',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100/70',
    textColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100/50 text-emerald-700',
  },
  {
    id: 'cucumber',
    emoji: '🥒',
    name: 'Cucumber',
    benefit: 'Hydrates the body',
    bgColor: 'bg-green-50 hover:bg-green-100/70',
    textColor: 'text-green-600',
    badgeColor: 'bg-green-100/50 text-green-700',
  },
  {
    id: 'beetroot',
    emoji: '🥬', // beetroot style
    name: 'Beetroot',
    benefit: 'Supports blood flow',
    bgColor: 'bg-pink-50 hover:bg-pink-100/70',
    textColor: 'text-pink-600',
    badgeColor: 'bg-pink-100/50 text-pink-700',
  },
  {
    id: 'broccoli',
    emoji: '🥦',
    name: 'Broccoli',
    benefit: 'Boosts immunity',
    bgColor: 'bg-lime-50 hover:bg-lime-100/70',
    textColor: 'text-lime-700',
    badgeColor: 'bg-lime-100/50 text-lime-800',
  },
  {
    id: 'lemon',
    emoji: '🍋',
    name: 'Lemon',
    benefit: 'Improves digestion',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100/70',
    textColor: 'text-yellow-600',
    badgeColor: 'bg-yellow-100/50 text-yellow-700',
  },
  {
    id: 'capsicum',
    emoji: '🫑',
    name: 'Capsicum',
    benefit: 'Packed with antioxidants',
    bgColor: 'bg-[#EAF6EA] hover:bg-green-100/70',
    textColor: 'text-[#2E7D32]',
    badgeColor: 'bg-green-100/50 text-green-700',
  }
];
