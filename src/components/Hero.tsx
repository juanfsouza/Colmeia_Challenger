'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { TextAnimate } from './ui/text-animate'

export function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-[10vh] lg:min-h-[120vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg-hero.png"
          alt="Background Hero"
          className="object-cover w-full"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-start justify-center min-h-[60vh] max-w-8xl mx-auto">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >  
            </motion.div>

            <TextAnimate
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-black lg:text-white mb-6 leading-tight drop-shadow-2xl"
                by="character"
                animation="slideDown"
                delay={0.9}
              >
                Bem-vindo
              </TextAnimate>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-xl md:text-2xl lg:text-white text-black  mb-8 max-w-2xl leading-relaxed drop-shadow-lg"
            >
              Descubra produtos incríveis com qualidade excepcional e preços que cabem no seu bolso
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <button
                onClick={scrollToProducts}
                className="group bg-linear-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:from-yellow-300 hover:via-yellow-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 border-2 border-transparent hover:border-yellow-300"
              >
                <span className="flex items-center gap-2">
                  Ver Produtos em Destaque
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </button>
              <button
                onClick={scrollToProducts}
                className="group border-2 border-white/30 text-black  lg:text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-xl hover:shadow-white/10"
              >
                <span className="flex items-center gap-2">
                  Ver Todos os Produtos
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Role para baixo</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </motion.div>
    </div>
  )
}
