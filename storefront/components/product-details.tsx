import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Suspense } from "react";
import ProductActions from "./product-actions";
import ProductActionsWrapper from "./product-actions-wrapper";
import { Region } from "@medusajs/medusa";

export async function ProductDetails({
  product,
  region,
}: {
  product: PricedProduct;
  region: Region;
}) {
  const { title, images = [], description, id } = product;

  if (!id) return null;
  return (
    <div className="relative grid">
      <article className="grid max-w-5xl gap-8 p-8 mx-auto lg:grid lg:grid-cols-2">
        <section className="grid pt-4 place-items-center">
          {images.map((image) => (
            <picture key={image.id}>
              <source srcSet={image.url} type="image/webp" />
              <img
                src={image.url}
                alt={`Poster for "${title}"`}
                className="rounded-lg "
              />
            </picture>
          ))}
        </section>
        <section>
          <h1 className="pt-4 mb-4 text-3xl text-white">{title}</h1>
          <p className="pt-4 mx-auto max-w-prose">{description}</p>
          <div className="pt-4 text-gray-400 flex flex-col small:sticky w-full py-8 gap-y-12">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={id} region={region} />
            </Suspense>
          </div>
        </section>
      </article>
    </div>
  );
}
