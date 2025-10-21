'use client'

import { PaymentMethodType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null
  onMethodChange: (method: PaymentMethodType) => void
}

const paymentMethods = [
  {
    type: 'pix' as PaymentMethodType,
    name: 'PIX',
    description: 'Pagamento instantâneo',
    icon: '⚡'
  },
  {
    type: 'credit_card' as PaymentMethodType,
    name: 'Cartão de Crédito',
    description: 'Visa, Mastercard, Elo',
    icon: '💳'
  },
  {
    type: 'boleto' as PaymentMethodType,
    name: 'Boleto Bancário',
    description: 'Vencimento em 3 dias úteis',
    icon: '📄'
  }
]

export function PaymentMethodSelector({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Método de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod || ''} onValueChange={onMethodChange}>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.type} className="flex items-center space-x-2">
                <RadioGroupItem value={method.type} id={method.type} />
                <Label
                  htmlFor={method.type}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 flex-1"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
