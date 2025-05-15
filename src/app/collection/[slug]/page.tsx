import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import { notFound } from "next/navigation";
import CollectionProducts from "./components/CollectionProducts";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  // console.log(slug);

  const { data: collectionProducts, error: fetchSanityProductsErr } =
    await getAllSanityProductsByFilters({
      category: slug,
      subCategory: slug,
      brand: slug,
    });

  if (fetchSanityProductsErr) {
    // console.error(
    //   "Error fetching products from Sanity:",
    //   fetchSanityProductsErr
    // );
    notFound();
  }

  if (!collectionProducts || collectionProducts.length === 0) {
    notFound();
  }

  return (
    <main className="bg-white flex justify-center items-center flex-col py-40">
      <div className="page-title container">
        <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
          All {collectionProducts[0]?.category}
        </h1>
      </div>
      <CollectionProducts collectionProducts={collectionProducts} />
    </main>
  );
};

export default page;
