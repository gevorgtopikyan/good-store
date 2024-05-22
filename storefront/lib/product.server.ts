import 'server-only';

import {StoreGetProductsParams} from '@medusajs/medusa'

import { cache } from 'react'
import { getRegion } from './region.server'
import { medusaClient } from './medusa-client'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { getMedusaHeaders } from './shared.server'



const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
}

export const getProductsList = cache(async function ({
  pageParam = 0,
  queryParams,
}: {
  pageParam?: number
  queryParams?: StoreGetProductsParams
}): Promise<{
  response: { products: PricedProduct[]; count: number }
  nextPage: number | null
  queryParams?: StoreGetProductsParams
}> {
  const limit = queryParams?.limit || 100;

  const region = await getRegion('us');

  if (!region) {
    return emptyResponse
  }

  const { products, count } = await medusaClient.products
    .list(
      {
        limit,
        offset: pageParam,
        region_id: region.id,
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  // const transformedProducts = products.map((product) => {
  //   return transformProductPreview(product, region!)
  // })

  const nextPage = count > pageParam + 1 ? pageParam + 1 : null

  return {
    response: { products: products, count },
    nextPage,
    queryParams,
  }
})

export const getProductByHandle = cache(async function (
  handle: string
): Promise<PricedProduct> {
  const headers = getMedusaHeaders(["products"])

  const product = await medusaClient.products
    .list({ handle }, headers)
    .then(({ products }) => products[0])
    .catch((err) => {
      throw err
    })

  return product
})

export const retrievePricedProductById = cache(async function ({
  id,
  regionId,
}: {
  id: string
  regionId: string
}) {
  const headers = getMedusaHeaders(["products"])

  return medusaClient.products
    .retrieve(`${id}?region_id=${regionId}`, headers)
    .then(({ product }) => product)
    .catch((err) => {
      console.log(err)
      return null
    })
})

export const getProductsById = cache(async function ({
  ids,
  regionId,
}: {
  ids: string[]
  regionId: string
}) {
  const headers = getMedusaHeaders(["products"])

  return medusaClient.products
    .list({ id: ids, region_id: regionId }, headers)
    .then(({ products }) => products)
    .catch((err) => {
      console.log(err)
      return null
    })
})
