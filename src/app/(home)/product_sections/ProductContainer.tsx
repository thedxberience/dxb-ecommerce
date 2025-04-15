import ProductCard from "./components/ProductCard";
import { craftedProducts } from "./data";

type ProductContainerProps = {
  sectionHeader: string;
};

const ProductContainer = ({ sectionHeader }: ProductContainerProps) => {
  return (
    <section className="flex flex-col gap-8 justify-center items-center w-full py-10">
      <div className="container flex flex-col gap-8 justify-center items-center">
        <div className="section-header w-full flex justify-between items-center text-black">
          <h2 className="font-ivyPresto text-4xl">{sectionHeader}</h2>
          <p className="uppercase font-bold text-sm underline">see more</p>
        </div>
        <div className="grid grid-cols-4 justify-center items-center gap-8 w-full mt-8">
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
