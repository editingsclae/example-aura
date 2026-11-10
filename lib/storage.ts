'use client';

// Typed storage helpers using useSyncExternalStore for hydration-safe persistence

export interface CartItem {
  id: number;
  qty: number;
  size?: string;
}

export interface User {
  fname: string;
  lname: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  password?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  img?: string;
  cat?: string;
  size?: string;
}

export interface Order {
  number: string | number;
  placed: string;
  itemsCount: number;
  qty: number;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: string;
  status: 'ORDER PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  shippingInfo: {
    name: string;
    address: string;
    method: string;
    phone: string;
  };
  paymentInfo: {
    merchant: string;
    paymentMethod: string;
    fulfillment: string;
    email: string;
  };
}

export const DEFAULT_USER: User = {
  fname: 'alouini',
  lname: 'firas',
  email: '979adriaens@fldubai.com',
  phone: '20514118',
  address: 'Av Monji Slim',
  city: 'Tunis',
  zip: '1000',
  country: 'Tunisia (TN)',
  password: 'Password123'
};

export const INITIAL_ORDERS: Order[] = [
  {
    number: 52,
    placed: 'Nov 1, 2026',
    itemsCount: 1,
    qty: 1,
    items: [
      {
        id: 1,
        name: 'Cream Cleanser',
        qty: 1,
        unitPrice: 563.0,
        totalPrice: 563.0,
        cat: 'Cleansers',
        size: '150 ml',
        img: '/assets/aistudio/product-cleanser_5602b3f2.png'
      }
    ],
    subtotal: 563.0,
    shippingCost: 10.0,
    total: 573.0,
    currency: 'TND',
    status: 'ORDER PLACED',
    shippingInfo: {
      name: 'alouini firas',
      address: 'Av Monji Slim, Tunis, 1000',
      method: 'Aramex',
      phone: '+21620514118'
    },
    paymentInfo: {
      merchant: 'ZARA',
      paymentMethod: 'Pay on delivery',
      fulfillment: 'ORDER PLACED',
      email: '979adriaens@fldubai.com'
    }
  }
];

// ───────────────────────────────────────────────
// CART STORE
// ───────────────────────────────────────────────
const CART_KEY = 'aura-cart';
let cartMemoryCache: CartItem[] = [];
let cartRawString: string | null = null;
const cartListeners = new Set<() => void>();

const emptyCartServer: CartItem[] = [];

export function getCartSnapshot(): CartItem[] {
  if (typeof window === 'undefined') return emptyCartServer;
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw || raw === '[]') {
      cartRawString = raw;
      return emptyCartServer;
    }
    if (raw !== cartRawString) {
      cartRawString = raw;
      cartMemoryCache = JSON.parse(raw);
    }
    return cartMemoryCache;
  } catch {
    return emptyCartServer;
  }
}

export function getCartServerSnapshot(): CartItem[] {
  return emptyCartServer;
}

export function subscribeCart(callback: () => void) {
  cartListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CART_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    cartListeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function writeCartToStorage(items: CartItem[]) {
  cartMemoryCache = items;
  cartRawString = JSON.stringify(items);
  try {
    localStorage.setItem(CART_KEY, cartRawString);
  } catch {
    // ignore
  }
  cartListeners.forEach((l) => l());
}

// ───────────────────────────────────────────────
// AUTH USER STORE
// ───────────────────────────────────────────────
const USER_KEY = 'aura-user';
let userMemoryCache: User = DEFAULT_USER;
let userRawString: string | null = null;
const userListeners = new Set<() => void>();

export function getUserSnapshot(): User {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return DEFAULT_USER;
    if (raw !== userRawString) {
      userRawString = raw;
      userMemoryCache = JSON.parse(raw);
    }
    return userMemoryCache;
  } catch {
    return DEFAULT_USER;
  }
}

export function getUserServerSnapshot(): User {
  return DEFAULT_USER;
}

export function subscribeUser(callback: () => void) {
  userListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === USER_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    userListeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function writeUserToStorage(u: User) {
  userMemoryCache = u;
  userRawString = JSON.stringify(u);
  try {
    localStorage.setItem(USER_KEY, userRawString);
  } catch {
    // ignore
  }
  userListeners.forEach((l) => l());
}

// ───────────────────────────────────────────────
// AUTH LOGGED IN STORE
// ───────────────────────────────────────────────
const LOGGED_IN_KEY = 'aura-logged-in';
let loggedInCache = true;
let loggedInRaw: string | null = null;
const loggedInListeners = new Set<() => void>();

export function getLoggedInSnapshot(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(LOGGED_IN_KEY);
    if (raw === null) return true;
    if (raw !== loggedInRaw) {
      loggedInRaw = raw;
      loggedInCache = raw === '1';
    }
    return loggedInCache;
  } catch {
    return true;
  }
}

export function getLoggedInServerSnapshot(): boolean {
  return true;
}

export function subscribeLoggedIn(callback: () => void) {
  loggedInListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === LOGGED_IN_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    loggedInListeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function writeLoggedInToStorage(status: boolean) {
  loggedInCache = status;
  loggedInRaw = status ? '1' : '0';
  try {
    localStorage.setItem(LOGGED_IN_KEY, loggedInRaw);
  } catch {
    // ignore
  }
  loggedInListeners.forEach((l) => l());
}

// ───────────────────────────────────────────────
// ORDERS STORE
// ───────────────────────────────────────────────
const ORDERS_KEY = 'aura-orders';
let ordersMemoryCache: Order[] = INITIAL_ORDERS;
let ordersRawString: string | null = null;
const ordersListeners = new Set<() => void>();

export function getOrdersSnapshot(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return INITIAL_ORDERS;
    if (raw !== ordersRawString) {
      ordersRawString = raw;
      ordersMemoryCache = JSON.parse(raw);
    }
    return ordersMemoryCache;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function getOrdersServerSnapshot(): Order[] {
  return INITIAL_ORDERS;
}

export function subscribeOrders(callback: () => void) {
  ordersListeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === ORDERS_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    ordersListeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function writeOrdersToStorage(o: Order[]) {
  ordersMemoryCache = o;
  ordersRawString = JSON.stringify(o);
  try {
    localStorage.setItem(ORDERS_KEY, ordersRawString);
  } catch {
    // ignore
  }
  ordersListeners.forEach((l) => l());
}
