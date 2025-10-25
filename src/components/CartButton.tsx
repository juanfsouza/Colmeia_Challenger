'use client'

import { useCart } from '@/features/cart/context/CartContext'
import { useState } from 'react'
import { CartSidebar } from '@/features/cart/components/CartSidebar'

export function CartButton() {
  const { items } = useCart()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const totalItems = items && Array.isArray(items) 
    ? items.reduce((sum, item) => sum + (item?.quantity || 0), 0)
    : 0

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md transition-colors"
        aria-label={`Abrir carrinho com ${totalItems} itens`}
      >
        {/* Ícone do carrinho */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
        </svg>
        
        {/* Badge com número de itens */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {/* Sidebar do carrinho */}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}
