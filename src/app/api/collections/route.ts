import { SanityProductFilters } from "@/app/types";
import {
    getAllSanityProductsByFilterCount,
    getAllSanityProductsByFilters,
} from "@/server/sanity/products/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const req: SanityProductFilters = {
        category: searchParams.get("category") || undefined,
        subCategory: searchParams.get("subCategory") || undefined,
        brand: searchParams.get("brand") || undefined,
        pageNumber: searchParams.get("pageNumber") ? parseInt(searchParams.get("pageNumber")!) : undefined,
        pageSize: searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!) : undefined,
        // Add other fields from SanityProductFilters as needed
    };

    const [collectionProductsRes, collectionProductCountRes] = await Promise.all([
        getAllSanityProductsByFilters(req),
        // new Promise<{ data: any; error: any }>((res, rej) => res({ data: null, error: null }))
        getAllSanityProductsByFilterCount({
            category: req.category,
            subCategory: req.subCategory,
            brand: req.brand,
        }),
    ]);

    if (collectionProductsRes.error || collectionProductCountRes.error) {
        const errorMessage = `Could not complete collection request: ${collectionProductsRes.error
            ? "Could not get Products: " + collectionProductsRes.error.message
            : ""
            }, ${collectionProductCountRes.error
                ? "Could not get Product Count: " +
                collectionProductCountRes.error.message
                : ""
            }`;

        return NextResponse.json({
            success: false,
            message: errorMessage,
        });
    }

    return NextResponse.json({
        success: true,
        collection: collectionProductsRes.data,
        collectionCount: collectionProductCountRes.data
    });
}
