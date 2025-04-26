import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { stubProducts } from "@/utils/stub";

type ProductContainerProps = {
  sectionHeader: string;
};

const ProductContainer = ({ sectionHeader }: ProductContainerProps) => {
  return (
    <section className="flex flex-col gap-8 justify-center items-center w-full py-10">
      <div className="container flex flex-col gap-8 justify-center items-center">
        <div className="section-header w-full flex justify-between items-center text-black max-w-11/12">
          <h2 className="w-full font-ivyPresto text-xl text-center lg:text-4xl">
            {sectionHeader}
          </h2>
        </div>
        <div className="flex section-overflow lg:grid lg:grid-cols-4 lg:justify-center items-center gap-8 w-full mt-8 max-w-11/12 overflow-auto lg:overflow-hidden">
          {stubProducts.map((product, index) => (
            <ProductCard
              slug={product.slug}
              alt={product.asset.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.description}
              src={product.asset.src}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductContainer;
