'use client'

import { useCart } from '@/features/cart/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function OrderSummary() {
  const { cart } = useCart()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent>

      {/* Lista de itens */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-3">
            {/* Imagem do produto */}
            <div className="flex-shrink-0">
              {imageErrors[item.product.id] ? (
                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-md"
                  onError={() => handleImageError(item.product.id)}
                />
              )}
            </div>

            {/* Informações do produto */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">
                {item.product.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Qtd: {item.quantity}
              </p>
            </div>

            {/* Preço */}
            <div className="text-sm font-medium text-foreground">
              {formatCurrency(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

        {/* Total */}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">
            Total:
          </span>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(cart.total)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
