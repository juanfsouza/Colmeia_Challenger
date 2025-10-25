
export const PRODUCT_CONSTANTS = {
  MEL_SABORES: [
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
    }
  ] as const,
  
  SLIDER_CONFIG: {
    ITEMS_PER_PAGE: 3,
    LOADING_DELAY: 1000,
    ADD_TO_CART_DELAY: 800,
  },
  
  DEFAULT_TEXTS: {
    TITLE: "Mels de Sabores",
    SUBTITLE: "Descubra nossa variedade de sabores únicos",
    ADDING_TO_CART: "Adicionando...",
    UNAVAILABLE: "Indisponível",
    ADD_TO_CART: "Adicionar ao Carrinho",
    NO_IMAGE: "Sem imagem",
    STOCK_TEXT: "em estoque",
  },
} as const
