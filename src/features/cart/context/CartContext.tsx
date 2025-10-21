'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, CartItem, Cart } from '@/types'
import { getFromStorage, setToStorage } from '@/lib/utils'

// Interface do contexto do carrinho
interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  // Estado do carrinho
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0
  })

  // Adiciona produto ao carrinho
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...prevCart.items, { product, quantity }]
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      
      const newCart = { items: newItems, total: newTotal }
      setToStorage('cart', newCart)
      
      return newCart
    })
  }

  // Remove produto do carrinho
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId)
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      
      const newCart = { items: newItems, total: newTotal }
      setToStorage('cart', newCart)
      
      return newCart
    })
  }

  // Atualiza quantidade de um produto no carrinho
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      
      const newCart = { items: newItems, total: newTotal }
      setToStorage('cart', newCart)
      
      return newCart
    })
  }

  // Limpa todo o carrinho
  const clearCart = () => {
    const newCart = { items: [], total: 0 }
    setCart(newCart)
    setToStorage('cart', newCart)
  }

  // Calcula total de itens no carrinho
  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  // Retorna o preço total do carrinho
  const getTotalPrice = () => {
    return cart.total
  }

  // Carrega carrinho do localStorage ao inicializar
  useEffect(() => {
    const storedCart = getFromStorage<Cart>('cart')
    if (storedCart) {
      setCart(storedCart)
    }
  }, [])

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
