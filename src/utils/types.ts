
export type subCategoryType = {
    id: string,
    name: string,
    targetAudience: string,
    slug: string;
}

export type sanityCategory = {
    id: string,
    name: string,
    subCategories: subCategoryType[],
    productCount: number,
    categoryImages: {
        alt: string,
        src: string
    }[]
}

export type sanityBrand = {
    id: string,
    image: {
        src: string,
        alt: string
    }
    name: string,
    productCount: number
}

export type sanityProduct = {
    id: string,
    name: string,
    thumbnail: {
        imgSrc: string,
        imgAlt: string
    },
    summary: string;
    targetAudience: string,
    price: number,
    slug: string,
    brand: string,
    description: string | null
    category: string,
    parent: {
        name: string,
        id: string
    },
    createdAt: Date
}

export type FilterCategory = "main" | "price" | "brand" | "category" | "color";

export type ProductCountGroup = {
    name: string;
    productCount: number;
};