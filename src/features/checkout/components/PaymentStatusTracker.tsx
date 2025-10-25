'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PaymentMethodType } from '@/types'

interface PaymentStatusTrackerProps {
  orderId: string
  paymentMethod: PaymentMethodType
  onStatusChange: (status: PaymentStatus) => void
  onRetry: () => void
}

export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'expired'

interface StatusStep {
  id: PaymentStatus
  label: string
  description: string
  icon: string
}

const statusSteps: StatusStep[] = [
  {
    id: 'pending',
    label: 'Aguardando',
    description: 'Pedido criado, aguardando processamento',
    icon: '⏳'
  },
  {
    id: 'processing',
    label: 'Processando',
    description: 'Pagamento sendo processado',
    icon: '🔄'
  },
  {
    id: 'paid',
    label: 'Pago',
    description: 'Pagamento aprovado com sucesso',
    icon: '✅'
  },
  {
    id: 'failed',
    label: 'Falhou',
    description: 'Pagamento não foi processado',
    icon: '❌'
  },
  {
    id: 'expired',
    label: 'Expirado',
    description: 'Tempo limite para pagamento expirado',
    icon: '⏰'
  }
]

export function PaymentStatusTracker({ orderId, paymentMethod, onStatusChange, onRetry }: PaymentStatusTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState<PaymentStatus>('pending')
  const [isLoading, setIsLoading] = useState(false)

  // Simula evolução do status do pagamento
  useEffect(() => {
    const processPayment = async () => {
      setIsLoading(true)
      
      // Status: pending → processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentStatus('processing')
      onStatusChange('processing')
      
      // Simula tempo de processamento baseado no método
      const processingTime = getProcessingTime(paymentMethod)
      await new Promise(resolve => setTimeout(resolve, processingTime))
      
      // Simula resultado (100% sucesso em desenvolvimento)
      const isSuccess = true // Sempre sucesso para testes
      
      if (isSuccess) {
        setCurrentStatus('paid')
        onStatusChange('paid')
      } else {
        // Simula diferentes tipos de falha
        const failureType = Math.random()
        if (failureType > 0.7) {
          setCurrentStatus('expired')
          onStatusChange('expired')
        } else {
          setCurrentStatus('failed')
          onStatusChange('failed')
        }
      }
      
      setIsLoading(false)
    }

    processPayment()
  }, [orderId, paymentMethod, onStatusChange])

  const getProcessingTime = (method: PaymentMethodType): number => {
    const times: Record<PaymentMethodType, number> = {
      pix: 2000,
      credit_card: 3000,
      boleto: 1000
    }
    return times[method]
  }

  const getStatusColor = (status: PaymentStatus): string => {
    const colors: Record<PaymentStatus, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800'
    }
    return colors[status]
  }

  const getCurrentStepIndex = (): number => {
    return statusSteps.findIndex(step => step.id === currentStatus)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Status do Pagamento
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status atual */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {statusSteps.find(step => step.id === currentStatus)?.icon}
            </span>
            <div>
              <h3 className="font-semibold text-lg">
                {statusSteps.find(step => step.id === currentStatus)?.label}
              </h3>
              <p className="text-sm text-gray-600">
                {statusSteps.find(step => step.id === currentStatus)?.description}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(currentStatus)}>
            {currentStatus.toUpperCase()}
          </Badge>
        </div>

        <Separator />

        {/* Timeline de status */}
        <div className="space-y-3">
          <h4 className="font-medium">Progresso do Pagamento</h4>
          {statusSteps.map((step, index) => {
            const isCompleted = index <= getCurrentStepIndex()
            const isCurrent = step.id === currentStatus
            
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.icon}</span>
                    <span className={`font-medium ${isCurrent ? 'text-blue-600' : ''}`}>
                      {step.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botões de ação */}
        {(currentStatus === 'failed' || currentStatus === 'expired') && (
          <div className="pt-4">
            <button
              onClick={onRetry}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              aria-label="Tentar novamente o pagamento"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {currentStatus === 'paid' && (
          <div className="pt-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="font-medium text-green-800">
                  Pagamento aprovado com sucesso!
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Seu pedido foi processado e você receberá um email de confirmação.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
