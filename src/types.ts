export interface Product {
  id: string;
  gujaratiName: string;
  englishName: string;
  price: number; // Base price for the base unit (KG or DOZEN)
  baseUnit: 'KG' | 'DOZEN';
  availableUnits: ('KG' | 'GRAM' | 'DOZEN')[];
  category: string; // 'Leafy' | 'Root' | 'Seasonal' | 'Organic' | 'Fruits'
  badge: 'Fresh Today' | 'Organic' | 'Seasonal' | 'Leafy' | 'Root' | 'Fruits';
  emoji: string;
  bgColor: string;
}

export interface Profile {
  name: string;
  phone: string;
  address: string;
}

export interface CartItem {
  id: string; // product id
  quantity: number;
  unit: 'KG' | 'GRAM' | 'DOZEN';
}
