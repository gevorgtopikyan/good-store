import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { ProductCard } from "./product-card";
import { Region } from "@medusajs/medusa";

export const SearchResult = ({
  products = [],
  region
}: {
  region: Region;
  products: PricedProduct[];
}) => {
  return (
    <>
      {products.length < 1 ? (
        <article className="grid place-items-center">
          <p>The Case of Missing Products</p>
        </article>
      ) : (
        <article>
          <ul className="container grid gap-8 px-4 mx-auto xl:grid-cols-4 lg:grid-cols-3 lg:px-12 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} region={region} />
            ))}
          </ul>
        </article>
      )}
    </>
  );
};
