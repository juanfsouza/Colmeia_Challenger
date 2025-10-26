'use client'

import { motion } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 border-t border-orange-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
                   <motion.div
                     className="lg:col-span-1"
                     variants={itemVariants}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                   >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Comeia Store
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Sua loja especializada em mel artesanal de qualidade premium. 
                Descubra sabores únicos e naturais que transformam qualquer momento em uma experiência especial.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
                   <motion.div 
                     variants={itemVariants}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                   >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/products" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="/checkout" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Checkout
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Customer Service */}
                   <motion.div 
                     variants={itemVariants}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                   >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Atendimento</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Política de Troca
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Rastreamento de Pedido
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
                    Garantia
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
                   <motion.div 
                     variants={itemVariants}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                   >
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Rua das Flores, 123<br />
                      Centro, São Paulo - SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a 
                    href="tel:+5511999999999" 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    (11) 99999-9999
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a 
                    href="mailto:contato@comeiastore.com" 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    contato@comeiastore.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-orange-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Comeia Store. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">Formas de Pagamento:</span>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">PIX • Cartão • Boleto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-xl"></div>
    </footer>
  )
}
