'use client'

import { PaymentMethodType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { motion } from 'framer-motion'
import { CreditCard, Zap, FileText } from 'lucide-react'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null
  onMethodChange: (method: PaymentMethodType) => void
}

const paymentMethods = [
  {
    type: 'pix' as PaymentMethodType,
    name: 'PIX',
    description: 'Pagamento instantâneo',
    icon: Zap,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    type: 'credit_card' as PaymentMethodType,
    name: 'Cartão de Crédito',
    description: 'Visa, Mastercard, Elo',
    icon: CreditCard,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    type: 'boleto' as PaymentMethodType,
    name: 'Boleto Bancário',
    description: 'Vencimento em 3 dias úteis',
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400'
  }
]

export function PaymentMethodSelector({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-orange-200 dark:border-orange-800 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm border-b border-orange-200 dark:border-orange-800 p-4 md:p-6 lg:p-8">
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-light text-gray-900 dark:text-white flex items-center">
            <CreditCard className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-3 md:mr-4 text-orange-600" />
            Método de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 lg:p-8">
          <RadioGroup value={selectedMethod || ''} onValueChange={onMethodChange}>
            <div className="space-y-3 md:space-y-4">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon
                const isSelected = selectedMethod === method.type
                
                return (
                  <motion.div 
                    key={method.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <RadioGroupItem 
                        value={method.type} 
                        id={method.type}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                      <Label
                        htmlFor={method.type}
                        className={`flex items-center space-x-3 md:space-x-4 lg:space-x-6 p-3 md:p-4 lg:p-6 border-2 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 flex-1 backdrop-blur-sm ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/20 shadow-xl' 
                            : 'border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/30 dark:hover:bg-orange-900/10'
                        }`}
                      >
                        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-orange-200 dark:border-orange-800 ${
                          method.type === 'pix' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' :
                          method.type === 'credit_card' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' :
                          'bg-gradient-to-r from-orange-500/20 to-amber-500/20'
                        }`}>
                          <IconComponent className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${
                            method.type === 'pix' ? 'text-green-600' :
                            method.type === 'credit_card' ? 'text-blue-600' :
                            'text-orange-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-light text-gray-900 dark:text-white text-base md:text-lg lg:text-xl">
                            {method.name}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-light">
                            {method.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center"
                          >
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                          </motion.div>
                        )}
                      </Label>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  )
}
