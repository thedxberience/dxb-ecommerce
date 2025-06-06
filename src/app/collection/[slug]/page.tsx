import {
  getAllSanityProductsByFilterCount,
  getAllSanityProductsByFilters,
} from "@/server/sanity/products/products";
import { notFound } from "next/navigation";
import CollectionProducts from "./components/CollectionProducts";
import { FormatSlugAsText } from "@/utils/util";
import { Suspense } from "react";
import Loading from "./loading";

// const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
//   const { slug } = await params;
//   const slugValue = decodeURIComponent(slug);
//   const { data: collectionProducts, error: fetchSanityProductsErr } =
//     await getAllSanityProductsByFilters({
//       category: slugValue,
//       subCategory: slugValue,
//       brand: slugValue,
//       pageNumber: 1,
//       pageSize: 12,
//     });

//   // get count of products in collection
//   const { data: productCount, error: fetchSanityProductCountErr } =
//     await getAllSanityProductsByFilterCount({
//       category: slugValue,
//       subCategory: slugValue,
//       brand: slugValue,
//     });

//   if (fetchSanityProductCountErr) {
//     console.error(
//       "Error fetching product count from Sanity:",
//       fetchSanityProductCountErr
//     );
//     notFound();
//   }

//   if (!productCount || productCount === 0) {
//     console.warn("No products found for the current collection.");
//     notFound();
//   }

//   if (fetchSanityProductsErr) {
//     console.error(
//       "Error fetching products from Sanity:",
//       fetchSanityProductsErr
//     );
//     notFound();
//   }

//   if (!collectionProducts || collectionProducts.length === 0) {
//     console.warn("No products found for the current collection.");
//     notFound();
//   }

//   return (
//     <main className="bg-white flex justify-center items-center flex-col py-40">
//       <div className="page-title container">
//         <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
//           All {FormatSlugAsText(slugValue)}
//         </h1>
//       </div>
//       <Suspense fallback={<Loading />}>
//         <CollectionProducts
//           slug={slugValue}
//           productCount={productCount}
//           collectionProducts={collectionProducts}
//         />
//       </Suspense>
//     </main>
//   );
// };
// export default page;

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}) => {
  const { slug } = await params;
  const { page } = (await searchParams) || {};
  const slugValue = decodeURIComponent(slug);
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 12;

  const [collectionProductsRes, productCountRes] = await Promise.all([
    getAllSanityProductsByFilters({
      category: slugValue,
      subCategory: slugValue,
      brand: slugValue,
      pageNumber: currentPage,
      pageSize: pageSize,
    }),
    getAllSanityProductsByFilterCount({
      category: slugValue,
      subCategory: slugValue,
      brand: slugValue,
    }),
  ]);

  if (collectionProductsRes.error || productCountRes.error) notFound();

  return (
    <main className="bg-white flex justify-center items-center flex-col py-40">
      <div className="page-title container">
        <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
          All {FormatSlugAsText(slugValue)}
        </h1>
      </div>
      <CollectionProducts
        slug={slugValue}
        currentPage={currentPage}
        productCount={productCountRes.data}
        collectionProducts={collectionProductsRes.data}
      />
    </main>
  );
};

export default page;
