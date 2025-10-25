import { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: "mel-1",
    name: "Mel de Eucalipto",
    price: 32.90,
    description: "Mel puro de eucalipto com sabor suave e propriedades expectorantes naturais.",
    image: "/images/item-1.webp",
    category: "Mel de Sabores",
    stock: 25
  },
  {
    id: "mel-2", 
    name: "Mel de Laranjeira",
    price: 28.90,
    description: "Mel floral de laranjeira com aroma cítrico e sabor delicadamente doce.",
    image: "/images/item-2.webp",
    category: "Mel de Sabores",
    stock: 30
  },
  {
    id: "mel-3",
    name: "Mel de Jataí",
    price: 45.90,
    description: "Mel raro de jataí, conhecido por sua textura cremosa e sabor exótico.",
    image: "/images/item-3.webp",
    category: "Mel de Sabores",
    stock: 15
  },
  {
    id: "mel-4",
    name: "Mel de Silvestre",
    price: 38.90,
    description: "Mel silvestre multifloral com sabor único e propriedades nutricionais completas.",
    image: "/images/item-2.webp",
    category: "Mel de Sabores",
    stock: 20
  },
  {
    id: "mel-5",
    name: "Mel de Assa-peixe",
    price: 42.90,
    description: "Mel de assa-peixe com sabor característico e propriedades medicinais.",
    image: "/images/item-3.webp",
    category: "Mel de Sabores",
    stock: 18
  },
  {
    id: "mel-6",
    name: "Mel de Caju",
    price: 35.90,
    description: "Mel de caju com sabor tropical e aroma marcante das flores do cajueiro.",
    image: "/images/item-1.webp",
    category: "Mel de Sabores",
    stock: 22
  }
]

export const categories = [
  'Todos',
  'Mel de Sabores',
  'Mel Puro',
  'Produtos Apícolas',
  'Acessórios'
]
