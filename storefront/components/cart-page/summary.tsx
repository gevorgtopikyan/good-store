"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "./cart-totals"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "../discount-code"
import Link from "next/link"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <div className="h-px w-full border-b border-gray-200 mt-1"/>
      <CartTotals data={cart} />
      <Link href={"/checkout?step=" + cart.checkout_step} data-testid="checkout-button">
        <Button className="w-full h-10">Go to checkout</Button>
      </Link>
    </div>
  )
}

export default Summary
