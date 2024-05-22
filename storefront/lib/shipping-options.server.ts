import { cache } from "react"
import { getMedusaHeaders } from "./shared.server"
import { medusaClient } from "./medusa-client"

export const listCartShippingMethods = cache(async function (cartId: string) {
    const headers = getMedusaHeaders(["shipping"])
  
    return medusaClient.shippingOptions
      .listCartOptions(cartId, headers)
      .then(({ shipping_options }) => shipping_options)
      .catch((err) => {
        console.log(err)
        return null
      })
  })