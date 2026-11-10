export interface Product {
  id: number;
  name: string;
  cat: 'Cleansers' | 'Serums' | 'Moisturizers' | 'Sun Care' | 'Masks' | 'Toners' | 'Sets & Kits';
  price: number;
  stock: boolean;
  rating?: number;
  reviews?: number;
  img: string;
  gallery: string[];
  desc: string;
  long: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Cream Cleanser',
    cat: 'Cleansers',
    price: 32,
    stock: true,
    rating: 4.8,
    reviews: 214,
    img: '/assets/aistudio/product-cleanser_5602b3f2.png',
    gallery: [
      '/assets/aistudio/product-cleanser_5602b3f2.png',
      '/assets/aistudio/hero_13c12f2b.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Gentle daily cleanser for all skin types',
    long: 'A silky, pH-balanced cleansing cream that melts away makeup, SPF and impurities without stripping the skin barrier. Enriched with glycerin and oat extract, it leaves even the most sensitive skin soft, calm and comfortably clean.'
  },
  {
    id: 2,
    name: 'Purifying Gel Cleanser',
    cat: 'Cleansers',
    price: 28,
    stock: true,
    rating: 4.6,
    reviews: 132,
    img: '/assets/aistudio/product-cleanser_5602b3f2.png',
    gallery: [
      '/assets/aistudio/product-cleanser_5602b3f2.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Deep-cleansing gel for oily and combo skin',
    long: 'A clarifying gel cleanser with zinc and green tea that controls excess sebum and refines pores while keeping the moisture barrier intact. Ideal for oily, combination and blemish-prone skin.'
  },
  {
    id: 3,
    name: 'Radiance Serum',
    cat: 'Serums',
    price: 48,
    stock: true,
    rating: 4.9,
    reviews: 386,
    img: '/assets/aistudio/product-serum_9e45f725.png',
    gallery: [
      '/assets/aistudio/product-serum_9e45f725.png',
      '/assets/aistudio/hero_13c12f2b.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Brightening & hydrating vitamin C serum',
    long: 'A fast-absorbing 15% vitamin C complex with ferulic acid and hyaluronic acid that visibly brightens dull tone, fades dark spots and defends against free-radical damage for a lit-from-within glow.'
  },
  {
    id: 4,
    name: 'Hydrating Serum',
    cat: 'Serums',
    price: 42,
    stock: false,
    rating: 4.7,
    reviews: 158,
    img: '/assets/aistudio/product-serum_9e45f725.png',
    gallery: [
      '/assets/aistudio/product-serum_9e45f725.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Hyaluronic acid plumping concentrate',
    long: 'Three molecular weights of hyaluronic acid draw moisture deep into the skin and hold it there for 72 hours, instantly plumping fine lines and restoring a dewy, bouncy complexion.'
  },
  {
    id: 5,
    name: 'Niacinamide Serum',
    cat: 'Serums',
    price: 38,
    stock: true,
    rating: 4.5,
    reviews: 97,
    img: '/assets/aistudio/product-toner_5709d685.png',
    gallery: [
      '/assets/aistudio/product-toner_5709d685.png',
      '/assets/aistudio/hero_13c12f2b.png'
    ],
    desc: 'Pore refining & oil balancing serum',
    long: 'A lightweight 10% niacinamide serum with zinc PCA that regulates shine, minimises the look of pores and evens skin tone without irritation — perfect under makeup or moisturiser.'
  },
  {
    id: 6,
    name: 'Daily Moisturizer',
    cat: 'Moisturizers',
    price: 36,
    stock: true,
    rating: 4.8,
    reviews: 302,
    img: '/assets/aistudio/product-moisturizer_d434af58.png',
    gallery: [
      '/assets/aistudio/product-moisturizer_d434af58.png',
      '/assets/aistudio/hero_13c12f2b.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Nourishing moisturizer for healthy skin barrier',
    long: 'A weightless cream-gel formulated with ceramides, squalane and shea butter that hydrates for 24 hours, strengthens the skin barrier and sits perfectly under sunscreen and makeup.'
  },
  {
    id: 7,
    name: 'Night Repair Cream',
    cat: 'Moisturizers',
    price: 44,
    stock: true,
    rating: 4.7,
    reviews: 121,
    img: '/assets/aistudio/product-moisturizer_d434af58.png',
    gallery: [
      '/assets/aistudio/product-moisturizer_d434af58.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Overnight recovery with ceramides',
    long: 'A rich restorative cream with bakuchiol, peptides and ceramides that works while you sleep to smooth, firm and renew — you wake to visibly rested, repaired skin.'
  },
  {
    id: 8,
    name: 'Mineral Sunscreen',
    cat: 'Sun Care',
    price: 28,
    stock: true,
    rating: 4.6,
    reviews: 245,
    img: '/assets/aistudio/product-sunscreen_0f9534cc.png',
    gallery: [
      '/assets/aistudio/product-sunscreen_0f9534cc.png',
      '/assets/aistudio/ritual_35dc71aa.png',
      '/assets/aistudio/hero_13c12f2b.png'
    ],
    desc: 'Broad spectrum SPF 50 for daily protection',
    long: 'A 100% mineral SPF 50 with zinc oxide that glides on clear, controls shine and protects against UVA/UVB and blue light. Reef-safe and fragrance-free.'
  },
  {
    id: 9,
    name: 'Glow Drops SPF',
    cat: 'Sun Care',
    price: 34,
    stock: false,
    rating: 4.4,
    reviews: 66,
    img: '/assets/aistudio/product-sunscreen_0f9534cc.png',
    gallery: [
      '/assets/aistudio/product-sunscreen_0f9534cc.png',
      '/assets/aistudio/hero_13c12f2b.png'
    ],
    desc: 'Tinted SPF 30 with a luminous finish',
    long: 'Buildable tinted SPF 30 drops that let you customise coverage from sheer glow to medium coverage, infused with niacinamide for a smoother-looking complexion.'
  },
  {
    id: 10,
    name: 'Hydra Sheet Mask',
    cat: 'Masks',
    price: 18,
    stock: true,
    rating: 4.5,
    reviews: 89,
    img: '/assets/aistudio/product-moisturizer_d434af58.png',
    gallery: [
      '/assets/aistudio/product-moisturizer_d434af58.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Single-use hydration boost, 3 masks',
    long: 'Biocellulose masks soaked in a hyaluronic and aloe essence that flood dehydrated skin with moisture in 15 minutes — an instant glow before any event.'
  },
  {
    id: 11,
    name: 'Clay Purifying Mask',
    cat: 'Masks',
    price: 24,
    stock: true,
    rating: 4.6,
    reviews: 143,
    img: '/assets/aistudio/product-moisturizer_d434af58.png',
    gallery: [
      '/assets/aistudio/product-moisturizer_d434af58.png',
      '/assets/aistudio/hero_13c12f2b.png'
    ],
    desc: 'Kaolin clay detox mask for clear skin',
    long: 'A creamy kaolin and charcoal mask that draws out congestion and pollution particles in 10 minutes without over-drying, thanks to soothing centella asiatica.'
  },
  {
    id: 12,
    name: 'Niacinamide Toner',
    cat: 'Toners',
    price: 26,
    stock: true,
    rating: 4.7,
    reviews: 178,
    img: '/assets/aistudio/product-toner_5709d685.png',
    gallery: [
      '/assets/aistudio/product-toner_5709d685.png',
      '/assets/aistudio/hero_13c12f2b.png',
      '/assets/aistudio/ritual_35dc71aa.png'
    ],
    desc: 'Pore refining & balancing daily toner',
    long: 'A gentle alcohol-free toner with niacinamide, witch hazel and panthenol that rebalances skin after cleansing, tightens the look of pores and preps skin to absorb serums.'
  },
  {
    id: 13,
    name: 'Essential Starter Set',
    cat: 'Sets & Kits',
    price: 89,
    stock: true,
    rating: 4.9,
    reviews: 267,
    img: '/assets/aistudio/ritual_35dc71aa.png',
    gallery: [
      '/assets/aistudio/ritual_35dc71aa.png',
      '/assets/aistudio/hero_13c12f2b.png',
      '/assets/aistudio/product-moisturizer_d434af58.png'
    ],
    desc: 'Cleanser, serum & moisturizer trio',
    long: 'The complete morning ritual in one box: Cream Cleanser, Radiance Serum and Daily Moisturizer — saved 15% versus buying individually, and wrapped ready for gifting.'
  },
  {
    id: 14,
    name: 'Clear Skin Ritual Set',
    cat: 'Sets & Kits',
    price: 95,
    stock: false,
    rating: 4.8,
    reviews: 94,
    img: '/assets/aistudio/ritual_35dc71aa.png',
    gallery: [
      '/assets/aistudio/ritual_35dc71aa.png',
      '/assets/aistudio/product-toner_5709d685.png',
      '/assets/aistudio/hero_13c12f2b.png'
    ],
    desc: 'Full routine with toner and clay mask',
    long: 'A four-step routine for congested skin: Purifying Gel Cleanser, Niacinamide Toner, Clay Purifying Mask and Daily Moisturizer — clear, balanced skin in one box.'
  }
];

export const CATEGORIES = [
  'Cleansers',
  'Serums',
  'Moisturizers',
  'Sun Care',
  'Masks',
  'Toners',
  'Sets & Kits'
] as const;

export function getProductById(id: number | string): Product | undefined {
  return PRODUCTS.find(p => p.id === Number(id));
}

export const BENEFITS_MAP: Record<string, string[]> = {
  Cleansers: ['Removes makeup, SPF & impurities', 'pH-balanced, non-stripping formula', 'Safe for morning & night use'],
  Serums: ['Fast-absorbing, lightweight texture', 'Targets tone, texture & hydration', 'Layers under moisturizer & SPF'],
  Moisturizers: ['24-hour hydration, weightless finish', 'Strengthens the skin barrier', 'Non-comedogenic, fragrance-free'],
  'Sun Care': ['Broad-spectrum UVA/UVB protection', 'No white cast, no pilling', 'Reef-safe mineral filters'],
  Masks: ['Visible results in 10–15 minutes', 'Soothing, spa-grade formula', 'Use 1–2 times per week'],
  Toners: ['Rebalances skin after cleansing', 'Preps skin to absorb serums', 'Alcohol-free & gentle'],
  'Sets & Kits': ['Complete routine in one box', 'Save vs buying individually', 'Gift-ready packaging']
};

export const INGREDIENTS_MAP: Record<string, string> = {
  Cleansers: 'Aqua, Glycerin, Coco-Glucoside, Oat Kernel Extract, Panthenol, Xanthan Gum.',
  Serums: 'Aqua, Niacinamide, Ascorbic Acid, Hyaluronic Acid, Ferulic Acid, Glycerin, Panthenol.',
  Moisturizers: 'Aqua, Squalane, Ceramide NP, Shea Butter, Glycerin, Centella Asiatica Extract.',
  'Sun Care': 'Zinc Oxide 20%, Caprylic/Capric Triglyceride, Glycerin, Vitamin E, Aloe Barbadensis.',
  Masks: 'Aqua, Kaolin, Activated Charcoal, Hyaluronic Acid, Centella Asiatica, Allantoin.',
  Toners: 'Aqua, Niacinamide, Witch Hazel, Panthenol, Allantoin, Glycerin.',
  'Sets & Kits': 'Complete AURA formulations printed on each product box in the set.'
};

export function getDefaultSizeForCategory(cat?: string): string {
  switch (cat) {
    case 'Cleansers':
      return '150 ml';
    case 'Serums':
      return '50 ml';
    case 'Moisturizers':
      return '50 ml';
    case 'Sun Care':
      return '50 ml';
    case 'Masks':
      return '50 ml';
    case 'Toners':
      return '200 ml';
    case 'Sets & Kits':
      return 'Starter Kit';
    default:
      return '150 ml';
  }
}
