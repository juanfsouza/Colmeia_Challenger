'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentMethodType, PixData, CreditCardData, BoletoData } from '@/types'
import { CreditCardFormData, PixFormData } from '@/lib/validations'
import { creditCardSchema, pixSchema } from '@/lib/validations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { CreditCard, Zap, FileText, Lock, User, Calendar, Shield } from 'lucide-react'

interface PaymentFormProps {
  selectedMethod: PaymentMethodType | null
  onSubmit: (data: { type: 'pix' | 'credit_card' | 'boleto'; data: PixData | CreditCardData | BoletoData }) => void
  isLoading: boolean
}

export function PaymentForm({ selectedMethod, onSubmit, isLoading }: PaymentFormProps) {
  const [formData, setFormData] = useState<{ type?: 'pix' | 'credit_card' | 'boleto'; data?: PixData | CreditCardData | BoletoData }>({})

  const creditCardForm = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    }
  })

  const pixForm = useForm<PixFormData>({
    resolver: zodResolver(pixSchema),
    defaultValues: {
      key: ''
    }
  })

  const handleCreditCardSubmit = (data: CreditCardFormData) => {
    onSubmit({ type: 'credit_card', data })
  }

  const handlePixSubmit = (data: PixFormData) => {
    onSubmit({ type: 'pix', data })
  }

  const formatCreditCardNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')
    return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, '')
    return cleanValue.replace(/(\d{2})(?=\d)/g, '$1/')
  }

  if (!selectedMethod) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-orange-200 dark:border-orange-800 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="pt-16 pb-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-orange-200">
                <CreditCard className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-4">
                Selecione um método de pagamento
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
                Escolha como deseja pagar seu pedido
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
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
            <Lock className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-3 md:mr-4 text-orange-600" />
            Dados do Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 lg:p-8">

        {selectedMethod === 'credit_card' && (
          <motion.form 
            onSubmit={creditCardForm.handleSubmit(handleCreditCardSubmit)} 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Número do cartão */}
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="number" className="text-sm md:text-base font-light text-gray-900 dark:text-white flex items-center">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-orange-600" />
                Número do Cartão
              </Label>
              <Input
                {...creditCardForm.register('number')}
                type="text"
                id="number"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="h-12 md:h-14 text-base md:text-lg font-mono tracking-wider bg-white/50 dark:bg-gray-700/50 border-orange-200 dark:border-orange-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 backdrop-blur-sm rounded-xl md:rounded-2xl"
                onChange={(e) => {
                  const formatted = formatCreditCardNumber(e.target.value)
                  e.target.value = formatted
                  creditCardForm.setValue('number', formatted)
                }}
              />
              {creditCardForm.formState.errors.number && (
                <p className="text-xs md:text-sm text-red-600 flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  {String(creditCardForm.formState.errors.number.message)}
                </p>
              )}
            </div>

            {/* Nome no cartão */}
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="name" className="text-sm md:text-base font-light text-gray-900 dark:text-white flex items-center">
                <User className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-orange-600" />
                Nome no Cartão
              </Label>
              <Input
                {...creditCardForm.register('name')}
                type="text"
                id="name"
                placeholder="JOÃO SILVA"
                className="h-12 md:h-14 text-base md:text-lg uppercase bg-white/50 dark:bg-gray-700/50 border-orange-200 dark:border-orange-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 backdrop-blur-sm rounded-xl md:rounded-2xl"
              />
              {creditCardForm.formState.errors.name && (
                <p className="text-xs md:text-sm text-red-600 flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  {String(creditCardForm.formState.errors.name.message)}
                </p>
              )}
            </div>

            {/* Data de validade e CVV */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="expiry" className="text-sm md:text-base font-light text-gray-900 dark:text-white flex items-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-orange-600" />
                  Validade
                </Label>
                <Input
                  {...creditCardForm.register('expiry')}
                  type="text"
                  id="expiry"
                  placeholder="MM/AA"
                  maxLength={5}
                  className="h-12 md:h-14 text-base md:text-lg font-mono bg-white/50 dark:bg-gray-700/50 border-orange-200 dark:border-orange-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 backdrop-blur-sm rounded-xl md:rounded-2xl"
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value)
                    e.target.value = formatted
                    creditCardForm.setValue('expiry', formatted)
                  }}
                />
                {creditCardForm.formState.errors.expiry && (
                  <p className="text-xs md:text-sm text-red-600 flex items-center">
                    <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    {String(creditCardForm.formState.errors.expiry.message)}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:space-y-3">
                <Label htmlFor="cvv" className="text-sm md:text-base font-light text-gray-900 dark:text-white flex items-center">
                  <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-orange-600" />
                  CVV
                </Label>
                <Input
                  {...creditCardForm.register('cvv')}
                  type="text"
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  className="h-12 md:h-14 text-base md:text-lg font-mono bg-white/50 dark:bg-gray-700/50 border-orange-200 dark:border-orange-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 backdrop-blur-sm rounded-xl md:rounded-2xl"
                />
                {creditCardForm.formState.errors.cvv && (
                  <p className="text-xs md:text-sm text-red-600 flex items-center">
                    <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    {String(creditCardForm.formState.errors.cvv.message)}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 md:h-16 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base md:text-lg font-light rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 md:mr-3"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center">
                  <Lock className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Confirmar Pagamento
                </div>
              )}
            </Button>
          </motion.form>
        )}

        {selectedMethod === 'pix' && (
          <motion.form 
            onSubmit={pixForm.handleSubmit(handlePixSubmit)} 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="key" className="text-sm md:text-base font-light text-gray-900 dark:text-white flex items-center">
                <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-600" />
                Chave PIX
              </Label>
              <Input
                {...pixForm.register('key')}
                type="text"
                id="key"
                placeholder="Digite sua chave PIX (CPF, email, telefone ou chave aleatória)"
                className="h-12 md:h-14 text-base md:text-lg bg-white/50 dark:bg-gray-700/50 border-orange-200 dark:border-orange-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 backdrop-blur-sm rounded-xl md:rounded-2xl"
              />
              {pixForm.formState.errors.key && (
                <p className="text-xs md:text-sm text-red-600 flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  {String(pixForm.formState.errors.key.message)}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-base md:text-lg font-light rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 md:mr-3"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Gerar PIX
                </div>
              )}
            </Button>
          </motion.form>
        )}

        {selectedMethod === 'boleto' && (
          <motion.div 
            className="text-center py-8 md:py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 backdrop-blur-sm border border-orange-200">
              <FileText className="w-8 h-8 md:w-12 md:h-12 text-orange-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-3 md:mb-4">
              Boleto Bancário
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 md:mb-10 text-base md:text-lg font-light">
              O boleto será gerado após a confirmação do pedido
            </p>
            
            <Button
              onClick={() => onSubmit({ type: 'boleto', data: {} })}
              disabled={isLoading}
              className="w-full h-12 md:h-16 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base md:text-lg font-light rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 md:mr-3"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Gerar Boleto
                </div>
              )}
            </Button>
          </motion.div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
