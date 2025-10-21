'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthState, LoginFormData, RegisterFormData } from '@/types'
import { authSimulator } from '../services/mocks/simulator'
import { getFromStorage, setToStorage, removeFromStorage } from '@/lib/utils'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  login: (data: LoginFormData) => Promise<void>
  register: (data: RegisterFormData) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const isAuthenticated = !!user

  const login = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      
      const userData = await authSimulator.login(data.email, data.password)
      setUser(userData)
      setToStorage('currentUser', userData)
      
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      
      const userData = await authSimulator.register(data.name, data.email, data.password)
      
      setUser(userData)
      setToStorage('currentUser', userData)
      
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    removeFromStorage('currentUser')
  }

  const getCurrentUser = async () => {
    try {
      setIsLoading(true)
      
      const storedUser = getFromStorage<User>('currentUser')
      if (storedUser) {
        setUser(storedUser)
        return
      }
      const currentUser = await authSimulator.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setToStorage('currentUser', currentUser)
      }
      
    } catch (error) {
      removeFromStorage('currentUser')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    getCurrentUser()
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    getCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}