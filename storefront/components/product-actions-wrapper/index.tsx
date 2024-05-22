
import { Region } from "@medusajs/medusa"
import ProductActions from "../product-actions"
import { retrievePricedProductById } from "~/lib/product.server"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string
  region: Region
}) {
  const product = await retrievePricedProductById({ id, regionId: region.id })

  if (!product) {
    return null
  }

  return <ProductActions product={product} region={region} />
}
