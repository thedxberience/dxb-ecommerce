import { Product, Category } from "@/app/types";

export const stubCategories: Category[] = [
  {
    id: "cat-001",
    slug: "skincare",
    name: "Skincare",
    asset: "https://example.com/asset/skincare.png",
    displayName: "Skincare Essentials"
  },
  {
    id: "cat-002",
    slug: "haircare",
    name: "Haircare",
    asset: "https://example.com/asset/haircare.png",
    displayName: "Haircare Must-Haves"
  },
  {
    id: "cat-003",
    slug: "makeup",
    name: "Makeup",
    asset: "https://example.com/asset/makeup.png",
    displayName: "Makeup Magic"
  },
  {
    id: "cat-004",
    slug: "bodycare",
    name: "Bodycare",
    asset: "https://example.com/asset/bodycare.png",
    displayName: "Bodycare Bliss"
  },
  {
    id: "cat-005",
    slug: "fragrance",
    name: "Fragrance",
    asset: "https://example.com/asset/fragrance.png",
    displayName: "Fragrance Favorites"
  }
];

export const stubProducts: Product[] = [
  {
    id: "prod-001",
    slug: "hydrating-face-cream",
    name: "Hydrating Face Cream",
    brand: "GlowBeauty",
    category: [stubCategories[0]],
    description:
      "Crafted from the finest Italian leather, this luxury bag embodies sophistication and refinement. Designed for the modern connoisseur, it features a structured silhouette, exquisite hand-stitched detailing, and gleaming gold-tone hardware.",
    price: "29.99",
    asset: "/images/products/product-1.png",
    variants: []
  },
  {
    id: "prod-002",
    slug: "revive-shampoo",
    name: "Revive Shampoo",
    brand: "HairGlow",
    category: [stubCategories[1]],
    description: "A revitalizing shampoo to bring life back to your hair.",
    price: "19.99",
    asset: "https://example.com/asset/shampoo.png",
    variants: []
  },
  {
    id: "prod-003",
    slug: "volume-mascara",
    name: "Volume Mascara",
    brand: "LushLook",
    category: [stubCategories[2]],
    description: "Intense volume mascara for bold, beautiful lashes.",
    price: "14.99",
    asset: "https://example.com/asset/mascara.png",
    variants: []
  },
  {
    id: "prod-004",
    slug: "soothing-body-lotion",
    name: "Soothing Body Lotion",
    brand: "SoftTouch",
    category: [stubCategories[3]],
    description: "Gentle body lotion that soothes and hydrates.",
    price: "24.99",
    asset: "https://example.com/asset/lotion.png",
    variants: []
  },
  {
    id: "prod-005",
    slug: "signature-perfume",
    name: "Signature Perfume",
    brand: "Essenza",
    category: [stubCategories[4]],
    description: "A captivating fragrance for your everyday signature scent.",
    price: "49.99",
    asset: "https://example.com/asset/perfume.png",
    variants: []
  }
];
