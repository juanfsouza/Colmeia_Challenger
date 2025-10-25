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
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 opacity-60">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.9, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <img 
            src="/images/abtbee-02.png" 
            alt="Bee" 
            className="w-16 h-16 object-contain"
          />
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 left-20 opacity-70">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -360 }}
          animate={{ 
            opacity: 1, 
            scale: 2, 
            rotate: 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <img 
            src="/images/sunflower-01.png" 
            alt="Sunflower"
            className="w-24 h-24 object-contain"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Card Container */}
          <div className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
            {/* Decorative circles */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-30"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20"></div>
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 px-4 py-2 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide"
              >
                {isLogin ? 'ACESSE SUA CONTA' : 'CRIE SUA CONTA'}
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Bem-vindo de volta!' : 'Junte-se a nós!'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Faça login para continuar' : 'Crie sua conta gratuitamente'}
              </p>
            </motion.div>

            {/* Formulário de Login */}
            {isLogin ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-6 relative z-10"
              >
                <div className="space-y-4">
                  {/* Campo Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...loginForm.register('email')}
                        type="email"
                        id="email"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(loginForm.formState.errors.email.message)}
                      </p>
                    )}
                  </div>

                  {/* Campo Senha */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...loginForm.register('password')}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(loginForm.formState.errors.password.message)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botão de Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-orange-500 hover:via-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Dica de usuários de teste */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-indigo-50 rounded-xl border border-orange-200"
                >
                  <h4 className="text-sm font-medium text-orange-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Usuários de teste:
                  </h4>
                  <div className="text-xs text-orange-600 space-y-1">
                    <p>Email: joao@email.com | Senha: 123456</p>
                    <p>Email: maria@email.com | Senha: senha123</p>
                  </div>
                </motion.div>
              </motion.form>
            ) : (
              /* Formulário de Registro */
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-6 relative z-10"
              >
                <div className="space-y-4">
                  {/* Campo Nome */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...registerForm.register('name')}
                        type="text"
                        id="name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(registerForm.formState.errors.name.message)}
                      </p>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...registerForm.register('email')}
                        type="email"
                        id="register-email"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(registerForm.formState.errors.email.message)}
                      </p>
                    )}
                  </div>

                  {/* Campo Senha */}
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...registerForm.register('password')}
                        type={showPassword ? "text" : "password"}
                        id="register-password"
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(registerForm.formState.errors.password.message)}
                      </p>
                    )}
                  </div>

                  {/* Campo Confirmar Senha */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...registerForm.register('confirmPassword')}
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Confirme sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(registerForm.formState.errors.confirmPassword.message)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botão de Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-orange-500 hover:via-orange-600 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar conta
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* Toggle Mode */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 text-center relative z-10"
            >
              <p className="text-gray-600">
                {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-semibold text-orange-600 hover:text-orange-500 transition-colors duration-300"
                >
                  {isLogin ? 'Registre-se' : 'Faça login'}
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}