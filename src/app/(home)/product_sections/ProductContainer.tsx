import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { craftedProducts } from "./data";

type ProductContainerProps = {
  sectionHeader: string;
  categorySlug?: string;
};

const ProductContainer = ({
  sectionHeader,
  categorySlug = "women",
}: ProductContainerProps) => {
  return (
    <section className="flex flex-col gap-8 justify-center items-center w-full py-10">
      <div className="container flex flex-col gap-8 justify-center items-center">
        <div className="section-header w-full flex justify-between items-center text-black max-w-11/12 lg:max-w-full">
          <h2 className="font-ivyPresto text-xl lg:text-4xl">
            {sectionHeader}
          </h2>
          <Link href={`/collection/${categorySlug}`}>
            <p className="uppercase font-bold text-sm underline">see more</p>
          </Link>
        </div>
        <div className="flex section-overflow lg:grid lg:grid-cols-4 lg:justify-center items-center gap-8 w-full mt-8 max-w-11/12 lg:max-w-full overflow-auto lg:overflow-hidden">
          {craftedProducts.map((product, index) => (
            <ProductCard
              alt={product.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.productDescription}
              src={product.src}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductContainer;
