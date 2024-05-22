import { LineItem } from "@medusajs/medusa"

import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "~/lib/cart/actions"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function CartButton() {
  const cart = await fetchCart()

  return <CartDropdown cart={cart} />
}
