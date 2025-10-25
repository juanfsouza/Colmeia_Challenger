'use client'

import { useCart } from '../context/CartContext'
import { CartItem } from './CartItem'
import { formatCurrency } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CartItem as CartItemType } from '@/types'
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  const getTotalItems = () => {
    if (!items || !Array.isArray(items)) {
      return 0
    }
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const handleCheckout = () => {
    router.push('/checkout')
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl z-[55] border-l border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Carrinho
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2"
                  aria-label="Fechar carrinho"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {(items || []).length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6"
                    >
                      <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Seu carrinho está vazio
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Adicione alguns produtos deliciosos para começar
                      </p>
                      <Button
                        onClick={() => {
                          router.push('/products')
                          onClose()
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Ver Produtos
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {(items || []).map((item: CartItemType, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CartItem item={item} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {(items || []).length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total: {formatCurrency(total || 0)}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Finalizar Compra</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      onClick={() => {
                        router.push('/products')
                        onClose()
                      }}
                      variant="outline"
                      className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}