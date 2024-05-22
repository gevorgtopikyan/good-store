import { Metadata } from "next"


import { LineItem, Order } from "@medusajs/medusa"


import { notFound } from "next/navigation"
import { enrichLineItems } from "~/lib/cart/actions"
import { retrieveOrder } from "~/lib/order.server"

type Props = {
  params: { id: string }
}

async function getOrder(id: string) {
  const order = await retrieveOrder(id)

  if (!order) {
    return notFound()
  }

  const enrichedItems = await enrichLineItems(order.items, order.region_id)

  return {
    order: {
      ...order,
      items: enrichedItems as LineItem[],
    } as Order,
  }
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { order } = await getOrder(params.id);

  return <div>Your Order {order.display_id} confirmed</div>

}
