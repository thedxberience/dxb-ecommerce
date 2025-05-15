"use server"
import { tryCatch } from "@/utils/util"
import { sanityClient } from "../sanity"
import { sanityBrand } from "@/utils/types"

export const getAllSanityBrands = async () => {
    const query = `*[_type == "Brand"]{
        "id": _id,
        name,
        "image": {
            "src": image.image.asset->url,
            "alt": image.alt
        },
        "productCount": count(*[_type == "Product" && brand->name == ^.name]) 
      }`
    const { data: brands, error: fetchSanityBrandsErr } = await tryCatch(sanityClient.fetch(query))
    if (fetchSanityBrandsErr) {
        console.error("Error fetching brands from Sanity:", fetchSanityBrandsErr)
        return {
            data: null,
            error: fetchSanityBrandsErr,
        }
    }
    return {
        data: brands as sanityBrand[],
        error: null
    }
}

export const getBrandsByCategory = async (category: string) => {
    const query = `array::unique(*[_type == "Product" && category->name == "${category}"].brand->name)`

    const { data: brands, error: fetchSanityBrandsErr } = await tryCatch(sanityClient.fetch(query))
    if (fetchSanityBrandsErr) {
        console.error("Error fetching brands from Sanity:", fetchSanityBrandsErr)
        return {
            data: null,
            error: fetchSanityBrandsErr,
        }
    }
    return {
        data: brands as sanityBrand[],
        error: null
    }
}