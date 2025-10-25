'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, User, LogOut, Package } from 'lucide-react'
import { useAuth } from '@/features/auth/context/AuthContext'
import { useCart } from '@/features/cart/context/CartContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TextAnimate } from '@/components/ui/text-animate'
import { CartSidebar } from '@/features/cart/components/CartSidebar'

export function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getTotalItems = () => {
    if (!items || !Array.isArray(items)) {
      return 0
    }
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/40 dark:bg-gray-900/95 backdrop-blur-md shadow-lg dark:border-gray-700' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <TextAnimate
                className={`text-xl font-bold transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white drop-shadow-lg'
                }`}
                by="character"
                animation="slideUp"
                delay={0.1}
              >
                Creative Makes Agents
              </TextAnimate>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className={`relative transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    : 'text-white hover:text-white/80'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className={`text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-white drop-shadow-md'
                  }`}>
                    {user?.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={`text-sm transition-colors ${
                    isScrolled
                      ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sair
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Cart Button Mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className={`relative transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-white'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-white'
                }`}
                aria-label="Abrir menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Menu Panel */}
            <motion.div 
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 shadow-xl border-l border-gray-200 dark:border-gray-700"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="pt-20 px-6">
                {/* Close Button */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-label="Fechar menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Info */}
                <motion.div 
                  className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">{user?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Usuário logado</p>
                  </div>
                </motion.div>

                {/* Menu Items */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-14 px-4 text-base hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                      onClick={() => {
                        router.push('/products')
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <Package className="h-5 w-5 mr-4" />
                      Produtos
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-14 px-4 text-base hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                      onClick={() => {
                        router.push('/checkout')
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-4" />
                      Checkout
                    </Button>
                  </motion.div>

                  <motion.div 
                    className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-left h-14 px-4 text-base text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-4" />
                      Sair
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}