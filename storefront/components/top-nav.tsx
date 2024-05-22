import Link from "next/link";
import { Suspense } from "react";
import CartButton from "./cart-button";

export const TopNav = () => (
  <nav className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
    <Link href="/">Good Store</Link>

    <ul className="flex items-center gap-4 text-sm font-medium text-white">
      <li>
        <Link
          href="/account"
          data-testid="nav-account-link"
          className="hover:text-ui-fg-base"
        >
          Account
        </Link>
      </li>

      <li>
        <Suspense
          fallback={
            <Link
              href="/cart"
              data-testid="nav-cart-link"
              className="hover:text-ui-fg-base flex gap-2"
            >
              Cart (0)
            </Link>
          }
        >
          <CartButton />
        </Suspense>
      </li>
    </ul>
  </nav>
);
