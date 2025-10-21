'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { 
  loginSchema, 
  registerSchema, 
  type LoginFormData, 
  type RegisterFormData 
} from '@/lib/validations'
import toast from 'react-hot-toast'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await login(data)
      toast.success('Login realizado com sucesso!')
      router.push('/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      await register(data)
      toast.success('Conta criada com sucesso!')
      router.push('/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    loginForm.reset()
    registerForm.reset()
  }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Faça login na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? 'Registre-se' : 'Faça login'}
            </button>
          </p>
        </div>

        {/* Formulário de Login */}
        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...loginForm.register('email')}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="seu@email.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(loginForm.formState.errors.email.message)}
                  </p>
                )}
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  {...loginForm.register('password')}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Sua senha"
                />
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(loginForm.formState.errors.password.message)}
                  </p>
                )}
              </div>
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            {/* Dica de usuários de teste */}
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Usuários de teste:</h4>
              <div className="text-xs text-blue-600 space-y-1">
                <p>Email: joao@email.com | Senha: 123456</p>
                <p>Email: maria@email.com | Senha: senha123</p>
              </div>
            </div>
          </form>
        ) : (
          /* Formulário de Registro */
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Campo Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  {...registerForm.register('name')}
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Seu nome completo"
                />
                {registerForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(registerForm.formState.errors.name.message)}
                  </p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  id="register-email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="seu@email.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(registerForm.formState.errors.email.message)}
                  </p>
                )}
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  {...registerForm.register('password')}
                  type="password"
                  id="register-password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Sua senha"
                />
                {registerForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(registerForm.formState.errors.password.message)}
                  </p>
                )}
              </div>

              {/* Campo Confirmar Senha */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar senha
                </label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirme sua senha"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {String(registerForm.formState.errors.confirmPassword.message)}
                  </p>
                )}
              </div>
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
        )}
      </div>
        </div>
    )
}