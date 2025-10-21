import { Product } from '@/types'
import { mockProducts } from './mockProducts'
import { delay } from '@/lib/utils'

export class ProductService {
  async getProducts(): Promise<Product[]> {
    await delay(800)
    return [...mockProducts]
  }
  
  async getProduct(id: string): Promise<Product | null> {
    await delay(500)
    return mockProducts.find(p => p.id === id) || null
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(600)
    if (category === 'Todos') {
      return [...mockProducts]
    }
    return mockProducts.filter(p => p.category === category)
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    await delay(700)
    const lowercaseQuery = query.toLowerCase()
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
    )
  }
}

export const productService = new ProductService()
