import { tryCatch } from "@/utils/util";
import { sanityClient } from "../sanity";
import { sanityProduct } from "@/utils/types";
import { SanityProductFilters } from "@/app/types";

// We should use a generic function to fetch data from sanity, the filters can be passed as an object
// and the query can be built dynamically based on the filters

function buildProductQuery(filters: SanityProductFilters) {
  // Destructure filters with default empty object to avoid errors if filters is undefined
  const {
    category,
    subCategory,
    brand,
    parent,
    slug,
    targetAudience,
    pageNumber = 1,
    pageSize = 40,
    lastId
  } = filters || {};

  // Build filter conditions
  const conditions = [];

  // Only add conditions for filters that are defined
  if (category) conditions.push(`category->slug.current == '${category}'`);
  if (subCategory)
    conditions.push(`subCategory->slug.current == '${subCategory}'`);
  if (brand) conditions.push(`brand->name == '${brand}'`);
  if (parent) conditions.push(`parent->name == '${parent}'`);
  if (slug) conditions.push(`slug.current == '${slug}'`);
  if (targetAudience) conditions.push(`targetAudience == '${targetAudience}'`);

  let lastIdConition = "";
  let sliceCondition = `| order(_id) [0...${pageSize}]`;
  // If lastId is provided, we will add a condition to filter products with _id greater than lastId
  // add lastId to conditions if it exists
  if (lastId) {
    lastIdConition = ` && _id > "${lastId}"`;
  } else {
    // If lastId is not provided, we will slice the results based on pageNumber and pageSize
    sliceCondition = ` | order(_id)[${(pageNumber - 1) * pageSize}...${pageNumber * pageSize
      }]`;
  }

  // Combine conditions with OR operator if there are any
  const filterClause =
    conditions.length > 0
      ? `[_type == "Product" && (${conditions.join(
        " || "
      )}) && defined(asset.image.asset->url)${lastIdConition}]`
      : `[_type == "Product" && defined(asset.image.asset->url)${lastIdConition}]`;

  // Construct and return the full query
  return `*${filterClause} ${sliceCondition}{
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
    description,
  }`;
}

export const getAllSanityProductsByFilterCount = async (
  filters: SanityProductFilters
) => {
  const { category, subCategory, brand, parent, slug, targetAudience } =
    filters || {};

  // Build filter conditions
  const conditions = [];

  // Only add conditions for filters that are defined
  if (category) conditions.push(`psuedoCategory == '${category}'`);
  if (subCategory)
    conditions.push(`psuedoSubCategory == '${subCategory}'`);
  if (brand) conditions.push(`psuedoBrand == '${brand}'`);
  if (parent) conditions.push(`parent->name == '${parent}'`);
  if (slug) conditions.push(`slug.current == '${slug}'`);
  if (targetAudience) conditions.push(`targetAudience == '${targetAudience}'`);

  const query = `count(*[_type == "Product" && (${conditions.join(
    " || "
  )}) && asset.image.asset->url != null])`;
  // console.log("Sanity Query for Count:", query);
  const { data: count, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query)
  );
  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching product count from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }
  return {
    data: count as number,
    error: null
  };
};

export const getAllSanityProductsByFilters = async (
  filters: SanityProductFilters
) => {
  const query = buildProductQuery(filters);

  // console.log("Sanity Query:", query);

  const { data: products, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query)
  );

  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching products from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }



  return {
    data: products as sanityProduct[],
    error: null
  };
};

export const filterSanityProducts = async ({
  price,
  brandList,
  categoryList
}: {
  price: { min: number; max: number };
  brandList: string[];
  categoryList: string[];
}) => {
  const query = `*[_type == "Product" 
        ${price.min ? `&& price >= ${price.min}` : ""} 
        ${price.max ? `&& price <= ${price.max}` : ""} 
        ${categoryList.length > 0
      ? `&& category->name in ${JSON.stringify(categoryList)}`
      : ""
    }
        ${brandList.length > 0
      ? `&& brand->name in ${JSON.stringify(brandList)}`
      : ""
    }
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
      }`;

  // console.log("Sanity Query:", query);
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query)
  );
  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching products from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }
  return {
    data: products as sanityProduct[],
    error: null
  };
};

export const getSanityProductBySlug = async (slug: string) => {
  const query = `*[_type == "Product" && slug.current == '${slug}']{
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
        description,
      }`;
  const { data: product, error: fetchSanityProductErr } = await tryCatch(
    sanityClient.fetch(query, { slug })
  );
  if (fetchSanityProductErr) {
    console.error("Error fetching product from Sanity:", fetchSanityProductErr);
    return {
      data: null,
      error: fetchSanityProductErr
    };
  }

  // console.log("Sanity Product Data:", product);

  return {
    data: product[0] as sanityProduct,
    error: null
  };
};

export const getLimitedSanityProductsByCategory = async (
  category: string,
  maxCount: number
) => {
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
      }`;
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query, { category })
  );
  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching products from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }
  return {
    data: products as sanityProduct[],
    error: null
  };
};

export const searchProductsByCategory = async (
  category: string,
  maxCount: number
) => {
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
      }`;
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query, { category })
  );
  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching products from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }
  return {
    data: products as sanityProduct[],
    error: null
  };
};

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
      }`;
  const { data: products, error: fetchSanityProductsErr } = await tryCatch(
    sanityClient.fetch(query, { parent })
  );
  if (fetchSanityProductsErr) {
    console.error(
      "Error fetching products from Sanity:",
      fetchSanityProductsErr
    );
    return {
      data: null,
      error: fetchSanityProductsErr
    };
  }
  return {
    data: products as sanityProduct[],
    error: null
  };
};

export async function getAllProductSlugs() {
  const query = `*[_type == "Product"]{
    "slug": slug.current,
  }`;

  const { data, error } = await tryCatch(sanityClient.fetch(query));

  if (error) {
    console.error("Error fetching products from Sanity:", error);
    return {
      data: null,
      error
    };
  }
  return {
    data: (data as Array<{ slug: string }>).map((item) => item.slug),
    error: null
  };
}
