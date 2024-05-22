import { Metadata } from 'next'
import { ProductDetails } from '~/components/product-details'
import { getProductByHandle, getProductsList } from '~/lib/product.server'
import { notFound } from 'next/navigation'
import { getRegion } from '~/lib/region.server'

export async function generateMetadata({
  params,
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const { handle } = params
  const product = await getProductByHandle(handle)
  const title = `${product}`
  const description =
  product?.description || `Page for product: ${product?.title}`

  const image = `${process.env.VERCEL_URL}/api/og?title=${encodeURI(
    title
  )}&image=${product?.images?.[0]?.url && encodeURI(product.images[0].url)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  }
}

export default async function Product({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle)

  if (product === null) return notFound();
  const region = await getRegion("us");
  if (!region) {
    return notFound();
  }

  return (
    <main>
      <ProductDetails product={product} region={region}/>
    </main>
  )
}

// Pre-Render the default 100 pages
export async function generateStaticParams() {
  const { response: {products} } = await getProductsList({pageParam: 0, queryParams: {limit: 100}});

  return products.map((product) => ({
    handle: product.handle,
  }))
}
