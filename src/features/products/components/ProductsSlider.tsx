'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Product, ProductsSliderProps } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import CurvedLoop from '@/components/ui/CurvedLoop'
import { WaveSeparator } from '@/components/ui/WaveSeparator'
import { PRODUCT_CONSTANTS } from '../constants'

export function ProductsSlider({ 
  products,
  onAddToCart,
  title = PRODUCT_CONSTANTS.DEFAULT_TEXTS.TITLE, 
  subtitle = PRODUCT_CONSTANTS.DEFAULT_TEXTS.SUBTITLE 
}: ProductsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [successStates, setSuccessStates] = useState<{ [key: string]: boolean }>({})

  const itemsPerPage = PRODUCT_CONSTANTS.SLIDER_CONFIG.ITEMS_PER_PAGE

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, PRODUCT_CONSTANTS.SLIDER_CONFIG.LOADING_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const currentProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleAddToCart = async (product: Product) => {
    if (loadingStates[product.id] || product.stock === 0) return
    
    setLoadingStates(prev => ({ ...prev, [product.id]: true }))
    
    try {
      // Simula delay de processamento
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Adiciona ao carrinho
      onAddToCart(product)
      
      // Mostra feedback de sucesso
      setSuccessStates(prev => ({ ...prev, [product.id]: true }))
      setLoadingStates(prev => ({ ...prev, [product.id]: false }))
      
      // Remove feedback de sucesso após 2 segundos
      setTimeout(() => {
        setSuccessStates(prev => ({ ...prev, [product.id]: false }))
      }, 2000)
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error)
      setLoadingStates(prev => ({ ...prev, [product.id]: false }))
    }
  }

  return (
    <>
      {/* Wave Separator */}
      <WaveSeparator 
        className="relative z-10"
        fillColor="#1f2937"
        height={120}
      />
      
      <section className="relative py-20 bg-linear-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* CurvedLoop Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* First curved text */}
        <div className="absolute top-20 left-0 w-full h-32 opacity-10">
          <CurvedLoop
            marqueeText="★ CREATIVE ★ MAKES ★ AGENTS ★ CMA ★"
            speed={1.5}
            curveAmount={200}
            direction="left"
            className="text-orange-400"
            interactive={false}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Products Grid with Side Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Left Navigation Button */}
          <motion.button
            onClick={prevSlide}
            disabled={totalPages <= 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Products Grid */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
              {isLoading ? (
                // Skeleton loading
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Card key={index} className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10">
                    <Skeleton className="w-full h-48 bg-white/10" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2 bg-white/10" />
                      <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                      <Skeleton className="h-4 w-1/2 mb-4 bg-white/10" />
                      <Skeleton className="h-4 w-1/3 mb-4 bg-white/10" />
                      <Skeleton className="h-10 w-full bg-white/10" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="aspect-w-16 aspect-h-12">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-50 h-48 mx-auto bg-white/10 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-48 bg-white/10 flex items-center justify-center">
                            <div className="text-center text-white/50">
                              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm">{PRODUCT_CONSTANTS.DEFAULT_TEXTS.NO_IMAGE}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-orange-400">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-sm text-gray-400">
                            {product.stock} {PRODUCT_CONSTANTS.DEFAULT_TEXTS.STOCK_TEXT}
                          </span>
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={loadingStates[product.id] || product.stock === 0}
                          className={`w-full text-white border-0 transition-all duration-300 ${
                            successStates[product.id] 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                          }`}
                        >
                          {loadingStates[product.id] ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adicionando...
                            </span>
                          ) : successStates[product.id] ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Adicionado!
                            </span>
                          ) : product.stock === 0 ? (
                            'Indisponível'
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              Adicionar ao Carrinho
                            </span>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Navigation Button */}
        <motion.button
          onClick={nextSlide}
          disabled={totalPages <= 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  </section>
    </>
  )
}

