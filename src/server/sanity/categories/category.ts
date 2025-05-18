"use server"
import { tryCatch } from "@/utils/util"
import { sanityClient } from "../sanity"
import { sanityCategory } from "@/utils/types"

export const getAllSanityCategories = async () => {
    const query = `*[_type == "Category"]{
                    "id": _id,
                    name,
                    "subCategories": subCategories[]->{
                        "id": _id,
                        name,
                        "slug": slug.current,
                        targetAudience,
                        "productCount": count(*[
                        _type == "Product" && references(^._id)
                        ])
                    },
                    "productCount": count(*[
                        _type == "Product" && references(^._id)
                    ])
                }`
    const { data: categories, error: fetchSanityCategoriesErr } = await tryCatch(sanityClient.fetch(query))
    if (fetchSanityCategoriesErr) {
        console.error("Error fetching categories from Sanity:", fetchSanityCategoriesErr)
        return {
            data: null,
            error: fetchSanityCategoriesErr,
        }
    }

    // console.log("Fetched Categories:", categories);


    return {
        data: categories as sanityCategory[],
        error: null
    }
}

export const getCategoryByName = async (name: string) => {
    const query = `*[_type == "Category" && name == ${name}]{
        "id": _id,
        name,
        subCategories,
      }`
    const { data: category, error: fetchSanityCategoryErr } = await tryCatch(sanityClient.fetch(query, { name }))
    if (fetchSanityCategoryErr) {
        console.error("Error fetching category from Sanity:", fetchSanityCategoryErr)
        return {
            data: null,
            error: fetchSanityCategoryErr,
        }
    }
    return {
        data: category as sanityCategory[],
        error: null
    }
}

// export const getCategorysByTargetAudience = async (targetAudience: string) => {
//     const query = `*[_type == "Category"]{
//         "id": _id,
//         name,
//         subCategories,
//       }`
//     const { data: category, error: fetchSanityCategoryErr } = await tryCatch(sanityClient.fetch(query) as Promise<sanityCategory[]>)
//     if (fetchSanityCategoryErr) {
//         console.error("Error fetching category from Sanity:", fetchSanityCategoryErr)
//         return {
//             data: null,
//             error: fetchSanityCategoryErr,
//         }
//     }

//     return {
//         data: category as sanityCategory[],
//         error: null
//     }
// }