import Addresses from "../../components/addresses"
import Payment from "../../components/payment"
import Review from "../../components/review"
import Shipping from "../../components/shipping"
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from "../../../../types/global"
import { getCheckoutStep } from "~/utils/get-checkout-step"
import { createPaymentSessions } from "~/lib/cart.server"
import { listCartShippingMethods } from "~/lib/shipping-options.server"
import { getCustomer } from "~/lib/customer.server"

export default async function CheckoutForm() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  // get customer if logged in
  const customer = await getCustomer()

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>

        <div>
          <Shipping
            cart={cart}
            availableShippingMethods={availableShippingMethods}
          />
        </div>

        <div>
          <Payment cart={cart} />
        </div>

        <div>
          <Review cart={cart} />
        </div>
      </div>
    </div>
  )
}
