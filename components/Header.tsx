"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Package, ShoppingBasketIcon } from "lucide-react";
import Form from "next/form";
import Link from "next/link";

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
        const response = await user?.createPasskey();
        console.log(response)
    } catch (error) {
        console.error("Error:",JSON.stringify(error,null,2))
    }
  };

  return (
    <header className="headyHeader">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="linkHeader">
          Shopet
        </Link>
        <Form className="formHeader" action="/search">
          <input
            type="text"
            name="query"
            placeholder="search for products.."
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <ShoppingBasketIcon className="w-6 h-6" />
            {/* Span item count once global state is implemented */}
            <span>My Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <Package className="h-6 w-6" />
                <span>My Orders</span>
              </Link>
              </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
             <button
             onClick={createClerkPasskey}
             className="bg-white hover:bg-blue-700 hover:text-white text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
           >
             Create passkey now
           </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
