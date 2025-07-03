"use client";

import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
  // This page is rendered when the user successfully completes a purchase
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);


  return( 
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
      <div className="flex justify-center mb-8">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
      </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Thank you for your order!</h1>
       
       <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Your order has been confirmed and will be shipped shortly.
          </p>

          <div className="space-y-2">
            {orderNumber && (
                <p className="text-gray-600 flex items-center space-x-5">
                   <span>Order Number:</span>
                     <span className="font-mono text-sm text-green-600">{orderNumber}</span>
                </p>
            )}
          </div>
       </div>
       <div className="space-y-4">
        <p className="text-gray-600">
            A confirmation email has been sent to your registered email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href='/orders'>View Order Details</Link>
                </Button>
            <Button asChild variant="outline" className="text-gray-600 hover:text-gray-800">
                <Link href='/'>Continue Shopping</Link>
            </Button>
        </div>
       </div>
    </div>
  </div>
)}

export default SuccessPage;
