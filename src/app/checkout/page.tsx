'use client'

import { CheckoutClient } from '@/features/checkout/components/CheckoutClient'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { CheckCircle, Lock, Zap } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      {/* Background com padrão geométrico */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-orange-900 dark:to-gray-800 relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Header minimalista */}
        <div className="relative z-10 pt-8 md:pt-16 pb-4 md:pb-8">
          <motion.div 
            className="text-center mb-8 md:mb-16 px-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4 md:mb-6">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-3 md:mb-4 tracking-tight">
              Checkout
            </h1>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Badges de confiança minimalistas */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 mb-8 md:mb-16 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Lock className="w-4 h-4 text-orange-600" />
              <span className="text-xs md:text-sm font-light">SSL Seguro</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-xs md:text-sm font-light">Pagamento Instantâneo</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-orange-600" />
              <span className="text-xs md:text-sm font-light">Garantia Total</span>
            </div>
          </motion.div>
        </div>

        {/* Container principal com glassmorphism */}
        <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 pb-8 md:pb-16">
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-orange-200 dark:border-orange-800 shadow-2xl p-4 md:p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CheckoutClient />
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl"></div>
      </div>
    </ProtectedRoute>
  )
}
