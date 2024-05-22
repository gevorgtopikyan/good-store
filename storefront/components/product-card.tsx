import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Link from "next/link";
import { findCheapestPrice } from "~/utils/prices";
import { Variant } from "~/types/medusa";

export const ProductCard = ({
  product,
  region,
}: {
  product: PricedProduct;
  region: Region;
}) => {
  const { title, description, variants, images = [], handle, id } = product;

  const image = images[0]?.url;

  const cheapestPrice = findCheapestPrice(variants as Variant[], region);
  if (!id) return null;

  return (
    <Link href={`/product/${handle}`} className="block outline-none">
      <li className="flex w-full h-full max-w-sm mx-auto overflow-hidden transition duration-500 ease-in-out shadow-lg bg-slate-950 rounded-xl hover:-translate-y-2 hover:shadow-2xl relative text-white after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-slate-900 after:to-transparent focus-within:outline focus-within:outline-pink-600">
        <div className="relative z-10 px-6 pb-10 group">
          <header className="flex flex-col inner pb-6">
            <h2 className="text-2xl min-h-[4rem] font-bold text-white flex flex-col justify-center pt-40 pb-4">
              {title}
            </h2>

            <ul className="inline-flex gap-2 pt-3 mb-0 text-sm text-white">
              {/* {variants?.map((variant) => (
                <li
                  key={id + variant.}
                  className="px-2 py-1 text-xs border rounded-lg"
                >
                  {genre}
                </li>
              ))} */}
            </ul>
          </header>
          {description && (
            <p className="pt-2 pb-6 text-sm text-slate-100">
              {description.length > 260
                ? description.substring(0, 250) + "…"
                : description}
            </p>
          )}
          <div className="pt-2">Starting from {cheapestPrice}</div>
        </div>

        <picture>
            <source srcSet={image} type="image/webp" />
            <img
              src={image}
              alt={`Poster for "${title}"`}
              className="absolute inset-0 w-full transform -translate-y-4 grayscale-[0.7]"
            />
          </picture>
      </li>
    </Link>
  );
};
