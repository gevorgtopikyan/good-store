import { LineItem } from "@medusajs/medusa"
import { Metadata } from "next"
import { cookies } from "next/headers"


import { CartWithCheckoutStep } from "../../types/global"
import { getCart } from "~/lib/cart.server"
import { getCustomer } from "~/lib/customer.server"
import { getCheckoutStep } from "~/utils/get-checkout-step"
import { enrichLineItems } from "~/lib/cart/actions"
import CartTemplate from "~/components/cart-page"


export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId).then(
    (cart) => cart as CartWithCheckoutStep
  )

  if (!cart) {
    return null
  }

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  return cart
}

export default async function Cart() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  return <CartTemplate cart={cart} customer={customer} />
}
