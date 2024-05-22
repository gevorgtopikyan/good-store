import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { LineItem } from "@medusajs/medusa"


import { enrichLineItems } from "~/lib/cart/actions"
import { getCart } from "~/lib/cart.server"
import Wrapper from "~/components/checkout/components/payment-wrapper"
import CheckoutForm from "~/components/checkout/templates/checkout-form"
import CheckoutSummary from "~/components/checkout/templates/checkout-summary"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <Wrapper cart={cart}>
        <CheckoutForm />
      </Wrapper>
      <CheckoutSummary />
    </div>
  )
}
