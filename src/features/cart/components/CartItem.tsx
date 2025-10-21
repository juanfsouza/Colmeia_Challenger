'use client'

import { useState } from 'react'
import { CartItem as CartItemType } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '../context/CartContext'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-border">
      {/* Imagem do produto */}
      <div className="flex-shrink-0">
        {imageError ? (
          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded-md"
            onError={handleImageError}
          />
        )}
      </div>

      {/* Informações do produto */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">
          {item.product.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.product.price)}
        </p>
        
        {/* Controles de quantidade */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <span className="text-muted-foreground">-</span>
          </button>
          
          <span className="text-sm font-medium w-8 text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <span className="text-muted-foreground">+</span>
          </button>
        </div>
      </div>

      {/* Preço total e botão remover */}
      <div className="flex flex-col items-end space-y-2">
        <p className="text-sm font-medium text-foreground">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
        
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-destructive hover:text-destructive/80 text-sm transition-colors"
        >
          Remover
        </button>
      </div>
    </div>
  )
}
