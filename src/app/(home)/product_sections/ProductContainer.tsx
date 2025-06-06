import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getLimitedSanityProductsByCategory } from "@/server/sanity/products/products";

type ProductContainerProps = {
  sectionHeader: string;
  categorySlug?: string;
};

const ProductContainer = async ({
  sectionHeader,
  categorySlug = "ready-to-wear",
}: ProductContainerProps) => {
  if (!categorySlug) {
    // console.log("Category slug is required");
    return;
  }

  const { data: craftedProducts, error: fetchSanityProductsErr } =
    await getLimitedSanityProductsByCategory(categorySlug, 4);

  if (fetchSanityProductsErr) {
    // console.log("Error fetching products from Sanity:", fetchSanityProductsErr);
    return;
  }

  if (!craftedProducts || craftedProducts.length === 0) {
    // console.log("No products found for the given category");
    return;
  }

  return (
    <section className="flex flex-col gap-8 justify-center items-center w-full py-10">
      <div className="container flex flex-col gap-8 justify-center items-center">
        <div className="section-header w-full flex justify-between items-center text-black max-w-11/12 lg:max-w-full">
          <h2 className="font-ivyPresto text-xl lg:text-4xl uppercase">
            {sectionHeader}
          </h2>
          <Link className="cursor-pointer" href={`/collection/${categorySlug}`}>
            <p className="uppercase font-bold text-sm underline cursor-pointer">
              see more
            </p>
          </Link>
        </div>
        <div className="flex section-overflow lg:grid lg:grid-cols-4 lg:justify-center items-center gap-8 w-full mt-8 max-w-11/12 lg:max-w-full overflow-auto lg:overflow-hidden">
          {craftedProducts.map((product, index) => (
            <ProductCard
              slug={product.slug}
              alt={product.thumbnail.imgAlt}
              brand={product.brand}
              price={product.price}
              src={product.thumbnail.imgSrc}
              name={product.name}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductContainer;
