import { Suspense } from "react";
import Loader from "./loader";
import { getProductsList } from "~/lib/product.server";
import { SearchResult } from "../components/search-result";
import { getRegion } from "~/lib/region.server";
import { notFound } from "next/navigation";

const Home = async () => {
  const {
    response: { products },
  } = await getProductsList({ pageParam: 0, queryParams: { limit: 100 } });

  const region = await getRegion("us");
  if (!region) {
    return notFound();
  }

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <SearchResult products={products} region={region} />
      </Suspense>
    </main>
  );
};

export default Home;
