import { cache } from "react"
import { getMedusaHeaders } from "./shared.server"
import { medusaClient } from "./medusa-client"
import medusaError from "./medusa-error"

export const retrieveOrder = cache(async function (id: string) {
    const headers = getMedusaHeaders(["order"])
  
    return medusaClient.orders
      .retrieve(id, headers)
      .then(({ order }) => order)
      .catch((err) => medusaError(err))
  })
  