import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { craftedProducts } from "@/app/(home)/product_sections/data";

const page = () => {
  return (
    <main className="bg-white flex justify-center items-center flex-col py-40">
      <div className="page-title container">
        <h1 className="text-2xl lg:text-7xl font-bold text-center font-ivyPresto text-primary">
          Every Woman
        </h1>
      </div>
      <section className="container flex flex-col justify-center items-center gap-8 mt-10">
        <div className="filter flex justify-start items-center w-full max-w-11/12">
          <button className="border border-accent-100 px-6 py-3">
            <span className="text-primary text-center">Filter & Sort</span>
          </button>
          <p>4545 Products</p>
        </div>
        <div className="product-grid grid grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center w-full mt-8 max-w-11/12">
          {craftedProducts.map((product, index) => (
            <ProductCard
              alt={product.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.productDescription}
              src={product.src}
              key={index}
              className="min-w-full"
            />
          ))}
          {craftedProducts.map((product, index) => (
            <ProductCard
              alt={product.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.productDescription}
              src={product.src}
              key={index}
              className="min-w-full"
            />
          ))}
          {craftedProducts.map((product, index) => (
            <ProductCard
              alt={product.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.productDescription}
              src={product.src}
              key={index}
              className="min-w-full"
            />
          ))}
          {craftedProducts.map((product, index) => (
            <ProductCard
              alt={product.alt}
              brand={product.brand}
              price={product.price}
              productDescription={product.productDescription}
              src={product.src}
              key={index}
              className="min-w-full"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
