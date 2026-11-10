'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import {
  Order,
  OrderItem,
  subscribeOrders,
  getOrdersSnapshot,
  getOrdersServerSnapshot,
  writeOrdersToStorage
} from '@/lib/storage';

export type { Order, OrderItem };

export interface OrderContextType {
  orders: Order[];
  createOrder: (data: Omit<Order, 'number' | 'placed' | 'status'>) => Order;
  getOrder: (num: string | number) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const orders = useSyncExternalStore(subscribeOrders, getOrdersSnapshot, getOrdersServerSnapshot);

  const createOrder = (data: Omit<Order, 'number' | 'placed' | 'status'>): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNo = `AURA-${randomNum}`;
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      ...data,
      number: orderNo,
      placed: today,
      status: 'ORDER PLACED'
    };

    const updated = [newOrder, ...orders];
    writeOrdersToStorage(updated);

    return newOrder;
  };

  const getOrder = (num: string | number) => {
    return orders.find((o) => String(o.number) === String(num));
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
