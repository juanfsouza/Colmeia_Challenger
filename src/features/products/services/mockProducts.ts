import { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S24',
    price: 2999.99,
    description: 'Smartphone com tela de 6.2", 128GB, 8GB RAM, câmera tripla de 50MP',
    image: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Samsung+Galaxy+S24',
    category: 'Smartphones',
    stock: 15
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    price: 2499.99,
    description: 'Notebook com Intel i5, 8GB RAM, 256GB SSD, tela 15.6" Full HD',
    image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Dell+Inspiron+15',
    category: 'Notebooks',
    stock: 8
  },
  {
    id: '3',
    name: 'Fone de Ouvido Sony WH-1000XM4',
    price: 899.99,
    description: 'Fone de ouvido com cancelamento de ruído ativo, 30h de bateria',
    image: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Sony+WH-1000XM4',
    category: 'Áudio',
    stock: 12
  },
  {
    id: '4',
    name: 'Smartwatch Apple Watch Series 9',
    price: 1899.99,
    description: 'Smartwatch com GPS, monitoramento de saúde, resistente à água',
    image: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Apple+Watch+Series+9',
    category: 'Wearables',
    stock: 6
  },
  {
    id: '5',
    name: 'Tablet iPad Air 5ª Geração',
    price: 3299.99,
    description: 'Tablet com chip M1, 64GB, tela 10.9", suporte ao Apple Pencil',
    image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=iPad+Air+5th+Gen',
    category: 'Tablets',
    stock: 4
  },
  {
    id: '6',
    name: 'Monitor LG UltraWide 29"',
    price: 1299.99,
    description: 'Monitor 21:9, Full HD, 75Hz, USB-C, ideal para produtividade',
    image: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=LG+UltraWide+29',
    category: 'Monitores',
    stock: 10
  }
]

export const categories = [
  'Todos',
  'Smartphones',
  'Notebooks',
  'Áudio',
  'Wearables',
  'Tablets',
  'Monitores'
]
