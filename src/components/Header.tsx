'use client'

import { CartButton } from './CartButton'
import { useAuth } from '@/features/auth/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TextAnimate } from '@/components/ui/text-animate'

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/products')}
              className="text-xl font-bold text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
              aria-label="Ir para página inicial"
            >
              <TextAnimate
                className="text-xl font-bold"
                by="character"
                animation="slideUp"
                delay={0.1}
              >
                Comeia Store
              </TextAnimate>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Button
              variant="ghost"
              onClick={() => router.push('/products')}
              className="text-muted-foreground hover:text-foreground"
            >
              Produtos
            </Button>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Carrinho */}
            <CartButton />

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Olá, {user?.name}
              </span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
