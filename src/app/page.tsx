import { Metadata } from 'next'
import { ClientRedirect } from '@/components/ClientRedirect'

export const metadata: Metadata = {
  title: 'Comeia Store - Mel Artesanal Premium',
  description: 'Descubra nossa seleção exclusiva de mel artesanal de qualidade premium. Sabores únicos e naturais para transformar qualquer momento.',
  keywords: ['mel', 'artesanal', 'premium', 'natural', 'qualidade'],
  openGraph: {
    title: 'Comeia Store - Mel Artesanal Premium',
    description: 'Descubra nossa seleção exclusiva de mel artesanal de qualidade premium.',
    type: 'website',
  },
}

export default function Home() {
  return <ClientRedirect />
}
