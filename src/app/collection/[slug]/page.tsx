import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import { notFound } from "next/navigation";
import CollectionProducts from "./components/CollectionProducts";
import { FormatSlugAsText } from "@/utils/util";
import { Suspense } from "react";
import Loading from "./loading";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const slugValue = decodeURIComponent(slug);
  const { data: collectionProducts, error: fetchSanityProductsErr } =
    await getAllSanityProductsByFilters({
      category: slugValue,
      subCategory: slugValue,
      brand: slugValue,
    });

  if (fetchSanityProductsErr) {
    notFound();
  }

  if (!collectionProducts || collectionProducts.length === 0) {
    notFound();
  }

  return (
    <main className="bg-white flex justify-center items-center flex-col py-40">
      <div className="page-title container">
        <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
          All {FormatSlugAsText(slugValue)}
        </h1>
      </div>
      <Suspense fallback={<Loading />}>
        <CollectionProducts
          slug={slug}
          collectionProducts={collectionProducts}
        />
      </Suspense>
    </main>
  );
};
export default page;
