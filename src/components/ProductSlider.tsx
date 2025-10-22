'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductSliderProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  title?: string
  subtitle?: string
}

export function ProductSlider({ products, onAddToCart, title = "Produtos em Destaque", subtitle = "Confira nossa seleção especial" }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const itemsPerPage = 3
  const maxIndex = Math.max(0, Math.ceil(products.length / itemsPerPage) - 1)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  const currentProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  if (products.length === 0) return null

  return (
    <div className="w-full">
      {/* Header do Slider */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Container do Slider */}
      <div className="relative">
        {/* Botões de navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background backdrop-blur-sm border border-border rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Produto anterior"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background backdrop-blur-sm border border-border rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Próximo produto"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Área do slide */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                // Skeleton loading
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-1/3 mb-4" />
                      <Skeleton className="h-10 w-full" />
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
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                        {imageErrors[product.id] ? (
                          <div className="w-full h-48 bg-muted flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm">Sem imagem</p>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={() => handleImageError(product.id)}
                          />
                        )}
                        
                        {/* Overlay com efeito hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {product.stock} em estoque
                          </span>
                        </div>

                        <Button
                          onClick={() => onAddToCart(product)}
                          disabled={product.stock === 0}
                          className="w-full group-hover:bg-primary/90 transition-all duration-300"
                        >
                          {product.stock === 0 ? (
                            'Indisponível'
                          ) : (
                            'Adicionar ao Carrinho'
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

        {/* Indicadores de página */}
        {products.length > itemsPerPage && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Auto-play indicator */}
      {products.length > itemsPerPage && (
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Use as setas ou clique nos pontos para navegar
          </p>
        </div>
      )}
    </div>
  )
}
