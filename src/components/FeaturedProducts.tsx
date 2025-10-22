'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ShoppingCart } from 'lucide-react'
import { useCart } from '@/features/cart/context/CartContext'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

export function FeaturedProducts() {
  const { addToCart } = useCart()
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Mel Natural Premium",
      price: 29.90,
      description: "Mel 100% natural, extraído diretamente das colmeias com qualidade excepcional.",
      image: "/images/iconimg-01.png",
      category: "Mel",
      stock: 50
    },
    {
      id: "2", 
      name: "Mel Processado Premium",
      price: 34.90,
      description: "Mel processado com alta tecnologia, mantendo todas as propriedades naturais.",
      image: "/images/iconimg-02-1.png",
      category: "Mel",
      stock: 30
    },
    {
      id: "3",
      name: "Mel de Qualidade Superior",
      price: 39.90,
      description: "Nosso mel de melhor qualidade, selecionado pelos melhores apicultores.",
      image: "/images/iconimg-03-1.png",
      category: "Mel",
      stock: 25
    },
    {
      id: "4",
      name: "Mel Puro Líquido",
      price: 24.90,
      description: "Mel puro em estado líquido, perfeito para consumo direto ou receitas.",
      image: "/images/iconimg-04-1.png",
      category: "Mel",
      stock: 40
    }
  ]

  const handleAddToCart = async (product: Product) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }))
    
    // Simula delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 800))
    
    addToCart(product)
    setLoadingStates(prev => ({ ...prev, [product.id]: false }))
  }


  return (
    <section className="py-20 bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-45 right-40 opacity-60">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.9, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <img 
            src="/images/abtbee-02.png" 
            alt="Bee" 
            className="w-20 h-20 object-contain"
          />
        </motion.div>
      </div>
      
      <div className="absolute bottom-35 right-15 opacity-70">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -360 }}
          animate={{ 
            opacity: 1, 
            scale: 3, 
            rotate: 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <img 
            src="/images/sunflower-01.png" 
            alt="Sunflower"
            className="w-32 h-32 object-contain"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide"
          >
            POR QUE ESCOLHER A GENTE
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Lorem ipsum dolor
          </motion.h2>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="relative"
            >
              <div className="relative bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group" style={{
                borderRadius: '30px 30px 30px 150px / 30px 30px 0px 0px'
              }}>
                {/* Decorative circle top left */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
                
                {/* Product Image */}
                <div className="relative z-10 mb-4">
                  <div className="w-full h-32 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10 line-clamp-2">{product.name}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10 line-clamp-2">
                  {product.description}
                </p>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xl font-bold text-orange-600">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {product.stock} em estoque
                  </span>
                </div>

                {/* Number with line */}
                <div className="flex items-center mb-4 relative z-10">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="bg-gray-200 w-8 h-8 flex items-center justify-center ml-4 group-hover:bg-orange-300 transition-colors duration-300" style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                  }}>
                    <span className="text-sm font-bold text-gray-900">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-auto relative z-10">
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingStates[product.id] || product.stock === 0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-orange-400 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingStates[product.id] ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adicionando...
                      </>
                    ) : product.stock === 0 ? (
                      'Indisponível'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </motion.button>
                </div>
                
                {/* Decorative circle bottom right */}
                <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-orange-50 rounded-full opacity-30"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}