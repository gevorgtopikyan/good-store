import { StorePostCustomersCustomerReq, StorePostCustomersReq } from "@medusajs/medusa"
import { medusaClient } from "./medusa-client"
import { getMedusaHeaders } from "./shared.server"
import medusaError from "./medusa-error"

export async function getCustomer() {
    const headers = getMedusaHeaders(["customer"])
  
    return medusaClient.customers
      .retrieve(headers)
      .then(({ customer }) => customer)
      .catch((err) => null)
  }
  
  export async function createCustomer(data: StorePostCustomersReq) {
    const headers = getMedusaHeaders(["customer"])
  
    return medusaClient.customers
      .create(data, headers)
      .then(({ customer }) => customer)
      .catch((err) => medusaError(err))
  }
  
  export async function updateCustomer(data: StorePostCustomersCustomerReq) {
    const headers = getMedusaHeaders(["customer"])
  
    return medusaClient.customers
      .update(data, headers)
      .then(({ customer }) => customer)
      .catch((err) => medusaError(err))
  }