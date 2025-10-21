'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentMethodType } from '@/types'
import { CreditCardData, PixData } from '@/lib/validations'
import { creditCardSchema, pixSchema } from '@/lib/validations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PaymentFormProps {
  selectedMethod: PaymentMethodType | null
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function PaymentForm({ selectedMethod, onSubmit, isLoading }: PaymentFormProps) {
  const [formData, setFormData] = useState<any>({})

  const creditCardForm = useForm<CreditCardData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    }
  })

  const pixForm = useForm<PixData>({
    resolver: zodResolver(pixSchema),
    defaultValues: {
      key: ''
    }
  })

  const handleCreditCardSubmit = (data: CreditCardData) => {
    onSubmit({ type: 'credit_card', data })
  }

  const handlePixSubmit = (data: PixData) => {
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
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500 text-center">
            Selecione um método de pagamento
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Pagamento</CardTitle>
      </CardHeader>
      <CardContent>

      {selectedMethod === 'credit_card' && (
        <form onSubmit={creditCardForm.handleSubmit(handleCreditCardSubmit)} className="space-y-4">
          {/* Número do cartão */}
          <div>
            <Label htmlFor="number">Número do Cartão</Label>
            <Input
              {...creditCardForm.register('number')}
              type="text"
              id="number"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onChange={(e) => {
                const formatted = formatCreditCardNumber(e.target.value)
                e.target.value = formatted
                creditCardForm.setValue('number', formatted)
              }}
            />
            {creditCardForm.formState.errors.number && (
              <p className="mt-1 text-sm text-red-600">
                {String(creditCardForm.formState.errors.number.message)}
              </p>
            )}
          </div>

          {/* Nome no cartão */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome no Cartão
            </label>
            <input
              {...creditCardForm.register('name')}
              type="text"
              id="name"
              placeholder="JOÃO SILVA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {creditCardForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {String(creditCardForm.formState.errors.name.message)}
              </p>
            )}
          </div>

          {/* Data de validade e CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                Validade
              </label>
              <input
                {...creditCardForm.register('expiry')}
                type="text"
                id="expiry"
                placeholder="MM/AA"
                maxLength={5}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value)
                  e.target.value = formatted
                  creditCardForm.setValue('expiry', formatted)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {creditCardForm.formState.errors.expiry && (
                <p className="mt-1 text-sm text-red-600">
                  {String(creditCardForm.formState.errors.expiry.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                {...creditCardForm.register('cvv')}
                type="text"
                id="cvv"
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {creditCardForm.formState.errors.cvv && (
                <p className="mt-1 text-sm text-red-600">
                  {String(creditCardForm.formState.errors.cvv.message)}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
          </Button>
        </form>
      )}

      {selectedMethod === 'pix' && (
        <form onSubmit={pixForm.handleSubmit(handlePixSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="key">Chave PIX</Label>
            <Input
              {...pixForm.register('key')}
              type="text"
              id="key"
              placeholder="Digite sua chave PIX (CPF, email, telefone ou chave aleatória)"
            />
            {pixForm.formState.errors.key && (
              <p className="mt-1 text-sm text-red-600">
                {String(pixForm.formState.errors.key.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processando...' : 'Gerar PIX'}
          </Button>
        </form>
      )}

      {selectedMethod === 'boleto' && (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium mb-2">Boleto Bancário</p>
            <p className="text-sm text-gray-600">
              O boleto será gerado após a confirmação do pedido
            </p>
          </div>
          
          <Button
            onClick={() => onSubmit({ type: 'boleto', data: {} })}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processando...' : 'Gerar Boleto'}
          </Button>
        </div>
      )}
      </CardContent>
    </Card>
  )
}
