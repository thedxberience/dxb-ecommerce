import { tryCatch } from "@/utils/util"
import { sanityClient } from "../sanity"
import { sanityProduct } from "@/utils/types"

// We should use a generic function to fetch data from sanity, the filters can be passed as an object
// and the query can be built dynamically based on the filters

function buildProductQuery(filters: {
  category?: string
  brand?: string
  parent?: string
  targetAudience?: string
  slug?: string
  subCategory?: string
}) {
  // Destructure filters with default empty object to avoid errors if filters is undefined
  const {
    category,
    subCategory,
    brand,
    parent,
    slug,
    targetAudience
  } = filters || {};

  // Build filter conditions
  const conditions = [];

  // Only add conditions for filters that are defined
  if (category) conditions.push(`category->slug.current == '${category}'`);
  if (subCategory) conditions.push(`subCategory->slug.current == '${subCategory}'`);
  if (brand) conditions.push(`brand->name == '${brand}'`);
  if (parent) conditions.push(`parent->name == '${parent}'`);
  if (slug) conditions.push(`slug.current == '${slug}'`);
  if (targetAudience) conditions.push(`targetAudience == '${targetAudience}'`);

  // Combine conditions with OR operator if there are any
  const filterClause = conditions.length > 0
    ? `[_type == "Product" && (${conditions.join(' || ')}) && asset.image.asset->url != null]`
    : `[_type == "Product" && asset.image.asset->url != null]`;

  // Construct and return the full query
  return `*${filterClause}{
    "id": _id,
    name,
    "thumbnail": {
      "imgSrc": asset.image.asset->url,
      "imgAlt": asset.alt
    },
    targetAudience,
    price,
    summary,
    "slug": slug.current,
    "brand": brand->name,
    "category": category->name,
    "parent": {
      "name": parent->name,
      "id": parent->_id
    },
    "createdAt": _createdAt,
    description
  }`;
}

export const getAllSanityProductsByFilters = async (filters: {
  category?: string
  brand?: string
  parent?: string
  targetAudience?: string
  slug?: string
  subCategory?: string
}) => {
  const query = buildProductQuery(filters)

  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }

  return {
    data: products as sanityProduct[],
    error: null
  }
}

export const filterSanityProducts = async ({ price, brandList, categoryList }: { price: { min: number, max: number }, brandList: string[], categoryList: string[] }) => {
  const query = `*[_type == "Product" 
        ${price.min ? `&& price >= ${price.min}` : ""} 
        ${price.max ? `&& price <= ${price.max}` : ""} 
        ${categoryList.length > 0 ? `&& category->name in ${JSON.stringify(categoryList)}` : ""}
        ${brandList.length > 0 ? `&& brand->name in ${JSON.stringify(brandList)}` : ""}
        && asset.image.asset->url != null
        ]
        {
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        summary,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`

  // console.log("Sanity Query:", query);
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products as sanityProduct[],
    error: null
  }
}

export const getAllSanityProducts = async () => {
  const query = `*[_type == "Product"]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "variants": *[_type == "Product" && parent->_id == ^.parent->_id],
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products,
    error: null
  }
}

export const getSanityProductBySlug = async (slug: string) => {
  const query = `*[_type == "Product" && slug.current == ${slug}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: product, error: fetchSanityProductErr } = await tryCatch(sanityClient.fetch(query, { slug }))
  if (fetchSanityProductErr) {
    console.error("Error fetching product from Sanity:", fetchSanityProductErr)
    return {
      data: null,
      error: fetchSanityProductErr,
    }
  }
  return {
    data: product[0] as sanityProduct[],
    error: null
  }
}

export const getLimitedSanityProductsByCategory = async (category: string, maxCount: number) => {
  const query = `*[_type == "Product" && (category->slug.current == '${category}' || subCategory->slug.current == '${category}'  || brand->name == '${category}') && asset.image.asset->url != null] | order(_createdAt desc)[0...${maxCount}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        summary,
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query, { category }))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products as sanityProduct[],
    error: null
  }
}

export const searchProductsByCategory = async (category: string, maxCount: number) => {
  const query = `*[_type == "Product" && (category->slug.current match '${category}*' || subCategory->slug.current match '${category}*'  || brand->name match '${category}*') && asset.image.asset->url != null] | order(_createdAt desc)[0...${maxCount}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        summary,
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query, { category }))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products as sanityProduct[],
    error: null
  }
}
export const getSanityProductsByBrand = async (brand: string) => {
  const query = `*[_type == "Product" && brand->name == ${brand}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query, { brand }))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products,
    error: null
  }
}
export const getSanityProductsByParent = async (parent: string) => {
  const query = `*[_type == "Product" && parent->name == ${parent}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query, { parent }))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products,
    error: null
  }
}

export const getSanityProductsByCategoryAndTargetAudience = async (category: string, targetAudience: string) => {
  const query = `*[_type == "Product" && category->name == ${category} && targetAudience == ${targetAudience}]{
        "id": _id,
        name,
        "thumbnail": {
          "imgSrc": asset.image.asset->url,
          "imgAlt": asset.alt
        },
        targetAudience,
        price,
        "slug": slug.current,
        "brand": brand->name,
        "category": category->name,
        "parent": {
          "name": parent->name,
            "id": parent->_id
        },
        "createdAt": _createdAt
      }`
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(sanityClient.fetch(query, { category, targetAudience }))
  if (fetchSanityProductsErr) {
    console.error("Error fetching products from Sanity:", fetchSanityProductsErr)
    return {
      data: null,
      error: fetchSanityProductsErr,
    }
  }
  return {
    data: products as sanityProduct[],
    error: null
  }
}