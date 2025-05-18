import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import { notFound } from "next/navigation";
import CollectionProducts from "./components/CollectionProducts";
import { FormatSlugAsText } from "@/utils/util";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data: collectionProducts, error: fetchSanityProductsErr } =
    await getAllSanityProductsByFilters({
      category: slug,
      subCategory: slug,
      brand: slug,
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
          All {FormatSlugAsText(slug)}
        </h1>
      </div>
      <CollectionProducts slug={slug} collectionProducts={collectionProducts} />
    </main>
  );
};

export default page;
