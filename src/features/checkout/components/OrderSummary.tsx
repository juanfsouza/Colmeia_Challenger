'use client'

import { useCart } from '@/features/cart/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { Package, ShoppingCart } from 'lucide-react'

export function OrderSummary() {
  const { items, total } = useCart()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-orange-200 dark:border-orange-800 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm border-b border-orange-200 dark:border-orange-800 p-4 md:p-6 lg:p-8">
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-light text-gray-900 dark:text-white flex items-center">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-3 md:mr-4 text-orange-600" />
            Resumo do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 lg:p-8">

        {/* Lista de itens */}
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          {(items || []).map((item, index) => (
            <motion.div 
              key={item.product.id} 
              className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-orange-50/50 dark:bg-orange-900/20 backdrop-blur-sm rounded-xl md:rounded-2xl hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-all duration-300 border border-orange-200/50 dark:border-orange-800/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Imagem do produto */}
              <div className="flex-shrink-0">
                {imageErrors[item.product.id] ? (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-orange-200">
                    <Package className="w-5 h-5 md:w-7 md:h-7 text-orange-600" />
                  </div>
                ) : (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl md:rounded-2xl shadow-lg border border-orange-200"
                    onError={() => handleImageError(item.product.id)}
                  />
                )}
              </div>

              {/* Informações do produto */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-light text-gray-900 dark:text-white truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatCurrency(item.product.price)} cada
                </p>
              </div>

              {/* Preço */}
              <div className="text-right">
                <div className="text-sm md:text-base font-light text-gray-900 dark:text-white">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

          {/* Total */}
          <Separator className="my-4 md:my-6 lg:my-8 border-orange-200 dark:border-orange-800" />
          <motion.div 
            className="flex justify-between items-center p-4 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 backdrop-blur-sm rounded-xl md:rounded-2xl border border-orange-200 dark:border-orange-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <span className="text-lg md:text-xl lg:text-2xl font-light text-gray-900 dark:text-white">
              Total:
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              {formatCurrency(total || 0)}
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
