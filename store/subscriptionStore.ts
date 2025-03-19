import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  category: string;
  nextPayment: string;
  createdAt: string;
}

interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'createdAt' | 'nextPayment'>) => Promise<void>;
  removeSubscription: (id: string) => Promise<void>;
  loadSubscriptions: () => Promise<void>;
  getTotalMonthly: () => number;
  getSubscriptionsByCategory: () => { name: string; percentage: number; color: string }[];
}

const STORAGE_KEY = '@subscriptions';

const calculateNextPayment = (billingCycle: Subscription['billingCycle']) => {
  const today = new Date();
  switch (billingCycle) {
    case 'monthly':
      return format(new Date(today.setMonth(today.getMonth() + 1)), 'yyyy-MM-dd');
    case 'yearly':
      return format(new Date(today.setFullYear(today.getFullYear() + 1)), 'yyyy-MM-dd');
    case 'quarterly':
      return format(new Date(today.setMonth(today.getMonth() + 3)), 'yyyy-MM-dd');
  }
};

const categoryColors = {
  streaming: '#007AFF',
  music: '#34C759',
  cloud: '#FF9500',
  other: '#FF3B30',
};

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscriptions: [],

  addSubscription: async (subscription) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      nextPayment: calculateNextPayment(subscription.billingCycle),
    };

    const subscriptions = [...get().subscriptions, newSubscription];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
    set({ subscriptions });
  },

  removeSubscription: async (id) => {
    const subscriptions = get().subscriptions.filter((s) => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
    set({ subscriptions });
  },

  loadSubscriptions: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ subscriptions: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  },

  getTotalMonthly: () => {
    return get().subscriptions.reduce((total, sub) => {
      switch (sub.billingCycle) {
        case 'monthly':
          return total + sub.price;
        case 'yearly':
          return total + sub.price / 12;
        case 'quarterly':
          return total + sub.price / 3;
        default:
          return total;
      }
    }, 0);
  },

  getSubscriptionsByCategory: () => {
    const subscriptions = get().subscriptions;
    const totalMonthly = get().getTotalMonthly();
    
    const categories = subscriptions.reduce((acc, sub) => {
      const monthlyPrice = sub.billingCycle === 'monthly' 
        ? sub.price 
        : sub.billingCycle === 'yearly' 
          ? sub.price / 12 
          : sub.price / 3;

      acc[sub.category] = (acc[sub.category] || 0) + monthlyPrice;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, amount]) => ({
      name,
      percentage: Math.round((amount / totalMonthly) * 100),
      color: categoryColors[name as keyof typeof categoryColors] || '#8E8E93',
    }));
  },
}));