'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, LoginFormData, RegisterFormData, AuthContextType, AuthProviderProps } from '@/types'
import { authSimulator } from '../services/mocks/simulator'
import { getFromStorage, setToStorage, removeFromStorage } from '@/lib/utils'
import { STORAGE_KEYS } from '@/lib/constants'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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
      setToStorage(STORAGE_KEYS.USER, userData)
      
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
      setToStorage(STORAGE_KEYS.USER, userData)
      
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    removeFromStorage(STORAGE_KEYS.USER)
  }

  const getCurrentUser = async () => {
    try {
      setIsLoading(true)
      
      const storedUser = getFromStorage<User>(STORAGE_KEYS.USER)
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
      removeFromStorage(STORAGE_KEYS.USER)
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