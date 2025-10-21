'use client'

import { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductFilters } from './ProductFilters'
import { useState, useEffect } from 'react'
import { productService } from '../services/productService'
import { ClientOnly } from '@/components/ClientOnly'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const productsData = await productService.getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProducts = async () => {
    try {
      let filtered = products

      if (searchQuery) {
        filtered = await productService.searchProducts(searchQuery)
      }

      if (selectedCategory !== 'Todos') {
        filtered = await productService.getProductsByCategory(selectedCategory)
      }

      if (searchQuery && selectedCategory !== 'Todos') {
        const searchResults = await productService.searchProducts(searchQuery)
        filtered = searchResults.filter(p => p.category === selectedCategory)
      }

      setFilteredProducts(filtered)
    } catch (error) {
      console.error('Erro ao filtrar produtos:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <ClientOnly fallback={
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Carregando produtos...</div>
      </div>
    }>
      <div>
        <ProductFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </ClientOnly>
  )
}
