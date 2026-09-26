/*
  CATÁLOGO DA LOJA — cadastre e atualize produtos somente neste arquivo.

  Para adicionar um produto, copie um objeto do array e altere os campos:
  name, description, price, oldPrice (opcional), source, category,
  image, badge (opcional) e affiliateUrl.

  IMPORTANTE: troque cada affiliateUrl de exemplo pelo seu link de afiliado
  gerado na plataforma. Os links atuais levam às páginas iniciais das lojas
  e não geram comissão. Use uma URL completa começando com https://.
*/
window.PRODUTOS = [
  {
    id: "fone-bluetooth",
    name: "Fone Bluetooth Wave Pro",
    description: "Som envolvente, conexão sem fio estável e estojo compacto para levar sua música aonde você for.",
    price: 149.90,
    oldPrice: 219.90,
    source: "Mercado Livre",
    category: "Eletrônicos",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    badge: "ACHADO DA VEZ",
    affiliateUrl: "https://www.mercadolivre.com.br/"
  },
  {
    id: "garrafa-termica",
    name: "Garrafa Térmica Minimal 500 ml",
    description: "Design leve e atemporal para manter sua bebida na temperatura ideal durante o dia.",
    price: 59.90,
    oldPrice: 89.90,
    source: "Shopee",
    category: "Casa & cozinha",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    badge: "PREÇO ESPECIAL",
    affiliateUrl: "https://shopee.com.br/"
  },
  {
    id: "tenis-urban",
    name: "Tênis Urban Move",
    description: "Conforto para a rotina e visual versátil para combinar com diferentes momentos.",
    price: 189.90,
    oldPrice: 259.90,
    source: "Amazon",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    badge: "BOM ACHADO",
    affiliateUrl: "https://www.amazon.com.br/"
  },
  {
    id: "luminaria-mesa",
    name: "Luminária de Mesa Aurora",
    description: "Uma luz aconchegante e um toque moderno para seu cantinho de leitura ou trabalho.",
    price: 84.50,
    oldPrice: 119.90,
    source: "Mercado Livre",
    category: "Casa & cozinha",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    badge: "-30%",
    affiliateUrl: "https://www.mercadolivre.com.br/"
  },
  {
    id: "mochila-dia-a-dia",
    name: "Mochila Dia a Dia Compacta",
    description: "Espaço bem aproveitado, alças confortáveis e tamanho ideal para acompanhar sua rotina.",
    price: 109.90,
    oldPrice: 159.90,
    source: "Shopee",
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    badge: "MAIS VENDIDO",
    affiliateUrl: "https://shopee.com.br/"
  },
  {
    id: "smartwatch-fit",
    name: "Smartwatch Fit Active",
    description: "Acompanhe atividades e notificações com praticidade em um relógio leve para o dia todo.",
    price: 199.90,
    oldPrice: 299.90,
    source: "Amazon",
    category: "Eletrônicos",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    badge: "OFERTA",
    affiliateUrl: "https://www.amazon.com.br/"
  }
];
