import CollectionProducts from "./components/CollectionProducts";
import { FormatSlugAsText } from "@/utils/util";
import { sanityProduct } from "@/utils/types";

export type collectionReqFetchResponse = {
  success: boolean;
  message?: string;
  collection: sanityProduct[];
  collectionCount: number;
};

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

  return (
    <main className="bg-white flex justify-center items-center flex-col py-40">
      <div className="page-title container">
        <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
          All {FormatSlugAsText(slugValue)}
        </h1>
      </div>
      <CollectionProducts slug={slugValue} currentPage={currentPage} />
    </main>
  );
};

export default page;
